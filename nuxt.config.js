const { $content } = require('@nuxt/content')
const BASE_URL = 'https://peterkimzz.github.io'

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
  components: [
    { path: '~/components', prefix: 'vue' },
  ],
  router: {
    base: '/blog/'
  },
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
    gzip: true,
    routes: CreateSitemapRoutes
  }
}