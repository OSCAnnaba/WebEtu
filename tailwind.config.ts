import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        backgroundColorCycle: {
          "0%, 100%": { backgroundColor: "rgb(209 213 219)" },
          "50%": { backgroundColor: "rgb(229 231 235)" },
        },
      },
      animation: {
        loading: "backgroundColorCycle 2s ease-in-out infinite",
      },
      scale: {
        "103": "1.03",
      },
    },
  },
  plugins: [],
}

export default config
