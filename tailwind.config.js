module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '128': '32rem',
      }
    },
    colors: {
      // Configure your color palette here
        'beige': '#FCFCFC',
        'bermuda': '#78dcca',
        'midnight': '#121063',
    }
  },
  plugins: [
    require('tailwindcss-font-inter'),
    require("flowbite/plugin")
  ],
  
}
