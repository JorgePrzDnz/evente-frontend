/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      screens: {
        'phoneS': '320px',
        'phoneM': '375px',
        'phoneL': '425px'
      }
    },
  },
  plugins: [],
};
