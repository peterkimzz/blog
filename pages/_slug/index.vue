<template>
  <main class="pb-10">
    <vue-s-e-o
      :title="article.title"
      :description="article.description"
      :thumbnail="article.thumbnail"
    />

    <article class="relative">
      <header class="mt-10 mb-10">
        <div class="flex flex-col items-center">
          <p class="text-center text-sm font-semibold text-gray-400 md:text-sm">
            <time :datetime="article.updated">{{
              $dayjs(article.updated).format('YYYY년 MM월 DD일')
            }}</time>
          </p>

          <h1
            class="mt-4 max-w-[18rem] text-center text-2xl font-extrabold tracking-tight text-gray-100 md:max-w-full md:text-3xl"
          >
            {{ article.title }}
          </h1>
        </div>

        <VueShare
          :title="article.title"
          :description="article.description"
          :thumbnail="article.thumbnail"
          :url="PageURL"
        />
      </header>

      <nuxt-content
        :document="article"
        :class="[
          'prose prose-base prose-cyan w-full max-w-full prose-a:!text-cyan-500 prose-a:underline-offset-[3px]',
          'md:prose-lg',
        ]"
      />

      <VueDivider class="mt-20 mb-10" />

      <VuePrevNext :prev="prev" :next="next" class="mb-14" />

      <div class="giscus mt-10"></div>
    </article>
  </main>
</template>

<script>
const IS_PROD = process.env.NODE_ENV === 'production'

export default {
  layout: 'article',
  head() {
    return {
      // Load `giscus` when production mode is on
      script: IS_PROD
        ? [
            {
              src: 'https://giscus.app/client.js',
              crossorigin: 'anonymous',
              async: true,
              'data-repo': 'peterkimzz/blog',
              'data-repo-id': 'MDEwOlJlcG9zaXRvcnkzMjAyNTkyMTY=',
              'data-category': 'Blog Comments',
              'data-category-id': 'DIC_kwDOExbEkM4B-8Mf',
              'data-mapping': 'title',
              'data-reactions-enabled': 1,
              'data-emit-metadata': 0,
              'data-theme': 'dark',
              // callback: () => {
              //   console.log('reday', this.isGiscusReady)
              //   this.isGiscusReady = true
              // },
            },
          ]
        : [],
    }
  },
  async asyncData({ $content, params, error }) {
    try {
      const article = await $content('articles', params.slug).fetch()

      const [prev, next] = await $content('articles')
        .sortBy('created', 'asc')
        .where(IS_PROD ? { published: true } : {})
        .surround(params.slug)
        .fetch()

      console.log(prev)

      return { article, prev, next }
    } catch (err) {
      error(err)
    }
  },
  data() {
    return {
      isGiscusReady: false,
    }
  },
  computed: {
    PageURL() {
      return process.env.BASE_URL + '/' + this.article.slug + '/'
    },
  },
}
</script>

<style>
.nuxt-content img {
  @apply mx-auto rounded-lg;
}

.nuxt-content img + em {
  @apply block;
  @apply text-zinc-400;
  @apply text-sm;
  @apply text-center;
  @apply -mt-4;
  @apply not-italic;
}

.nuxt-content-highlight {
  @apply relative;
}
.nuxt-content-highlight .filename {
  @apply absolute right-0 z-10 font-light text-gray-400;
  @apply text-xs md:text-sm;
  @apply mr-2.5 mt-1;
  @apply pointer-events-none;
}

/* .nuxt-content .token.inserted {
  @apply bg-green-900;
}
.nuxt-content .token.deleted {
  @apply bg-red-900;
} */
/* .nuxt-content .token.deleted::before {
  content: "-";
} */

.nuxt-content pre code::before,
.nuxt-content pre code::after {
  @apply !content-none;
}

/* .nuxt-content .prose a {
  @apply !text-cyan-500;
  @apply underline-offset-2;
} */
</style>
