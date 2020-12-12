<template>
  <div>
    <vue-container>
      <ul class="article-wrapper">
        <vue-article-preview
          v-for="article of articles"
          :key="article.slug"
          :slug="article.slug"
          :category="article.category"
          :title="article.title"
          :description="article.description"
          :thumbnail="article.thumbnail"
          :updated-at="article.updatedAt"
          class="w-1/2 pb-10 px-1 md:w-1/4 md:px-1.5"
        />
      </ul>
    </vue-container>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const articles = await $content('articles')
      // .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      articles
    }
  }
}
</script>

<style lang="postcss" scoped>
.article-wrapper {
  @apply flex flex-wrap;
}
.article {
  @apply w-1/4;
  @apply p-2;
}
</style>
