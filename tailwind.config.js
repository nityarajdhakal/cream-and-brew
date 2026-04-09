/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
        dm: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        cream: "#FFF8F0",
        gold: "#C9973A",
        "gold-light": "#E8B85A",
        brown: "#2C1A0E",
        "coffee-dark": "#0a0501",
        "ice-blue": "#E8F4FD",
        "pastel-pink": "#FFD6E0",
      },
    },
  },
  plugins: [],
}