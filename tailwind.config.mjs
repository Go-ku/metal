/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1f4b99',
          50: '#eff5ff',
          100: '#dbe7ff',
          200: '#b6cfff',
          300: '#86adff',
          400: '#5c8bfa',
          500: '#3f6ee0',
          600: '#2f53b3',
          700: '#25408a',
          800: '#20366e',
          900: '#1d2f5b'
        }
      },
      boxShadow: {
        soft: '0 10px 40px rgba(0,0,0,0.06)'
      }
    }
  },
  plugins: [],
};
