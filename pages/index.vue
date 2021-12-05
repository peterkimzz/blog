<template>
  <div>
    <VueSEO />
    <VueContainer>
      <div>
        <div class="text-sm font-bold text-gray-500">카테고리</div>
        <div class="flex py-1 space-x-2">
          <n-link to="/" class="text-gray-600">전체</n-link>
          <n-link to="?category=tech" class="text-gray-600">기술</n-link>
          <n-link to="?category=design" class="text-gray-600">디자인</n-link>
          <n-link to="?category=review" class="text-gray-600">회고</n-link>
          <!-- <n-link to="?category=life" class="text-gray-600">일상</n-link> -->
        </div>
      </div>

      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pt-10 pb-20">
        <VueArticlePreview
          v-for="article of articles"
          :key="article.slug"
          :published="article.published"
          :slug="article.slug"
          :category="article.category"
          :title="article.title"
          :description="article.description"
          :thumbnail="article.thumbnail"
          :updated="article.created"
          class
        />
      </ul>
    </VueContainer>
  </div>
</template>

<script>
const IS_PROD = process.env.NODE_ENV === 'production'

export default {
  data() {
    return {
      articles: [],
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  async fetch() {
    const { query } = this.$route
    const where = {}

    if (IS_PROD) {
      where.published = true
    }
    if (query.category) {
      where.category = query.category
    }

    const articles = await this.$content('articles')
      .sortBy('created', 'desc')
      .where(where)
      .fetch()

    this.articles = articles
  },
}
</script>

<style>
.nuxt-link-exact-active {
  @apply text-gray-300;
  @apply font-semibold;
}
</style>