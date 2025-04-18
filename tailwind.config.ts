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
        // Primary colors
        "green-light": "#218658",
        "green-dark": "#15593A",
        "blue-light": "#567DF4",

        // Background colors
        "bg-light-from": "#ACE1C9",
        "bg-light-to": "#D4E2DB",
        "bg-primary": "#F3F6FF",
        "bg-dark": "#1F2124",
        "bg-darker": "#1C2129",
        "bg-gray": "#F7F7F7",
        "bg-gray-dark": "#D9D9D9",
        "bg-input": "#E8ECF3",
        "bg-input-dark": "#313336",

        // Text colors
        "text-primary": "#192342",
        "text-secondary": "#677191",
        "text-muted": "#888888",
        "text-dark": "#2E18149E",
        "text-gray": "#7E706D",

        // Border colors
        "border-light": "#EAEAEA",
        "border-success": "#38D68E",
        "border-error": "#FF0000",
        "border-warning": "#FFA800",

        // Dark mode specific
        "dark-text": "#FFFFFF",
        "dark-text-secondary": "#D2DCFC",
        "dark-text-muted": "#BAC5E8",
        "dark-bg": "#1A6E48",
        "dark-bg-transparent": "#13131366",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
export default config;
