import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { cookies } from "next/headers";
import axios from "axios";
import logger from "./utils";
import { log } from "util";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const url = req.nextUrl;

  if (url.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  if (!token && url.pathname !== "/login") {
    return NextResponse.redirect(new URL(`/login`, req.url));
  }

  const res = NextResponse.next();

  let dias = req.cookies.get("dias");

  if (!dias && url.pathname !== "/login") {
    const newDias = await getDias();
    if (newDias) {
      console.log("updated cookies");
      res.cookies.set("dias", JSON.stringify(newDias));
    }
  }

  return res;
}

// Define the paths where the middleware will apply
export const config = {
  matcher: ["/login", "/profile", "/group", "/exams", "/notes"],
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
        timeout: 100000, // Timeout set to 10 seconds
      }
    );
    logger.info("dias fetched successfully", user, "middleware");

    const dias = [];

    for (let i = 0; i < response.data.length; i++) {
      let { id, anneeAcademiqueId } = response.data[i];
      dias.push({ id, anneeAcademiqueId });
    }
    return dias;
  } catch (error) {
    logger.error("Error updating cookies", user, "middleware");
    return null;
  }
};
