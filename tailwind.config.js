/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FDFBF7',
          100: '#F9F6F0',
          200: '#EFEBE1',
          300: '#E2DCD0',
          800: '#23201D',
          900: '#141210',
          950: '#0C0A09',
        },
        editorial: {
          burgundy: '#862D52',
          wine: '#AA397B',
          teal: '#466A72',
          forest: '#416E58',
          olive: '#686825',
          rust: '#A14D28',
          amber: '#C27803',
          sand: '#D97706',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
