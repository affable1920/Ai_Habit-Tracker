/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#121212",
        secondary: "#171717",
        secondary__lighter: "#242424",
        accent: "#3F3F46", // 700
        accent__darker: "#27272A", // 800
        bright__lighter: "#FB923C",
        bright: "#F97316",
        bright__darker: "#9A3412",
        warning: "#EAB308",
        warning__darker: "#A16207",
        danger: "#DC2626",
        danger__darker: "#7F1D1D",
      },
      fontFamily: {
        font_eng: "Engagement",
        sansita: "Sansita",
      },
    },
  },
  plugins: [],
};
