/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['"Source Serif 4"', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: "#002D62", // BUE Navy
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#DA291C", // BUE Red
          foreground: "#ffffff",
        }
      }
    },
  },
  plugins: [],
}
