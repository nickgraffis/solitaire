const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors,
      animation: {
        spinslow: 'spin 20s linear infinite'
      }
    },
  },
  plugins: [],
};
