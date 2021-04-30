require('dotenv').config()

const GetSitemap = async () => {
  const { $content } = require('@nuxt/content')

  const files = await $content('articles')
    .only(['path'])
    .where({ is_published: true })
    .fetch()
  // const files = await $content({ deep: true }).only(["path"]).fetch();

  return files.map(file => file.path.replace(/\/articles/gi, ''))
}

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
  modules: ['@nuxtjs/dayjs', '@nuxt/content', '@nuxtjs/sitemap'],
  buildModules: ['@nuxtjs/tailwindcss'],
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
  sitemap: {
    hostname: process.env.BASE_URL,
    gzip: true,
    routes: () => GetSitemap()
  }
}