module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'eco-primary': '#0dab67',
        'eco-link': '#1f7edb',
      },
      keyframes: {
        float: {
          from: {
            right: '-100px',
          },
          to: {
            right: '100%',
          },
        },
        stamp: {
          '0%': {
            opacity: 0,
          },
          '10%': {
            opacity: 0.5,
            'transform-origin': ' 50% 50%',
            transform: 'rotate(-2deg) scale(5)',
            transition: 'all .3s cubic-bezier(0.6, 0.04, 0.98, 0.335)',
          },
          '60%': {
            opacity: 1,
            transform: 'rotate(-15deg) scale(1)',
          },
          '100%': {
            opacity: 0,
            transform: 'rotate(-15deg) scale(1)',
          },
        },
        jump: {
          '0%': { transform: 'translate3d(0,0,0) scale3d(1,1,1)' },
          '25%': { transform: 'translate3d(0,-20%,0) scale3d(.9,1.1,1)' },
          '50%': { transform: 'translate3d(0,-40%,0) scale3d(1.1,.9,1)' },
          '75%': { transform: 'translate3d(0,-20%,0) scale3d(.9,1.1,1)' },
          '100%': { transform: 'translate3d(0,0,0) scale3d(1,1,1)' },
        },
      },
      animation: {
        'float-through-5s': 'float 5s linear infinite',
        'float-through-20s': 'float 20s linear infinite',
        stamp: 'stamp 1.5s 1.5s forwards',
        jump: 'jump 1s linear alternate',
      },
    },
    screens: {
      sm: '576px',
      md: '960px',
      lg: '1440px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
