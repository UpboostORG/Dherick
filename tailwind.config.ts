import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#faf9f5", dark: "#1F1B16", card: "#2A2520" },
        gold: { DEFAULT: "#E0A86B", dark: "#C4924F", light: "#F0D4A8" },
        warm: { 100: "#F0E6D8", 200: "#D4C4B0", 300: "#A89A8C", 400: "#8C8178", 500: "#5C5349" },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["Georgia", "Cambria", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
