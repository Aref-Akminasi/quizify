module.exports = {
  purge: ['./index.html', './src/**/*.{js,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1020px',
      xl: '1440px',
    },
    extend: {
      colors: {
        darkBlue: '#252A40',
        wrong: '#B73636',
        correct: '#36B772',
        navyBlue: '#2E425A',
        bgColor: '#f5f5f5',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
