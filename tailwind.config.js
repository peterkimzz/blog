const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
// const colors = require('tailwindcss/colors')

const preset = {
  darkMode: 'media',
  theme: {
    // colors: {
    //   primary: colors.lightBlue,
    //   ...defaultTheme.colors
    // },
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
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        html: {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          'word-break': 'break-word',
          'color': defaultTheme.colors.gray[800],
        }
      })
    })
  ]
}

module.exports = {
  important: true,
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  },
  presets: [preset]
}
