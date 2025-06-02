/** @type {import('tailwindcss').Config} */

// tailwindcss/colors for using colors defined in tailwind itself.
const colors = require("tailwindcss/colors");

// Adding third-party plugins (like @tailwindcss/forms, @tailwindcss/typography)
// Writing custom utilities/components with plugin() from tailwindcss/plugin
// i.e not defined in tailwind itself
const plugin = require("tailwindcss/plugin");

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit,minmax(240px, 1fr))",
      },
      colors: {
        primary: {
          // #171717
          // primary dark and its variants for hover, focus etc ..
          DEFAULT: "hsl(0 0% 9.5%)",
          darker: "hsl(0 0% 7%)",
          lighter: "hsl(0 0% 12%)",
        },
        secondary: {
          DEFAULT: colors.zinc[800],
          dark: colors.zinc[950],
          lighter: colors.zinc[600],
        },
        accent: {
          DEFAULT: colors.cyan[600],
          lighter: colors.cyan[500],
          lightest: colors.cyan[400],
          darker: colors.cyan[700],
        },
        light: {
          DEFAULT: colors.slate[100],
          lighter: colors.slate[50],
          lightest: "#FFFFFF",
          darker: colors.slate[200],
          darkest: colors.slate[300],
        },
      },
      screens: {
        semi_md: "840px",
      },
    },
  },
  plugins: [
    // Here we use the plugin, it takes a fn as a parameter
    plugin(({ addComponents }) => {
      addComponents({
        ".btn": {},
      });
    }),
  ],
};

// 2e2e2e 3a3a3a 0f0f0f e0e0e0 d4d4d4 c0c0c0
// #007bff 4dabff 005bb5

// Rule of Thumb:
// Hover: Increase lightness by 8–15% for dark themes, decrease by 5–10% for light themes.
// Active: Decrease lightness by 3–10% for dark themes, 10–20% for light themes.
// Focus: Keep the background as is but add a ring or border with the accent color (use hsla for transparency).
