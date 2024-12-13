/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      boxShadow: {
      'shadow-green': '1px 1px 10px #4fa74f',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
],
}