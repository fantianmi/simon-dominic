/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#d4a017',
          dark: '#a67c10',
        },
      },
    },
  },
  plugins: [],
};
