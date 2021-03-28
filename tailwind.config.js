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
        gray: colors.trueGray,
        cyan: colors.cyan
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          ...defaultTheme.fontFamily.sans
        ]
      },
      fontSize: {
        sm: ['0.875rem', '1.5rem'],
        base: ['1rem', '1.75rem'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700')
            },
            a: {
              wordBreak: 'break-all'
            },
            strong: {
              color: theme('colors.gray.100')
            },
            code: {
              color: theme('colors.gray.100'),
            },
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.100'),
            },
            'ol >li::before': {
              color: theme('colors.gray.400')
            },
            'ul >li::before': {
              color: theme('colors.gray.400')
            },
            'figure figcaption': {
              color: theme('colors.gray.500'),
            },
          },
        },
      }),
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
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
