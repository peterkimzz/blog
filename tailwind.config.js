module.exports = {
  important: true,
  // purge: [
  //   './components/**/*.{vue,js}',
  //   './layouts/**/*.vue',
  //   './content/**/*.{md}',
  //   './pages/**/*.vue',
  //   './plugins/**/*.{js,ts}',
  //   './nuxt.config.{js,ts}',
  // ],
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
  presets: [
    require('./preset')
  ],
  plugins: [
    require('@tailwindcss/forms')
  ]
}
