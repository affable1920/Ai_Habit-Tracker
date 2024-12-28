/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color__primary: "#0e1215",
        color__secondary: "#1d2126",
        color__header: "#101115",
        color__accent: "#0288d1",
        color__shadow: "#0c1a27",
        color__shadow__2: "#24496d",
        color__light__shadow: "#ddeefe",
        color__accent__2: "#0277b8",
        color__third: "#13171a",
      },
      fontFamily: {
        font_eng: "Engagement",
      },
    },
  },
  plugins: [],
};
