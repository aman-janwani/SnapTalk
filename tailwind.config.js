/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { fontFamily: { poppins: "Poppins", pacifico: "Pacifico" } },
    colors: {
      ...colors,
      gray: {
        "100": "#f1f1f1",
        "200": "#e3e3e3",
        "300": "#cdcdcd",
        "400": "#1a1a1a",
        "500": "rgba(26, 26, 26, 0.5)",
        "600": "rgba(26, 26, 26, 0.6)",
      },
      white: "#fff",
      orange: "#ff6600"
    },
    fontSize: {
      xs: "10px",
      sm: "11px",
      base: "12px",
      lg: "13px",
      xl: "14px",
      "2xl": "16px",
      "3xl": "24px",
    },
  },
  corePlugins: { preflight: false },
};
