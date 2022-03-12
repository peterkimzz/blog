import 'dotenv/config'
import Prism from 'prismjs'
import escapeHtml from 'escape-html'

require('prismjs/components/index')()
// require('prismjs/components/prism-diff')
// require('prismjs/plugins/diff-highlight/prism-diff-highlight')
// require('prismjs/plugins/command-line/prism-command-line')
// require('prismjs/plugins/jsonp-highlight/prism-jsonp-highlight')

export default {
  target: 'static',
  bridge: false,
  server: {
    port: 4000,
  },
  head: {
    meta: [
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no',
      },
      {
        name: 'google-site-verification',
        content: '4UxOeSKrw8W8YzFcrj7uL5G8n88ZFWKa0VHSHiDzyqg',
      },
      {
        name: 'naver-site-verification',
        content: '7ba96ea30a0f3e92ddd2c4429331bfb82798e3ce',
      },
    ],
    script: [{ src: 'https://developers.kakao.com/sdk/js/kakao.js' }],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css',
      },
    ],
  },
  env: process.env,
  loading: { color: '#06B6D4', height: '3px' },
  components: [
    { path: '~/components/atoms', prefix: 'vue' },
    { path: '~/components/molecules', prefix: 'vue' },
    { path: '~/components/organisms', prefix: 'vue' },
  ],
  plugins: [
    { src: '~/plugins/cheerio' },
    { src: '~/plugins/vue-gtag', mode: 'client' },
    { src: '~/plugins/kakao', mode: 'client' },
  ],
  modules: [
    '@nuxtjs/dayjs',
    '@nuxtjs/feed',
    '@nuxt/content',
    '@nuxtjs/sitemap',
  ],
  css: [
    '@/assets/css/tailwind.css',
    '@/assets/css/prism-github-dark-theme.css',
  ],
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  buildModules: ['@nuxtjs/device', '@nuxt/postcss8'],
  content: {
    liveEdit: false,
    markdown: {
      highlighter(
        rawCode,
        language,
        { lineHighlights, fileName },
        { h, node, u }
      ) {
        const DIFF_HIGHLIGHT_SYNTAX = /^(diff)-([\w-]+)/i
        const DIFF_LINE_PREFIX_SYNTAX = /(?:^[+\- ] |^[+-]$)/gm

        let code
        let grammer
        let lang = language || 'text'

        let addedLines = []
        let removedLines = []
        const isDiff = lang.match(DIFF_HIGHLIGHT_SYNTAX)
        if (isDiff) {
          lang = lang.substr(5)
          grammer = Prism.languages.diff
        }

        if (lang === 'vue' || lang === 'mjml') {
          lang = 'html'
        }
        // if (lang === 'ts') {
        //   lang = 'js'
        // }

        if (!grammer) {
          grammer = Prism.languages[lang]
        }

        /** Tokenize by Prism.js */
        code = grammer
          ? Prism.highlight(rawCode, grammer, isDiff ? `diff-${lang}` : lang)
          : escapeHtml(rawCode)

        if (isDiff) {
          code = code
            .split('\n')
            .map((line) =>
              line
                .replace('<span class="token prefix unchanged"> </span>', '')
                .replace('<span class="token prefix inserted">+</span>', '')
                .replace('<span class="token prefix deleted">-</span>', '')
            )
            .join('\n')
        }

        const childs = []
        const props = {
          className: [
            isDiff ? `language-diff-${lang}` : `language-${lang}`,
            'line-numbers',
          ],
        }
        if (lineHighlights) {
          props.dataLine = lineHighlights
        }

        /**
         * If filename, then set span as a first child
         */
        if (fileName) {
          childs.push(
            h(node, 'span', { className: ['filename'] }, [u('text', fileName)])
          )
        }

        /**
         * Inline HTML Token Highlight
         */
        const INLINE_HTML_TOKEN_SYNTAX = /\*\*(.*?)\*\*/g
        if (lang === 'html') {
          code = code.replace(
            INLINE_HTML_TOKEN_SYNTAX,
            (_, text) =>
              `<span class="code-highlight bg-code-highlight">${text}</span>`
          )
        }

        childs.push(h(node, 'pre', [h(node, 'code', props, [u('raw', code)])]))

        return h(node, 'div', { className: 'nuxt-content-highlight' }, childs)
      },
    },
  },
  feed: {
    type: 'rss2',
    path: '/feed.xml',
    cacheTime: 1000 * 60 * 15,
    async create(feed) {
      feed.options = {
        link: process.env.BASE_URL,
        title: process.env.META_TITLE,
        description: process.env.META_DESCRIPTION,
      }

      const { $content } = require('@nuxt/content')

      const articles = await $content('articles')
        .where({ published: true })
        .fetch()

      articles.forEach((article) => {
        feed.addItem({
          id: process.env.BASE_URL + '/' + article.slug,
          title: article.title,
          link: process.env.BASE_URL + '/' + article.slug,
          date: new Date(article.created),
          author: 'peterkimzz69@gmail.com',
          category: article.category,
          content: article.description,
          description: article.description,
        })
      })
    },
  },
  sitemap: {
    hostname: process.env.BASE_URL,
    routes: async () => {
      const { $content } = require('@nuxt/content')

      const articles = await $content('articles')
        .only(['path'])
        .where({ published: true })
        .fetch()

      return articles.map((article) => article.path.replace(/\/articles/gi, ''))
    },
  },
}
