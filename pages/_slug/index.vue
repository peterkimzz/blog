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
          <p class="text-center text-sm md:text-sm text-gray-400 font-semibold">
            <time :datetime="article.updated">{{ $dayjs(article.updated).format('YYYY년 MM월 DD일') }}</time>
          </p>

          <!-- <span class="text-cyan-500 font-semibold tracking-wider uppercase">
            {{
              article.category
            }}
          </span>-->

          <h1
            class="mt-4 text-center max-w-[18rem] md:max-w-full text-2xl md:text-3xl font-extrabold tracking-tight text-gray-100"
          >{{ article.title }}</h1>
        </div>

        <vue-share
          :title="article.title"
          :description="article.description"
          :thumbnail="article.thumbnail"
          :url="PageURL"
        />
      </header>

      <nuxt-content
        :document="article"
        class="w-full max-w-full prose prose-cyan prose-base md:prose-lg"
      />

      <vue-divider class="mt-20 mb-10" />

      <vue-prev-next :prev="prev" :next="next" class="mb-14" />

      <vue-divider class="my-10" />

      <div class="giscus"></div>
    </article>
  </main>
</template>

<script>
import Prism from 'prismjs'

const IS_PROD = process.env.NODE_ENV === 'production'

export default {
  layout: 'article',
  head() {
    return {
      // Load `giscus` when production mode is on
      script: IS_PROD ? [
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
      ] : [],
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
  mounted() {
    Prism.highlightAll()
  }
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
  @apply absolute right-0 text-gray-400 font-light z-10;
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
.nuxt-content .token.deleted::before {
  content: "-";
}

/* .nuxt-content pre code::before,
.nuxt-content pre code::after {
  @apply !content-none;
} */
</style>