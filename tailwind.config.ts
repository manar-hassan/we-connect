import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/rizzui/dist/*.{js,ts,jsx,tsx}', // must use this line to compile and generate our RizzUI components style
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    container: {
      center: true,
      screens: {
        default: '744px',
      },
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px', // only need to control product grid mode in ultra 4k device
    },
    extend: {
      colors: {
        gray: {
          0: 'rgb(var(--gray-0) / <alpha-value>)',
          50: 'rgb(var(--gray-50) / <alpha-value>)',
          100: 'rgb(var(--gray-100) / <alpha-value>)',
          200: 'rgb(var(--gray-200) / <alpha-value>)',
          300: 'rgb(var(--gray-300) / <alpha-value>)',
          400: 'rgb(var(--gray-400) / <alpha-value>)',
          500: 'rgb(var(--gray-500) / <alpha-value>)',
          600: 'rgb(var(--gray-600) / <alpha-value>)',
          700: 'rgb(var(--gray-700) / <alpha-value>)',
          800: 'rgb(var(--gray-800) / <alpha-value>)',
          900: 'rgb(var(--gray-900) / <alpha-value>)',
          1000: 'rgb(var(--gray-1000) / <alpha-value>)',
          1: '#f6f7f7',
          2: '#f0f1f2',
          3: '#dbdee0',
          4: '#c1c5ca',
          5: '#a6acb3',
          6: '#8b939c',
          7: '#707b85',
          8: '#56626e',
          9: '#3b4957',
          10: '#203040',
        },
        primary: {
          lighter: 'rgb(var(--primary-lighter) / <alpha-value>)',
          light: 'rgb(var(--primary-light) / <alpha-value>)',
          DEFAULT: '#2998ff',
          dark: 'rgb(var(--primary-dark) / <alpha-value>)',
        },
        secondary: {
          lighter: 'rgb(var(--secondary-lighter) / <alpha-value>)',
          light: 'rgb(var(--secondary-light) / <alpha-value>)',
          DEFAULT: '#8b939c',
          dark: 'rgb(var(--secondary-dark) / <alpha-value>)',
        },
        red: {
          lighter: 'rgb(var(--red-lighter) / <alpha-value>)',
          light: 'rgb(var(--red-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--red-default) / <alpha-value>)',
          dark: 'rgb(var(--red-dark) / <alpha-value>)',
        },
        orange: {
          lighter: 'rgb(var(--orange-lighter) / <alpha-value>)',
          light: 'rgb(var(--orange-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--orange-default) / <alpha-value>)',
          dark: 'rgb(var(--orange-dark) / <alpha-value>)',
        },
        blue: {
          lighter: 'rgb(var(--lighter) / <alpha-value>)',
          light: 'rgb(var(--light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--default) / <alpha-value>)',
          dark: 'rgb(var(--dark) / <alpha-value>)',
          1: '#eaf5ff',
          2: '#c3e2ff',
          3: '#9dd0ff',
          4: '#76bdff',
          5: '#50abff',
          6: ' #2998ff',
          7: '#227dd1',
          8: ' #1a61a3',
          9: ' #134675',
        },
        green: {
          lighter: 'rgb(var(--green-lighter) / <alpha-value>)',
          light: 'rgb(var(--green-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--green-default) / <alpha-value>)',
          dark: 'rgb(var(--green-dark) / <alpha-value>)',
        },
        purple: {
          1: '#f7eefc',
          2: '#e9cff6',
          3: '#daaff0',
          4: '#cc90ea',
          5: ' #bd71e4',
          6: '#af52de',
          7: '#9043b6',
          8: '#70348e',
          9: '#512666',
        },
        peach: {
          1: '#fff1ec',
          2: '#ffd6ca',
          3: '#ffbca8',
          4: ' #ffa286',
          5: ' #ff8864',
          6: ' #ff6e42',
          7: '#d15a36',
          8: '#a3462a',
          9: '#75331e',
        },
        brown: {
          1: '#f6f2ef',
          2: '#e5dbd2',
          3: ' #d4c5b5',
          4: '#c3ae98',
          5: '#b3977b',
          6: '#a2805e',
          7: '#85694d',
          8: '#68523c',
          9: '#4b3b2b',
        },
        'modal-overlay': 'rgba(32, 48, 64, 0.4)',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        lexend: ['var(--font-lexend)'],
      },
      // required these animations for the Loader component
      animation: {
        blink: 'blink 1.4s infinite both;',
        'scale-up': 'scaleUp 500ms infinite alternate',
        'spin-slow': 'spin 4s linear infinite',
        popup: 'popup 500ms var(--popup-delay, 0ms) linear 1',
        skeleton: 'skeletonWave 1.6s linear 0.5s infinite',
        'spinner-ease-spin': 'spinnerSpin 0.8s ease infinite',
        'spinner-linear-spin': 'spinnerSpin 0.8s linear infinite',
      },
      backgroundImage: {
        skeleton: `linear-gradient(90deg,transparent,#ecebeb,transparent)`,
        'skeleton-dark': `linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)`,
        dashed:
          'repeating-linear-gradient(90deg,#d9d9d9 4px,#d9d9d9 10px,transparent 0,transparent 12px)',
      },
      keyframes: {
        blink: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        popup: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        skeletonWave: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '50%': {
            /* +0.5s of delay between each loop */
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        spinnerSpin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
      content: {
        underline: 'url("/public/underline.svg")',
      },
      boxShadow: {
        profilePic:
          '0px 2px 4px -2px rgba(0, 0, 0, 0.10), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)',
        'ct-shadow-2':
          '0px 0px 4px rgba(0,0,0,0.04),0px 2px 8px rgba(0,0,0,0.06)',
        4: '0px 0px 16px rgba(0,0,0,0.04),0px 8px 32px rgba(0,0,0,0.06)',
        tab: '0 3px 10px 0 rgba(0,0,0,.06)',
        'tap-content': '0 10px 10px 0 rgba(0,0,0,.04)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    plugin(function ({ addVariant }) {
      // required this to prevent any style on readOnly input elements
      addVariant('not-read-only', '&:not(:read-only)');
    }),
  ],
} satisfies Config;
