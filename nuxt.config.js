require('dotenv').config()

module.exports = {
  target: 'static',
  head: {
    meta: [
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
      },
      {
        name: 'google-site-verification',
        content: '4UxOeSKrw8W8YzFcrj7uL5G8n88ZFWKa0VHSHiDzyqg'
      },
      {
        name: 'naver-site-verification',
        content: '7ba96ea30a0f3e92ddd2c4429331bfb82798e3ce'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://rsms.me/inter/inter.css'
      }
    ]
  },
  env: process.env,
  loading: { color: '#000', height: '3px' },
  components: [
    { path: '~/components/atoms', prefix: 'vue' },
    { path: '~/components/molecules', prefix: 'vue' },
    { path: '~/components/organisms', prefix: 'vue' }
  ],
  plugins: [
    { src: '~/plugins/cheerio' },
    { src: '~/plugins/vue-gtag', mode: 'client' }
  ],
  modules: [
    '@nuxtjs/dayjs',
    '@nuxtjs/feed',
    '@nuxt/content',
    '@nuxtjs/sitemap'
  ],
  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/device'],
  content: {
    liveEdit: false,
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-darcula.css'
      }
    }
  },
  tailwindcss: {
    jit: true,
    viewer: true
  },
  feed: {
    type: 'rss2',
    path: '/feed.xml',
    cacheTime: 1000 * 60 * 15,
    async create(feed) {
      feed.options = {
        link: process.env.BASE_URL,
        title: process.env.META_TITLE,
        language: 'ko',
        description: process.env.META_DESCRIPTION
      }
      feed.addCategory('Nuxt.js')

      const { $content } = require('@nuxt/content')

      const articles = await $content('articles')
        .where({ is_published: true })
        .fetch()

      articles.forEach(article => {
        feed.addItem({
          id: process.env.BASE_URL + '/' + article.slug,
          title: article.title,
          link: process.env.BASE_URL + '/' + article.slug,
          date: new Date(article.created),
          author: 'peterkimzz69@gmail.com',
          category: article.category,
          content: article.description,
          description: article.description
        })
      })
    }
  },
  sitemap: {
    hostname: process.env.BASE_URL,
    routes: async () => {
      const { $content } = require('@nuxt/content')

      const articles = await $content('articles')
        .only(['path'])
        .where({ is_published: true })
        .fetch()

      return articles.map(article => article.path.replace(/\/articles/gi, ''))
    }
  }
}
