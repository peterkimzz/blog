<template>
  <div>
    <input
      v-model="query"
      type="search"
      autocomplete="off"
      placeholder="Search Articles"
    />
    <ul v-if="articles.length">
      <li v-for="article of articles" :key="article.slug">
        <n-link :to="{ name: 'slug', params: { slug: article.slug } }">
          {{ article.title }}
        </n-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      articles: [],
    }
  },
  watch: {
    async query(v) {
      if (!v) {
        this.articles = []
        return
      }

      this.articles = await this.$content('articles').limit(6).search(v).fetch()
    },
  },
}
</script>