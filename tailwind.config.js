/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        champagne: '#D4AF37',
        navy: '#002147',
        cream: '#F8F5ED',
        soft: '#F2ECE1',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 18px 60px rgba(0, 33, 71, 0.18)',
      },
    },
  },
  plugins: [],
};
