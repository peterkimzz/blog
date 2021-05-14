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
          <span class="text-cyan-500 font-semibold tracking-wider uppercase">{{
            article.category
          }}</span>

          <h1
            class="mt-2 text-center text-2xl md:text-3xl font-extrabold tracking-tight text-gray-100"
          >
            {{ article.title }}
          </h1>
        </div>
        <p
          class="mt-6 text-center text-sm md:text-sm text-gray-500 font-semibold"
        >
          {{ $dayjs(article.updated).format('YYYY년 MM월 DD일') }}
        </p>

        <vue-share
          :title="article.title"
          :description="article.description"
          :url="PageURL"
        />
      </header>

      <nuxt-content
        :document="article"
        class="w-full max-w-full prose prose-sm md:prose-lg prose-cyan md:prose-cyan"
      />

      <vue-divider class="my-10" />

      <vue-prev-next :prev="prev" :next="next" class="mb-14" />

      <vue-divider class="my-10" />

      <vue-comment />

      <!-- <vue-divider class="my-10" /> -->
      <!-- <vue-sponsor-button /> -->
    </article>
  </main>
</template>

<script>
const IS_PROD = process.env.NODE_ENV === 'production'

export default {
  layout: 'article',
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
  computed: {
    PageURL() {
      return process.env.BASE_URL + '/' + this.article.slug + '/'
    },
  },
}
</script>

<style lang="postcss">
.nuxt-content img {
  @apply mx-auto;
}

.nuxt-content img + em {
  @apply block;
  @apply text-gray-400;
  @apply text-sm;
  @apply text-center;
  @apply -mt-4;
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
</style>