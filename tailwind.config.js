/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color__primary: "#0e1215",
        color__secondary: "#0e1215",
        color__from: "#050e17",
        color__to: "#04111f",
        color__black: "#101115",
        color__fill: "#0b2035",
        color__light: "#91939b",
        color__light__bg: "#e2e8f0", // slate 200,
        color__accent__primary: "#2563eb",
        color__accent__dark: "#1e40af",
        color__accent__light: "#93c5fd" || "#dbeafe",
        color__danger__light: "#ffe4e6",
        color__danger__dark: "#be123c",
      },
      fontFamily: {
        font_eng: "Engagement",
        sansita: "Sansita",
      },
    },
  },
  plugins: [],
};
