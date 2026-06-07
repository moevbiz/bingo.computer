/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,md}", "./src/**/*.svg",],
  theme: {
    fontFamily: {
      'sans': 'system-ui, Helvetica, Arial, sans-serif',
    },
    fontSize: {
      sm: ['12px', '15px'],
      base: ['14px', '19px'],
      lg: ['30px', '32px'],
      xl: ['42px', '45px'],
    },
    extend: {},
  },
  plugins: [],
}

