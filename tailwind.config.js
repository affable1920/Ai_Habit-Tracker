/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color__primary: "#121212",
        color__secondary: "#171717",
        color__secondary__lighter: "#242424",
        color__accent: "#006239",
        color__accent__lighter: "#72e3ad",
      },
      fontFamily: {
        font_eng: "Engagement",
        sansita: "Sansita",
      },
    },
  },
  plugins: [],
};
