<template>
  <div>
    <VueSEO />

    <VueContainer>
      <div class="pb-20 md:grid md:grid-cols-6 md:gap-10 flex-row-reverse">
        <div class="col-span-4 lg:col-span-5 mt-6 sm:mt-0">
          <template v-if="$fetchState.pending" class="text-gray-500">Loading...</template>
          <ul v-else class="grid grid-cols-1 lg:grid-cols-3 gap-10">
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

        <div
          class="col-span-2 lg:col-span-1 mt-16 md:mt-0 md:sticky md:top-10 md:self-start space-y-10 md:space-y-6"
        >
          <div>
            <div class="text-xs font-bold text-gray-500/70">카테고리</div>
            <ul class="mt-3">
              <n-link
                v-for="category in categories"
                :key="category.slug"
                :to="{ query: category.slug && { ...$route.query, category: category.slug } }"
                class="category-link"
              >{{ category.title }}</n-link>
            </ul>
          </div>

          <div>
            <div class="text-xs font-bold text-gray-500/70">기능</div>
            <ul class="mt-3">
              <li>
                <a
                  href="mailto:peterkimzz69@gmail.com"
                  class="flex text-gray-500 items-center underline-offset-2 gap-1.5 hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                    />
                  </svg>
                  메일 보내기
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://whattime.co.kr/peterkimzz"
                  class="flex text-gray-500 items-center underline-offset-2 gap-1.5 hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>화상 미팅하기
                </a>
              </li>
            </ul>
          </div>

          <div class="text-xs text-gray-600">
            <VueCopyright />
          </div>
        </div>
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
  @apply block;
  @apply transition-all border-b-2 border-gray-700/50 pl-4 pr-2 py-0.5 text-gray-600 hover:text-gray-400;
  @apply border-l-2 border-b-0;
}

.category-link.nuxt-link-exact-active {
  @apply font-semibold;
  @apply text-gray-300;
  @apply border-gray-400;
}
</style>