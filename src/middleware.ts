import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { cookies } from "next/headers";
import axios from "axios";
import axiosRetry from "axios-retry";
import logger from "./utils";

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const url = req.nextUrl;

  if (url.pathname === "/" && token) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  if (!token && url.pathname !== "/") {
    return NextResponse.redirect(new URL(`/`, req.url));
  }

  const res = NextResponse.next();

  let dias = req.cookies.get("dias");

  if (!dias && url.pathname !== "/") {
    const newDias = await getDias();
    if (newDias) {
      res.cookies.set("dias", JSON.stringify(newDias));
    }
  }

  return res;
}

// Define the paths where the middleware will apply
export const config = {
  matcher: ["/", "/profile", "/group", "/exams", "/notes"],
};

const getDias = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const uuid = cookieStore.get("uuid")?.value;
  const user = cookieStore.get("user")?.value;

  try {
    const response = await axios.get(
      `https://progres.mesrs.dz/api/infos/bac/${uuid}/dias`,
      {
        headers: {
          Authorization: token,
        },
        timeout: 100000,
      }
    );
    logger.info("dias fetched successfully", user, "middleware");

    const dias = [];

    for (let i = 0; i < response.data.length; i++) {
      let { id, anneeAcademiqueId } = response.data[i];
      if (anneeAcademiqueId <= 19) dias.push({ id, anneeAcademiqueId });
    }
    return dias;
  } catch (error: any) {
    logger.error(`Error - ${error}`, user, "middleware");
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log("error - request");
    } else {
      console.log("Error Unknown");
    }
    return null;
  }
};
