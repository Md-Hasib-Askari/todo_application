const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui(), require("rippleui")],
  rippleui: {
    theme: "light",
    themes: [
      {
        themeName: "light",
        colorScheme: "light",
        colors: {
          primary: "#235264",
          backgroundPrimary: "#1f1f1f",
        },
      },
      {
        themeName: "dark",
        colorScheme: "dark",
        colors: {
          primary: "#573242",
          backgroundPrimary: "#2a2a2a",
        },
      },
    ],
  },
}

