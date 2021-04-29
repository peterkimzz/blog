<template>
  <div>
    <vue-s-e-o />

    <vue-container>
      <!-- <input type="search" v-model="query" autocomplete="off" /> -->

      <ul class="flex flex-wrap -mx-1 md:-mx-1.5">
        <vue-article-preview
          v-for="article of articles"
          :key="article.slug"
          :slug="article.slug"
          :category="article.category"
          :title="article.title"
          :description="article.description"
          :thumbnail="article.thumbnail"
          :updated="article.updated"
          class="w-1/2 pb-10 px-1 md:w-1/3 md:px-1.5 lg:w-1/4"
        />
      </ul>
    </vue-container>
  </div>
</template>

<script>
const IS_PROD = process.env.NODE_ENV === 'production'

export default {
  data() {
    return {
      query: '',
      articles: [],
    }
  },
  async asyncData({ $content }) {
    const articles = await $content('articles')
      // .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('created', 'desc')
      .where(IS_PROD ? { is_published: true } : {})
      .fetch()

    return { articles }
  },
  // watch: {
  //   async query(query) {
  //     if (!query) {
  //       this.articles = []
  //       return
  //     }

  //     this.articles = await this.$content('articles')
  //       // .only(['title', 'description', 'img', 'slug', 'author'])
  //       .sortBy('created', 'desc')
  //       .search(query)
  //       .where({ is_published: true })
  //       .fetch()
  //   },
  // },
}
</script>
