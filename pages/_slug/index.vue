<template>
  <main class="pb-10">
    <vue-s-e-o
      :title="article.title"
      :description="article.description"
      :thumbnail="article.thumbnail"
    />

    <article class="relative">
      <header class="mt-10 mb-10">
        <h1 class="flex flex-col items-center">
          <span class="text-cyan-500 font-semibold tracking-wider uppercase">{{
            article.category
          }}</span>
          <span
            class="mt-2 text-center text-3xl md:text-3xl font-extrabold tracking-tight text-gray-100"
            >{{ article.title }}</span
          >
        </h1>
        <p
          class="mt-6 text-center text-xs md:text-sm text-gray-500 font-semibold"
        >
          {{ $dayjs(article.updated).format('YYYY년 MM월 DD일') }}
        </p>
      </header>

      <nuxt-content
        :document="article"
        class="mx-auto prose prose-sm md:prose-lg prose-cyan md:prose-cyan"
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
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['category', 'title', 'slug'])
      .sortBy('created', 'asc')
      .where(IS_PROD ? { is_published: true } : {})
      .surround(params.slug)
      .fetch()

    return { article, prev, next }
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
