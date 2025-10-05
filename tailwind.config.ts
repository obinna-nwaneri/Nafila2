import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0f766e",
          dark: "#0d504b",
          light: "#14b8a6"
        }
      },
      boxShadow: {
        card: "0 20px 25px -5px rgba(15, 118, 110, 0.1), 0 10px 10px -5px rgba(15, 118, 110, 0.04)"
      }
    }
  },
  plugins: []
};

export default config;
