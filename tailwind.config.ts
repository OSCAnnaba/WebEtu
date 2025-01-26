import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        "bg-pulse": {
          "0%, 100%": { backgroundColor: "rgb(219, 222, 231)" },
          "50%": { backgroundColor: "rgb(206, 209, 217)" },
        },
      },
      animation: {
        "bg-pulse": "bg-pulse 2s ease-in-out infinite",
      },
      scale: {
        "103": "1.03",
      },
    },
  },
  plugins: [],
}

export default config
