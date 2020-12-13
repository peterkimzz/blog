const { $content } = require('@nuxt/content')
const BASE_URL = 'https://www.peterkimzz.com'

const CreateSitemapRoutes = async () => {
  try {
    let routes = []
    let posts = []

    if (posts === null || posts.length === 0) {
      posts = await $content('articles').only(['slug']).fetch();
    }

    for (const post of posts) {
      routes.push(`/${post.slug}`);
    }

    return routes;
  } catch (err) {
    return []
  }
}

module.exports = {
  // target: 'static',
  head: {
    meta: [
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no',
      },
      {
        name: 'google-site-verification',
        content: '4UxOeSKrw8W8YzFcrj7uL5G8n88ZFWKa0VHSHiDzyqg'
      },
      {
        name: 'naver-site-verification',
        content: '20f0641c5f175949097b208b23b65f9f0d6e561e'
      },
    ]
  },
  components: [
    { path: '~/components', prefix: 'vue' },
  ],
  // router: {
  //   base: '/blog/'
  // },
  modules: ['@nuxt/content', '@nuxtjs/sitemap'],
  buildModules: ['@nuxtjs/tailwindcss'],
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      }
    }
  },
  sitemap: {
    hostname: BASE_URL,
    // gzip: true,
    routes: CreateSitemapRoutes
  }
}