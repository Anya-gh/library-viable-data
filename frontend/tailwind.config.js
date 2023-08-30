/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home-library-bg": "url(./assets/pexels-element-digital-1370298.jpg)"
      }
    },
  },
  plugins: [],
}

