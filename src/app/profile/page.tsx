import Image from "next/image"
import { getProfileData, getLogo, getImage } from "@/utils/api/profile"
import ErrorsComponent from "@/components/ErrorsComponent"

export const metadata = {
  title: "WebEtu - Profile",
}

const ProfilePage = async () => {
  let [getProfileResponse, image, logo] = await Promise.all([
    getProfileData() as any,
    getImage(),
    getLogo(),
  ])

  const liStyle =
    "flex flex-col justify-start items-start text-sm md:text-lg gap-2"
  const imageStyle =
    "w-24 h-24 md:w-32 md:h-32 rounded-full hover:scale-103 transition duration-300 ease-in-out"
  const keySpanStyle = "font-bold text-gray-600"
  const dataSpanStyle =
    "text-gray-800 p-3 sm:p-4 bg-white rounded w-full border border-green-700"

  if (getProfileResponse.success) {
    const profileData = getProfileResponse.data

    const formattedDate = new Date(
      profileData.individuDateNaissance.substring(0, 10),
    ).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    return (
      <div className="bg-gray-200/60 mx-4 md:mx-auto mt-6 p-6 md:p-8 rounded border border-green-700 capitalize mb-5">
        <div className="flex flex-row items-center justify-center gap-12 mb-6">
          <div className="mr-8 md:mr-96">
            <Image
              src={
                image
                  ? `data:image/png;base64,${image}`
                  : "/images/unavailable.png"
              }
              alt="Profile Image"
              width={120}
              height={120}
              className={`${imageStyle} border border-green-700`}
            />
          </div>
          <div>
            <Image
              src={
                logo
                  ? `data:image/png;base64,${logo}`
                  : "/images/unavailable.png"
              }
              alt="University Logo"
              width={120}
              height={120}
              className={imageStyle}
            />
          </div>
        </div>

        <ul className="space-y-4">
          <li className={liStyle}>
            <span className={keySpanStyle}>Identifier:</span>
            <span className={dataSpanStyle}>{profileData.individuId}</span>
          </li>
          <li className={liStyle}>
            <span className={keySpanStyle}>First Name:</span>
            <span className={dataSpanStyle}>
              {profileData.individuPrenomLatin}
            </span>
          </li>
          <li className={liStyle}>
            <span className={keySpanStyle}>Last Name:</span>
            <span className={dataSpanStyle}>
              {profileData.individuNomLatin}
            </span>
          </li>
          {profileData.individuEmail && (
            <li className={liStyle}>
              <span className={keySpanStyle}>Email:</span>
              <span className={`${dataSpanStyle} uppercase`}>
                {profileData.individuEmail}
              </span>
            </li>
          )}
          <li className={liStyle}>
            <span className={keySpanStyle}>Date of Birth:</span>
            <span className={dataSpanStyle}>{formattedDate}</span>
          </li>
          <li className={liStyle}>
            <span className={keySpanStyle}>Place of Birth:</span>
            <span className={dataSpanStyle}>
              {profileData.individuLieuNaissance}
            </span>
          </li>
        </ul>
      </div>
    )
  } else {
    console.log("Text:", getProfileResponse.error)
    let errorType: "fetching" | "connection" | "serverDown"

    if (getProfileResponse.error === "Error Fetching Profile Data") {
      errorType = "serverDown"
    } else if (!navigator.onLine) {
      errorType = "connection"
    } else {
      errorType = "fetching"
    }

    console.log("Error Type:", errorType)
    return <ErrorsComponent errorType={errorType} />
  }
}

export default ProfilePage
