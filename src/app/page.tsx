"use client"

import Image from "next/image"
import { useState } from "react"
import toast from "react-hot-toast"
import Cookies from "js-cookie"
import axios from "axios"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const Login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)
    try {
      await signIn(username.trim(), password.trim())
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (username: string, password: string) => {
    const toastId = toast.loading("Logging In..")

    try {
      const response = await axios.post(
        "https://progres.mesrs.dz/api/authentication/v1/",
        {
          username,
          password,
        },
        {
          timeout: Number(process.env.NEXT_PUBLIC_TIMEOUT),
        },
      )

      Cookies.set("token", response.data.token)
      Cookies.set("uuid", response.data.uuid)

      window.location.reload()

      toast.success("Logged In", { id: toastId })
    } catch (err: any) {
      if (err.message.includes("timeout")) {
        toast.error("Request Timed Out", {
          duration: 2000,
          id: toastId,
        })
      } else if (err.response && err.response.status == 403) {
        toast.error("Invalid Credentials", { duration: 2000, id: toastId })
      } else if (err.message.includes("Network Error")) {
        toast.error("Check Your Internet Connection", {
          duration: 2000,
          id: toastId,
        })
      } else {
        toast.error("Progres Server Error", {
          duration: 2000,
          id: toastId,
        })
      }
    }
  }

  return (
    <div className="bg-gray-200/60 p-5 md:p-8 rounded border border-green-700 w-full max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl text-center">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={150}
        height={150}
        className="mx-auto mb-6"
        priority={true} // Disable lazy loading for the LCP image
      />
      <form className="flex flex-col" onSubmit={Login}>
        <div className="mb-4 sm:mb-6 text-left">
          <label
            htmlFor="username"
            className="block mb-2 text-sm sm:text-md text-gray-600 font-bold"
          >
            <span className="text-red-500">*</span> Student Registration Number
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Example: 202400000001"
            required
            className="w-full p-2 sm:p-3 border border-green-700 rounded focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4 sm:mb-6 md:mb-8 text-left">
          <label
            htmlFor="password"
            className="block mb-2 text-sm sm:text-md text-gray-600 font-bold"
          >
            <span className="text-red-500">*</span> Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full p-2 sm:p-3 border border-green-700 rounded focus:outline-none focus:border-green-500"
            />
            <button
              type="button"
              aria-label="Toggle Password Visibility"
              className="absolute right-2 top-1 bottom-1 text-green-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-6" />
              ) : (
                <EyeIcon className="w-6" />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          aria-label="Login"
          disabled={
            loading || username.trim() === "" || password.trim().length < 8
          }
          className="w-full p-2 sm:p-3 text-white bg-green-700 rounded hover:bg-green-800/90 transition-colors disabled:bg-gray-400"
        >
          {loading ? "Loading.." : "Login"}
        </button>
      </form>
    </div>
  )
}
