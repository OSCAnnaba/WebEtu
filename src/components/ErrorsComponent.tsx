"use client"

function ErrorsComponent({
  errorType,
}: {
  errorType: "connection" | "fetching" | "serverDown"
}) {
  const errorDetails = {
    connection: {
      title: "No Internet Connection",
      message:
        "It looks like you're offline. Please check your connection and try again.",
      btn: "Retry",
      borderColor: "border-blue-600",
      textColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    fetching: {
      title: "Oops! Something Went Wrong",
      message: "We encountered an issue while fetching data. Please try again.",
      btn: "Retry",
      borderColor: "border-yellow-600",
      textColor: "text-yellow-600",
      buttonColor: "bg-yellow-600 hover:bg-yellow-700",
    },
    serverDown: {
      title: "Server Down",
      message:
        "Progress server is currently down. Please check back later when it is up and running.",
      btn: "Refresh Page",
      borderColor: "border-red-700",
      textColor: "text-red-600",
      buttonColor: "bg-red-600 hover:bg-red-700",
    },
  }

  const { title, message, btn, borderColor, textColor, buttonColor } =
    errorDetails[errorType]

  return (
    <div className="flex items-center justify-center flex-1 bg-gray-100 px-4 sm:px-6">
      <div
        className={`rounded p-4 sm:p-6 max-w-md w-full text-center bg-gray-200 border ${borderColor}`}
      >
        <h1
          className={`text-xl sm:text-2xl font-semibold ${textColor} mb-3 sm:mb-4`}
        >
          {title}
        </h1>
        <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
          {message}
        </p>
        <button
          onClick={() => window.location.reload()}
          className={`px-3 py-2 sm:px-4 sm:py-2 text-white rounded transition duration-300 ${buttonColor}`}
          aria-label="Refresh Page"
        >
          {btn}
        </button>
      </div>
    </div>
  )
}

export default ErrorsComponent
