<template>
  <div>
    <vue-s-e-o />

    <vue-container>
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
      .sortBy('created', 'desc')
      .fetch()

    return { articles }
  }
}
</script>
