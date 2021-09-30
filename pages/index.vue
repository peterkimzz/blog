<template>
  <div>
    <vue-s-e-o />
    <!-- 
    <div class="relative">
      <div
        class="
          relative
          py-4
          md:py-10
          bg-gray-700 bg-opacity-20
          overflow-hidden
          shadow-sm
        "
      >
        <div aria-hidden="true" class="absolute inset-0">
          <svg
            class="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 1463 360"
          >
            <path
              class="text-gray-800 text-opacity-30"
              fill="currentColor"
              d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
            />
            <path
              class="text-gray-800 text-opacity-40"
              fill="currentColor"
              d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
            />
          </svg>
        </div>
        <vue-container class="max-w-sm">
          <div class="relative rounded-md shadow-sm bg-gray-700 bg-opacity-5">
            <div
              class="
                absolute
                inset-y-0
                left-0
                pl-4
                md:pl-5
                flex
                items-center
                pointer-events-none
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              v-model="q"
              type="text"
              id="search-input"
              name="search"
              class="
                block
                w-full
                pl-12
                pr-20
                py-3
                md:pl-12
                md:py-4
                md:text-lg
                bg-transparent
                border-gray-600
                text-gray-200
                placeholder-gray-500
                focus:outline-none
                focus:ring-gray-500
                focus:border-gray-500
                rounded-md
              "
              placeholder="검색"
              aria-invalid="true"
              aria-describedby="search-error"
              @keyup="(e) => Search(e.target.value)"
            />
            <div
              class="
                absolute
                inset-y-0
                right-0
                pr-4
                md:pr-5
                flex
                items-center
                pointer-events-none
                text-gray-500
                font-semibold
              "
            >
              <span v-if="$device.isMacOS">⌘ K</span>
              <span v-else-if="$device.isMobile"></span>
              <span v-else>Ctrl K</span>
            </div>
          </div>
        </vue-container>
      </div>
    </div> -->

    <vue-container>
      <div class="py-10">
        <div v-if="!articles.length" class="text-center md:max-w-md md:mx-auto">
          <p class="mt-6 font-semibold text-gray-300">검색 결과가 없습니다.</p>
        </div>
        <ul v-else class="flex flex-wrap sm:-mx-4">
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
            class="w-full sm:w-1/2 sm:px-4 pb-14 md:pb-20 md:w-1/3"
          />
        </ul>
      </div>
    </vue-container>
  </div>
</template>

<script>
const IS_PROD = process.env.NODE_ENV === 'production'

export default {
  data() {
    return {
      q: '',
      articles: [],
    }
  },
  async asyncData({ $content, query }) {
    const q = query.q || ''
    const articles = await $content('articles')
      .sortBy('created', 'desc')
      .where(IS_PROD ? { published: true } : {})
      .search(q)
      .fetch()

    return { articles, q }
  },
  computed: {
    IsMac() {
      if (process.server) {
        return false
      }

      return window.navigator.platform.indexOf('Mac') > -1
    },
  },
  watch: {
    async '$route.query.q'(q) {
      this.articles = await this.$content('articles')
        .sortBy('created', 'desc')
        .where(IS_PROD ? { published: true } : {})
        .search(q)
        .fetch()
    },
  },
  methods: {
    Search(q) {
      this.$router.push({ query: { q } })
    },
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) {
        e.preventDefault()

        const $input = document.getElementById('search-input')
        $input.focus()
      }
    })
  },
  destroyed() {
    window.removeEventListener('keydown', () => {})
  },
}
</script>
