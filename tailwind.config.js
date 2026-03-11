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
        body: ['Barlow', 'sans-serif'],      // Main theme body font
        heading: ['"Amatic SC"', 'cursive'], // Theme handwritten headings
        sans: ['DM Sans', 'sans-serif'],     // Optional fallback
      },

      colors: {
        primary: {
          DEFAULT: "#1A6B3C",
          light: "#2E8B57",
          dark: "#14532d",
        },
        accent: "#E5C447", // Theme yellow
        section: "#F5F5F5" // Theme light background
      }

    },
  },
  plugins: [],
}