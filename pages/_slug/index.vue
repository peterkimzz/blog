<template>
  <main>
    <vue-seo :title="article.title" :description="article.description" />

    <div class="-mx-6 md:mx-0">
      <vue-image
        :src="article.thumbnail"
        :alt="article.alt"
        class="rounded-none md:rounded-md"
      />
    </div>

    <article>
      <!-- <vue-info-box>
          <template #info-box>
            This is a vue component inside markdown using slots
          </template>
        </vue-info-box> -->
      <div class="my-3">
        <vue-heading>{{ article.title }}</vue-heading>
        <p class="text-gray-500 mt-1 text-xs">
          {{ formatDate(article.updatedAt) }}에 마지막으로 수정됨.
        </p>
      </div>

      <nav
        class="toc my-4 p-4 text-sm bg-gray-50 border border-gray-200 rounded-lg"
      >
        <ul>
          <p class="mb-1"><b>목차</b></p>
          <li
            v-for="link of article.toc"
            :key="link.id"
            :class="{
              'py-1': link.depth === 2,
              'pl-3 py-1': link.depth === 3
            }"
          >
            <vue-link :href="`#${link.id}`" block>{{ link.text }}</vue-link>
          </li>
        </ul>
      </nav>

      <nuxt-content :document="article" />

      <vue-prev-next :prev="prev" :next="next" class="py-10" />
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
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('ko', options)
    }
  }
}
</script>

<style lang="postcss" scoped>
::v-deep .nuxt-content h1 {
  @apply my-4;
}
::v-deep .nuxt-content h2 {
  @apply font-bold;
  @apply text-2xl;
  @apply my-4;
}
::v-deep .nuxt-content h3 {
  @apply font-bold;
  @apply text-xl;
  @apply my-4;
}
::v-deep .nuxt-content p {
  @apply mb-6 md:mb-8;
  @apply text-sm md:text-base;
  @apply leading-6 md:leading-7;
}
::v-deep .nuxt-content p code {
  @apply bg-gray-100 text-black py-0.5 px-1.5 rounded-md;
}
::v-deep .nuxt-content img {
  @apply mb-6 md:mb-8;
  @apply mx-auto;
}
::v-deep .nuxt-content a {
  @apply underline;
}
/* ::v-deep .icon.icon-link {
  background-image: url('~assets/svg/icon-hashtag.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
} */

::v-deep .nuxt-content-highlight {
  @apply relative;
  @apply mb-6 md:mb-8;
  @apply text-sm md:text-base;
  @apply leading-6 md:leading-7;
}
::v-deep .nuxt-content-highlight .filename {
  @apply absolute right-0 text-gray-400 font-light z-10 mr-2.5 mt-1 text-sm;
  @apply pointer-events-none;
}
::v-deep .nuxt-content-highlight .line-numbers {
  @apply rounded-md;
}

::v-deep .nuxt-content blockquote {
  @apply p-4;
  @apply mb-6 md:mb-8;
  @apply bg-gray-100;
  @apply rounded-md;

  & p {
    margin: 0 !important;
  }
}
</style>