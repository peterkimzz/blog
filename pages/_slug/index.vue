<template>
  <vue-container class="max-w-screen-sm">
    <main>
      <div class="-mx-3 md:mx-0">
        <vue-image :src="article.thumbnail" :alt="article.alt" />
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
          <vue-heading as="h4">목차</vue-heading>
          <ul>
            <li
              v-for="link of article.toc"
              :key="link.id"
              :class="{
                'py-1.5': link.depth === 2,
                'pl-3 py-1.5': link.depth === 3
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
  </vue-container>
</template>

<script>
export default {
  head() {
    return {
      title: this.article.title,
      description: this.article.description
    }
  },
  nuxt: 'is the best',
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
::v-deep .nuxt-content h2 {
  font-weight: bold;
  font-size: 28px;
}
::v-deep .nuxt-content h3 {
  font-weight: bold;
  font-size: 22px;
}
::v-deep .nuxt-content p {
  margin-bottom: 20px;
}
::v-deep .nuxt-content p code {
  @apply bg-gray-100 text-black py-0.5 px-1.5 rounded-md;
}
::v-deep .nuxt-content img {
  @apply my-6;
  @apply mx-auto;
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
}
::v-deep .nuxt-content-highlight .filename {
  @apply absolute right-0 text-gray-400 font-light z-10 mr-2.5 mt-1 text-sm;
  @apply pointer-events-none;
}

::v-deep .nuxt-content blockquote {
  @apply p-4;
  @apply bg-gray-500;

  & p {
    margin: 0;
  }
}
</style>