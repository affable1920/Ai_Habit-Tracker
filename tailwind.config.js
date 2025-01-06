/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color__primary: "#334155",
        color__secondary: "#1e293b",
        color__header: "#101115",
        color__accent: "#2563eb",
        color__shadow: "#0c1a27",
        color__shadow__2: "#24496d",
        color__light__shadow: "#ddeefe",
        color__accent__2: "#1e40af",
        color__third: "#13171a",
        color__rose: "#be123c",
        color__violet: "#6d28d9",
      },
      fontFamily: {
        font_eng: "Engagement",
      },
    },
  },
  plugins: [],
};
