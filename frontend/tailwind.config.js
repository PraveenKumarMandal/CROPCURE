/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'farm-green': '#2d5016',
        'leaf-green': '#4a7c59',
        'earth-brown': '#8b4513',
        'soil-brown': '#a0522d',
        'wheat-gold': '#f4a460',
        'sage-green': '#9caf88',
        'forest-green': '#228b22',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
