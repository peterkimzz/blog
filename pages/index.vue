<template>
  <div>
    <VueSEO />
    <VueContainer>
      <div>
        <div class="text-xs font-bold text-gray-500">카테고리</div>
        <div class="flex space-x-2 border-b border-gray-700/50 text-sm md:text-base">
          <n-link
            v-for="category in categories"
            :key="category.slug"
            :to="{ query: category.slug && { ...$route.query, category: category.slug } }"
            class="category-link"
          >{{ category.title }}</n-link>
        </div>
      </div>

      <div class="pt-10 pb-20">
        <template v-if="$fetchState.pending" class="text-gray-500">Loading...</template>
        <ul v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
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
      </div>
    </VueContainer>
  </div>
</template>

<script>
const IS_PROD = process.env.NODE_ENV === 'production'

export default {
  data() {
    return {
      loading: false,
      articles: [],
      categories: [
        {
          title: '전체',
          slug: ''
        },
        {
          title: '기술',
          slug: 'tech'
        },
        {
          title: '디자인',
          slug: 'design'
        },
        {
          title: '회고',
          slug: 'review'
        },
        {
          title: '일상',
          slug: 'life'
        },
      ]
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  async fetch() {
    try {
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
    } catch (err) {
      console.log(err)
    } finally {
      this.loading = false
    }
  },
}
</script>

<style>
.category-link {
  @apply transition-all border-b-2 border-transparent px-1.5 py-2 text-gray-600 hover:text-gray-400;
}

.category-link.nuxt-link-exact-active {
  @apply text-gray-300;
  @apply font-semibold;
  @apply border-gray-400;
}
</style>