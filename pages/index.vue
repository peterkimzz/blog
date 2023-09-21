<script setup lang="ts">
const { data: articles, pending } = await useAsyncData(() =>
  queryContent().sort({ created: -1 }).find()
);
</script>

<template>
  <main>
    <MaxWidthContainer>
      <div v-if="pending">Loading..</div>
      <ul v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 py-10">
        <li v-for="article in articles">
          <NuxtLink
            :to="article._path"
            class="flex flex-col hover:no-underline group"
          >
            <header class="sm:h-[142px]">
              <h3
                class="text-xl text-gray-900 font-bold leading-tight pb-2 group-hover:underline tracking-[-0.01em]"
              >
                {{ article.title }}
              </h3>

              <p class="line-clamp-3 text-gray-600/90 font-medium">
                {{ article.description }}
              </p>
            </header>

            <div class="flex-1 flex items-center justify-between gap-1.5 pt-1">
              <ArticleDate
                :date="article.created"
                class="text-gray-900 font-medium"
              />
            </div>
          </NuxtLink>
        </li>
      </ul>
    </MaxWidthContainer>
  </main>
</template>
