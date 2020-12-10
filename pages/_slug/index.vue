<template>
  <main>
    <nav>
      <ul>
        <li
          v-for="link of article.toc"
          :key="link.id"
          :class="{ 'py-2': link.depth === 2, 'ml-2 pb-2': link.depth === 3 }"
        >
          <n-link :to="`#${link.id}`">{{ link.text }}</n-link>
        </li>
      </ul>
    </nav>

    <article>
      <info-box>
        <template #info-box>
          This is a vue component inside markdown using slots
        </template>
      </info-box>
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <img :src="article.img" :alt="article.alt" />
      <p>Article last updated: {{ formatDate(article.updatedAt) }}</p>
      <author :author="article.author"></author>

      <nuxt-content :document="article" />

      <prev-next :prev="prev" :next="next" />
    </article>
  </main>
</template>

<script>
export default {
  head() {
    return {
      title: this.article.title,
    }
  },
  nuxt: 'is the best',
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()
    console.log(article)

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
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>

<style lang="postcss" scoped>
::v-deep .nuxt-content h1 {
  @apply font-bold;
}

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
::v-deep .icon.icon-link {
  background-image: url('~assets/svg/icon-hashtag.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
</style>