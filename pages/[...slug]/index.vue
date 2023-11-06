<script setup lang="ts">
const { contentPosition, toggleContentPosition } = useBlogSetting();

useClickToZoomImage();

const { path } = useRoute();
const { data: article, error } = await useAsyncData(
  queryContent().where({ _path: path }).findOne
);
const { data: articles } = await useAsyncData(
  queryContent().where({
    category: article.value?.category,
    _path: { $ne: path },
  }).find
);

if (error.value) {
  navigateTo("/error", { replace: true });
}

if (article?.value) {
  useContentHead(article);
}
</script>

<template>
  <UContainer>
    <div class="flex lg:gap-10 lg:flex-row flex-col transition-all h-full">
      <!-- Main Content -->
      <main
        v-if="article"
        class="max-w-prose w-full mx-auto lg:flex-[1_0_0%] overflow-y-scroll py-10 pr-4"
      >
        <div class="pb-10 text-center">
          <h1
            class="text-3xl max-w-md mx-auto font-bold leading-tight tracking-[-0.01em] text-black pb-3"
          >
            {{ article.title }}
          </h1>

          <ArticleDate :date="article.created" class="text-lg" />
        </div>

        <ContentDoc
          class="prose md:prose-lg max-w-full prose-headings:tracking-tight prose-p:font-medium prose-p:text-gray-600 prose-a:font-semibold prose-a:text-blue-600 prose-a:prose-headings:font-bold prose-a:prose-headings:text-gray-900 prose-a:prose-headings:no-underline prose-strong:font-bold prose-img:rounded-lg prose-img:border prose-img:shadow-sm"
        />
      </main>

      <!-- Action Sticky Panel -->
      <aside class="sticky top-[53px] max-w-prose h-fit w-full mx-auto py-10">
        <section class="hidden lg:block">
          <h4 class="text-gray-600 text-sm font-semibold pb-0.5">목차</h4>
          <ul v-if="article?.body?.toc?.links">
            <li
              v-for="link in article.body.toc.links"
              class="text-gray-900 font-medium"
            >
              <NuxtLink :href="'#' + link.id">{{ link.text }}</NuxtLink>
            </li>
          </ul>
        </section>
        <!-- 
          <div>
            <h4 class="text-gray-600 text-sm font-semibold pb-1.5">편의기능</h4>
            <div>
              <UButton
                color="gray"
                leading-icon="i-lucide-arrow-right-left"
                @click="toggleContentPosition"
              >
                좌우 반전
              </UButton>
            </div>
          </div> -->

        <ArticleComment />
      </aside>
    </div>

    <section class="py-10">
      <h3 class="text-2xl text-black font-bold">같은 카테고리의 다른 글</h3>
      <div class="py-10">
        <div v-if="!articles?.length">다른 글이 없습니다.</div>
        <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <ArticleCard
            v-for="article in articles"
            :key="article._id"
            :path="article._path ?? ''"
            :title="article.title ?? ''"
            :description="article.description"
            :created="article.created"
          />
        </ul>
      </div>
    </section>
  </UContainer>
</template>

<style>
.prose [id]::before {
  @apply invisible mt-[-80px] block h-[80px] content-[""];
}
</style>
