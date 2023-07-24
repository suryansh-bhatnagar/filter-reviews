/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}",],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '2px 4px 6px -1px rgb(0 0 0 / 0.05)',
      }
    }
  },
  plugins: [],
}

