const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  important: true,
  purge: {
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  },
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray
      },
      fontFamily: {
        sans: [
          '-apple-system',
          ...defaultTheme.fontFamily.sans
        ]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(({ addBase, theme }) => {
      addBase({
        'html': {
          'word-break': 'keep-all',
          'background-color': theme('backgroundColor.gray.800'),
          'color': theme('textColor.gray.300'),
          '-webkit-font-smoothing': 'antialiased'
        },
      })
    })
  ]
}
