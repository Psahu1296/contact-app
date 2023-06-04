/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      green: '#3DB46D',
      red: '#EB5757',
      primary: '#ffffff',
      secondary: '#4F4F4F',
      tertiary: '#BDBDBD',
      dark: '#000000'
    },
    backgroundColor: {
      primary: '#000000',
      secondary: '#4F4F4F',
      green: '#3DB46D',
      white: '#fff',
      "black-100": '#000',
      red: '#EB5757',
      transparent: 'transparent',
      "active": '#70db9b',
      "inactive": "#ff8c8c"
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      backgroundColor: {
        'gradient-radial': 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(4,7,8,1) 49%, rgba(2,0,36,1) 100%)',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'green-gredient':'linear-gradient( 117deg,  rgba(123,216,96,1) 39.2%, rgba(255,255,255,1) 156.2% )'
      },
    },
  },
  plugins: [],
  }
