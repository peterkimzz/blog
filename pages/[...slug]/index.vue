<script setup lang="ts">
import { ArrowsRightLeftIcon } from "@heroicons/vue/24/solid";

definePageMeta({ layout: "no-footer" });

const { contentPosition, toggleContentPosition } = useBlogSetting();

useClickToImageZoom();

const { path } = useRoute();
const { data: article, error } = await useAsyncData(() =>
  queryContent().where({ _path: path }).findOne()
);

if (error.value) {
  navigateTo("/error", { replace: true });
}
</script>

<template>
  <div class="lg:h-[calc(100dvh-53px)] lg:overflow-hidden break-keep">
    <MaxWidthContainer class="h-full">
      <div
        :class="[
          'flex gap-10 flex-col transition-all h-full',
          contentPosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row',
        ]"
      >
        <!-- Main Content -->
        <section
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
        </section>

        <!-- Actions Panel -->
        <section
          class="max-w-prose w-full mx-auto lg:flex-1 lg:overflow-y-scroll py-10"
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

          <div class="pt-5">
            <Footer />
          </div>
        </section>
      </div>
    </MaxWidthContainer>
  </div>
</template>

<style>
.prose [id]::before {
  @apply invisible mt-[-80px] block h-[80px] content-[""];
}
</style>
