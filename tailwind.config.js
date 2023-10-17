// @ts-check
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  mode: 'jit',
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...defaultTheme.fontFamily.sans],
      },
      gradientColorStops: {
        'gradient-1-start': '#F20089',
        'gradient-1-end': '#D100D1',
        'gradient-2-start': '#D100D1',
        'gradient-2-end': '#A100F2',
        'gradient-3-start': '#A100F2',
        'gradient-3-end': '#2D00F7',
      },
      colors: {
        primary: {
          100: '#FFF0F3',
          200: '#FFCCD5',
          300: '#FFB3C1',
          400: '#FF8FA3',
          500: '#FF758F',
          600: '#FF4D6D',
          700: '#C9184A',
          800: '#A4133C',
          900: '#800F2F',
        },
        'primary-color': {
          100: '#FFF0F3',
          200: '#FFCCD5',
          300: '#FFB3C1',
          400: '#FF8FA3',
          500: '#FF758F',
          600: '#FF4D6D',
          700: '#C9184A',
          800: '#A4133C',
          900: '#800F2F',
        },
        'primary-color-dark': {
          100: '#FFF0F3',
          200: '#FFCCD5',
          300: '#FFB3C1',
          400: '#FF8FA3',
          500: '#FF758F',
          600: '#FF4D6D',
          700: '#C9184A',
          800: '#A4133C',
          900: '#800F2F',
        },
        success: {
          100: '#E4FCDB',
          200: '#C3FAB9',
          300: '#99F193',
          400: '#74E377',
          500: '#49D159',
          600: '#35B34F',
          700: '#249647',
          800: '#17793D',
          900: '#0E6437',
        },
        info: {
          100: '#CCFCFF',
          200: '#99F2FF',
          300: '#66E2FF',
          400: '#3FCEFF',
          500: '#00AEFF',
          600: '#0087DB',
          700: '#0065B7',
          800: '#004793',
          900: '#00337A',
        },
        warning: {
          100: '#FEF1CF',
          200: '#FDE09F',
          300: '#FBC96F',
          400: '#F8B24B',
          500: '#F48E11',
          600: '#D1700C',
          700: '#AF5508',
          800: '#8D3D05',
          900: '#752D03',
        },
        danger: {
          100: '#FFDCD3',
          200: '#FFB1A8',
          300: '#FF7D7C',
          400: '#FF5C6A',
          500: '#FF264D',
          600: '#DB1B50',
          700: '#B7134F',
          800: '#930C4A',
          900: '#7A0747',
        },
        'background-color': '#000',
        green: colors.emerald,
        gray: colors.neutral,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          color: theme('colors.gray.700'),
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              color: theme('colors.green.500'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.500'),
            },
            strong: { color: theme('colors.gray.600') },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.500')} `,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            details: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.400'),
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
          // css: {
          //   a: {
          //     color: theme('colors.primary.500'),
          //     '&:hover': {
          //       color: `${theme('colors.primary.400')}`,
          //     },
          //     code: { color: theme('colors.primary.400') },
          //   },
          // },
        },
      }),
      // typography: (theme) => ({
      //   DEFAULT: {
      //     css: {
      //       color: theme('colors.gray.700'),
      //       a: {
      //         color: theme('colors.primary.500'),
      //         '&:hover': {
      //           color: `${theme('colors.primary.500')}`,
      //         },
      //         code: { color: theme('colors.primary.400') },
      //       },
      //       h1: {
      //         fontWeight: '700',
      //         letterSpacing: theme('letterSpacing.tight'),
      //         color: theme('colors.gray.900'),
      //       },
      //       h2: {
      //         fontWeight: '700',
      //         letterSpacing: theme('letterSpacing.tight'),
      //         color: theme('colors.white.900'),
      //       },
      //       h3: {
      //         fontWeight: '600',
      //         color: theme('colors.white.900'),
      //       },
      //       'h4,h5,h6': {
      //         color: theme('colors.white.900'),
      //       },
      //       pre: {
      //         backgroundColor: theme('colors.gray.800'),
      //       },
      //       code: {
      //         color: theme('colors.green.500'),
      //         backgroundColor: theme('colors.gray.100'),
      //         paddingLeft: '4px',
      //         paddingRight: '4px',
      //         paddingTop: '2px',
      //         paddingBottom: '2px',
      //         borderRadius: '0.25rem',
      //       },
      //       'code::before': {
      //         content: 'none',
      //       },
      //       'code::after': {
      //         content: 'none',
      //       },
      //       details: {
      //         backgroundColor: theme('colors.gray.100'),
      //         paddingLeft: '4px',
      //         paddingRight: '4px',
      //         paddingTop: '2px',
      //         paddingBottom: '2px',
      //         borderRadius: '0.25rem',
      //       },
      //       hr: { borderColor: theme('colors.gray.200') },
      //       'ol li::marker': {
      //         fontWeight: '600',
      //         color: theme('colors.gray.500'),
      //       },
      //       'ul li::marker': {
      //         backgroundColor: theme('colors.gray.500'),
      //       },
      //       strong: { color: theme('colors.white.600') },
      //       blockquote: {
      //         color: theme('colors.white.900'),
      //         borderLeftColor: theme('colors.gray.200'),
      //       },
      //     },
      //   },
      //   dark: {
      //     css: {
      //       color: theme('colors.gray.300'),
      //       a: {
      //         color: theme('colors.primary.500'),
      //         '&:hover': {
      //           color: `${theme('colors.primary.500')} `,
      //         },
      //         code: { color: theme('colors.primary.400') },
      //       },
      //       h1: {
      //         fontWeight: '700',
      //         letterSpacing: theme('letterSpacing.tight'),
      //         color: theme('colors.gray.100'),
      //       },
      //       h2: {
      //         fontWeight: '700',
      //         letterSpacing: theme('letterSpacing.tight'),
      //         color: theme('colors.gray.100'),
      //       },
      //       h3: {
      //         fontWeight: '600',
      //         color: theme('colors.gray.100'),
      //       },
      //       'h4,h5,h6': {
      //         color: theme('colors.gray.100'),
      //       },
      //       pre: {
      //         backgroundColor: theme('colors.gray.800'),
      //       },
      //       code: {
      //         backgroundColor: theme('colors.gray.800'),
      //       },
      //       details: {
      //         backgroundColor: theme('colors.gray.800'),
      //       },
      //       hr: { borderColor: theme('colors.gray.700') },
      //       'ol li::marker': {
      //         fontWeight: '600',
      //         color: theme('colors.gray.400'),
      //       },
      //       'ul li::marker': {
      //         backgroundColor: theme('colors.gray.400'),
      //       },
      //       strong: { color: theme('colors.gray.100') },
      //       thead: {
      //         th: {
      //           color: theme('colors.gray.100'),
      //         },
      //       },
      //       tbody: {
      //         tr: {
      //           borderBottomColor: theme('colors.gray.700'),
      //         },
      //       },
      //       blockquote: {
      //         color: theme('colors.gray.100'),
      //         borderLeftColor: theme('colors.gray.700'),
      //       },
      //     },
      //   },
      // }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
