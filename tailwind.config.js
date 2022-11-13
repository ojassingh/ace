module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '120': '26rem',
        '124': '28rem',
        '128': '32rem',
        '140' : '36rem',
        '150' : '40.5rem',
        '170' : '45.5rem'
      },
      width: {
        '120': '26rem',
        '124': '28rem',
        '128': '32rem',
        '140' : '36rem',
        '150' : '40.5rem',
        '170' : '50.5rem'
      }
    },
    colors: {
      // Configure your color palette here
        'beige': '#FCFCFC',
        'bermuda': '#78dcca',
        'midnight': '#121063',
    },
  },
  plugins: [
    require('tailwindcss-font-inter'),
    require("flowbite/plugin")
  ],
  
}
