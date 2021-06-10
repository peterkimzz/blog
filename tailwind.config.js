const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
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
        gray: colors.trueGray,
        cyan: colors.cyan
      },
      fontFamily: {
        sans: [
          'Inter',
          'Noto Sans KR',
          '-apple-system',
          ...defaultTheme.fontFamily.sans
        ]
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700')
            },
            strong: {
              color: theme('colors.gray.100')
            },
            code: {
              color: theme('colors.gray.100')
            },
            h1: {
              color: theme('colors.gray.100')
            },
            h2: {
              color: theme('colors.gray.100')
            },
            h3: {
              color: theme('colors.gray.100')
            },
            'ol >li::before': {
              color: theme('colors.gray.400')
            },
            'ul >li::before': {
              color: theme('colors.gray.400')
            },
            'figure figcaption': {
              color: theme('colors.gray.500')
            }
          }
        }
      })
    }
  },
  variants: {
    borderColor: ['focus', 'active']
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography')
    // plugin(({ addBase, theme }) => {
    //   addBase({
    //     html: {
    //       'word-break': 'keep-all',
    //       'background-color': theme('backgroundColor.gray.800'),
    //       color: theme('textColor.gray.300'),
    //       '-webkit-font-smoothing': 'antialiased'
    //     }
    //   })
    // })
  ]
}
