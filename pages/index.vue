<script setup lang="ts">
const { data: articles, pending } = await useAsyncData(
  queryContent().sort({ created: -1 }).find
);
</script>

<template>
  <UContainer>
    <div v-if="pending">Loading..</div>
    <ul v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 py-10">
      <ArticleCard
        v-for="article in articles"
        :key="article._id"
        :path="article._path ?? ''"
        :title="article.title ?? ''"
        :description="article.description"
        :created="article.created"
      />
    </ul>
  </UContainer>
</template>
