const plugin = require('tailwindcss/plugin')
const resolveConfig = require('tailwindcss/resolveConfig')
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  important: true,
  darkMode: 'media',
  theme: {
    colors: {
      ...defaultTheme.colors,
      gray: colors.gray
    },
    screens: {
      xs: '500px',
      ...defaultTheme.screens
    },
    fontSize: {
      '2xs': '0.65rem',
      ...defaultTheme.fontSize
    },
    fontFamily: {
      sans: ['-apple-system', ...defaultTheme.fontFamily.sans]
    }
  },
  corePlugins: {
    accessibility: false,
    backgroundAttachment: false,
    backgroundClip: false,
    clear: false,
    gap: false,
    gridAutoColumns: false,
    gridAutoFlow: false,
    gridAutoRows: false,
    gridColumn: false,
    gridColumnEnd: false,
    gridColumnStart: false,
    gridRow: false,
    gridRowEnd: false,
    gridRowStart: false,
    gridTemplateColumns: false,
    gridTemplateRows: false,
    letterSpacing: false,
    order: false,
    overscrollBehavior: false,
    placeContent: false,
    placeItems: false,
    placeSelf: false,
    ringColor: false,
    ringOffsetColor: false,
    ringOffsetWidth: false,
    ringOpacity: false,
    ringWidth: false,
    stroke: false,
    strokeWidth: false,
    tableLayout: false,
    whitespace: false,
    wordBreak: false
  },
  plugins: [
    plugin(function ({ addBase, addUtilities, config }) {
      addBase({
        html: {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          'word-break': 'break-word',
          // 'color': config('theme.colors.gray.800')
        }
      })

      const input = {
        '.input': {

        }
      }
      addUtilities({ ...input })
    })
  ],
  variants: {
    extend: {
      display: ['dark'],
      backgroundOpacity: ['dark']
    }
  }
}