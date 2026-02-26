/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      sans: ['DM Sans', 'sans-serif'],
    },
      colors: {
        primary: {
          DEFAULT: "#1A6B3C",
          light: "#2E8B57",
          dark: "#14532d",
        },
      }
    },
  },
  plugins: [],
}
