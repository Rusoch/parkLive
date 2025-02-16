import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        firago: ["var(--font-firago)"],
      },
      colors: {
        "green-light": "#218658",
        "green-dark": "#15593A",
        "bg-light-from": "#ACE1C9",
        "bg-light-to": "#D4E2DB",
        "blue-light": "#567DF4",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
export default config;
