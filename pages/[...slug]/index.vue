<script setup lang="ts">
import { ArrowsRightLeftIcon } from "@heroicons/vue/24/solid";

const { contentPosition, toggleContentPosition } = useBlogSetting();

useClickToZoomImage();

const { path } = useRoute();
const { data: article, error } = await useAsyncData(() =>
  queryContent().where({ _path: path }).findOne()
);

if (error.value) {
  navigateTo("/error", { replace: true });
}
</script>

<template>
  <MaxWidthContainer>
    <div
      :class="[
        'flex gap-10 flex-col transition-all h-full',
        contentPosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row',
      ]"
    >
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
      <aside
        class="sticky top-10 h-fit max-w-prose w-full mx-auto lg:flex-1 lg:overflow-y-scroll py-10"
      >
        <div>
          <h4 class="font-medium pb-2 text-sm">부가 기능</h4>
          <div>
            <button
              class="py-1 px-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition border inline-flex items-center gap-1.5"
              @click="toggleContentPosition"
            >
              <ArrowsRightLeftIcon class="w-4 h-4" />
              좌우 반전
            </button>
          </div>
        </div>

        <hr class="my-10" />

        <div>
          <ArticleComment />
        </div>
      </aside>
    </div>

    <section>
      <!-- <div v-for="i in 10">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
        voluptatibus accusamus voluptatum quod commodi adipisci, fuga ipsum
        perspiciatis. Soluta qui praesentium in facilis deleniti animi eius
        similique rem vitae quas.
      </div> -->
    </section>
  </MaxWidthContainer>
</template>

<style>
.prose [id]::before {
  @apply invisible mt-[-80px] block h-[80px] content-[""];
}
</style>
