/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        dark: "0 5px 5px hsl(0, 0, 0)",
        light: "0 5px 5px hsla(0, 0, 20%, .5)",
      },
      colors: {
        primary: "#121212",
        secondary: "#171717",
        secondary__lighter: "#242424",
        accent: "#0cdcf7",
        accent__darker: "#036976",
        accent__lighter: "#3de3f9",
      },
      fontFamily: {
        font_eng: "Engagement",
        sansita: "Sansita",
      },
    },
  },
  plugins: [],
};
