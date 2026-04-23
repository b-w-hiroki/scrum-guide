/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#7c6dfa',
          pink: '#fa6d8a',
          teal: '#6dfacc',
          dark: '#0a0a0f',
        },
      },
    },
  },
  plugins: [],
}

