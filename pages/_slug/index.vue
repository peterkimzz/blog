<template>
  <main class="pb-10">
    <vue-s-e-o
      :title="article.title"
      :description="article.description"
      :thumbnail="article.thumbnail"
    />

    <div class="-mx-6 md:mx-0">
      <vue-image
        :src="article.thumbnail"
        :alt="article.alt"
        class="rounded-none md:rounded-md"
        padding-top="50%"
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
        <p class="text-gray-500 mt-1.5 text-xs">
          {{ formatDate(article.updated) }}에 마지막으로 수정됨.
        </p>
      </div>

      <!-- <nav
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
      </nav> -->

      <nuxt-content :document="article" />

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
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('ko', options)
    }
  }
  // async mounted() {
  //   const articles = await this.$content('articles')
  //   console.log(articles)
  // }
}
</script>

<style lang="postcss" scoped>
::v-deep .nuxt-content {
  & > * {
    @apply mt-6 md:mt-8;
  }

  & > em {
    @apply font-semibold;
  }

  & a {
    @apply text-gray-400;
  }

  & p {
    @apply text-sm md:text-base;
    @apply leading-6 md:leading-7;

    & > strong {
      @apply text-white;
    }
  }

  #text {
  }

  & p code {
    @apply leading-3;
    @apply font-sans;
    @apply bg-gray-700 text-gray-100 py-0.5 px-1.5 rounded-md;
    @apply text-sm;
  }

  & a {
    @apply underline;
  }

  & img {
    @apply mx-auto;
  }

  & ul,
  & ol {
    @apply text-sm md:text-base;
    @apply leading-6 md:leading-7;
    @apply pl-5;
  }

  & ul li {
    @apply list-disc;
  }

  & ol li {
    @apply list-decimal;
  }
}

::v-deep .nuxt-content blockquote {
  @apply p-4;
  @apply mb-6 md:mb-8;
  @apply bg-gray-900;
  @apply rounded-r-md;
  @apply border-l-4 border-gray-700;
  @apply text-sm md:text-base;
  @apply leading-6 md:leading-7;

  & p {
    margin: 0 !important;
  }
}

::v-deep .nuxt-content h1 {
  @apply font-bold;
}
::v-deep .nuxt-content h2 {
  @apply font-bold;
  @apply text-2xl;
}
::v-deep .nuxt-content h3 {
  @apply font-bold;
  @apply text-xl;
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
  @apply text-xs md:text-sm;
  @apply leading-6 md:leading-7;
}
::v-deep .nuxt-content-highlight .filename {
  @apply absolute right-0 text-gray-400 font-light z-10 mr-2.5 mt-1 text-sm;
  @apply pointer-events-none;
}
::v-deep .nuxt-content-highlight .line-numbers {
  @apply mb-6 md:mb-8;
  @apply rounded-md;
}
</style>