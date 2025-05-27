/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        felipa: ['var(--font-felipa)'],
        lovers: ['var(--font-lovers)'],
        roboto: ['var(--font-roboto)'],
      },
    },
  },
  plugins: [],
};