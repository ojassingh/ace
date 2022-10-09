module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ['Inter var'],
      // },
    },
  },
  plugins: [
    require('tailwindcss-font-inter'),
    require("flowbite/plugin")
  ],
}
