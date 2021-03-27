<template>
  <main class="pb-10">
    <vue-s-e-o
      :title="article.title"
      :description="article.description"
      :thumbnail="article.thumbnail"
    />

    <article>
      <header class="mt-10">
        <h1 class="flex flex-col items-center">
          <span class="text-cyan-500 font-semibold tracking-wider uppercase">{{
            article.category
          }}</span>
          <span
            class="mt-2 text-center text-3xl md:text-3xl font-extrabold tracking-tight text-gray-100"
            >{{ article.title }}</span
          >
        </h1>
        <p class="mt-6 text-center text-sm text-gray-500 font-semibold">
          {{ $dayjs(article.updated).format('YYYY년 MM월 DD일') }}
        </p>

        <hr class="my-8 border-t-2 border-gray-700 w-20 mx-auto" />
      </header>

      <!-- Maybe @tailwindcss/jit -->
      <nuxt-content
        :document="article"
        class="md:hidden prose prose-sm prose-cyan"
      />
      <nuxt-content
        :document="article"
        class="hidden md:block prose prose-cyan"
      />

      <vue-divider class="my-10" />

      <vue-prev-next :prev="prev" :next="next" class="mb-14" />

      <vue-divider class="my-10" />

      <client-only>
        <vue-comment />
      </client-only>

      <vue-divider class="my-10" />

      <vue-sponsor-button />
    </article>
  </main>
</template>

<script>
export default {
  layout: 'article',
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return { article, prev, next }
  }
  // async mounted() {
  //   const articles = await this.$content('articles')
  //   console.log(articles)
  // }
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

.nuxt-content-highlight .filename {
  @apply absolute right-0 text-gray-400 font-light z-10;
  @apply text-xs md:text-sm;
  @apply mr-2.5 mt-1;
  @apply pointer-events-none;
}
</style>