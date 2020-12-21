<template>
  <span v-if="false" />
</template>

<script>
const TITLE = process.env.META_TITLE
const SITE_NAME = 'peterkimzz'
export default {
  props: {
    title: {
      type: String,
      default: TITLE
    },
    titleTemplate: {
      type: String,
      default: SITE_NAME
    },
    titleTemplateVisible: {
      type: Boolean,
      default: true
    },
    description: {
      type: String,
      default: ''
    },
    thumbnail: {
      type: String,
      default: ''
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.seoLang,
        dir: 'ltr'
      },
      title: this.seoTitle,
      meta: [
        // Native
        {
          hid: 'description',
          name: 'description',
          content: this.seoDescription
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            '개발자 peterkimzz의 개발과 예술, 그리고 일상을 정리하는 공간입니다.'
        },
        {
          hid: 'author',
          name: 'author',
          content: SITE_NAME
        },
        // Open Graph
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:url',
          content: this.seoURL
        },
        {
          property: 'og:title',
          content: this.seoTitle
        },
        {
          property: 'og:image',
          content: this.seoImage
        },
        {
          property: 'og:description',
          content: this.seoDescription
        },
        {
          property: 'og:site_name',
          content: SITE_NAME
        },
        {
          property: 'og:locale',
          content: this.seoLang
        },
        // Twitter
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:site',
          content: '@peterkimzz'
        },
        {
          name: 'twitter:creator',
          content: '@peterkimzz'
        },
        {
          name: 'twitter:title',
          content: this.seoTitle
        },
        {
          name: 'twitter:description',
          content: this.seoDescription
        },
        {
          name: 'twitter:image',
          content: this.seoImage
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: this.seoURL
        },
        {
          rel: 'icon',
          href: this.seoFavicon
        },
        {
          rel: 'shortcut icon',
          href: this.seoFavicon
        },
        {
          rel: 'apple-touch-icon',
          href: this.seoFavicon
        }
      ]
    }
  },
  computed: {
    seoTitle() {
      if (!this.titleTemplateVisible) {
        return this.title
      }

      return `${this.title} - ${this.titleTemplate}`
    },
    seoDescription() {
      if (!this.description) {
        return process.env.META_DESCRIPTION
      }

      const $ = this.$cheerio.load(this.description)
      const description = $.text()
      return description.substring(0, 150)
    },
    seoURL() {
      return process.env.BASE_URL + this.$route.path
    },
    seoLang() {
      return 'ko'
    },
    seoImage() {
      return this.thumbnail || process.env.BASE_URL + '/thumbnail.png'
    },
    seoFavicon() {
      return process.env.BASE_URL + '/favicon.png'
    }
  }
}
</script>