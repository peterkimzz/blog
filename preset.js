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
  }
}