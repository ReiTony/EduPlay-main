/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        reemkufifont: ["'Reem Kufi Fun'", 'cursive'],
        expletus: ["'Expletus Sans'", 'sans-serif'],
        kumbh: ["'Kumbh Sans'", 'sans-serif'],
        sourceSans3: ["'Source Sans 3'", 'sans-serif'],

      }
    },
  },
  plugins: [],
}