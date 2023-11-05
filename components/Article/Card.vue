<script setup lang="ts">
const { path } = defineProps<{
  path: string;
  title: string;
  description: string;
  created: string;
}>();
</script>

<template>
  <li>
    <NuxtLink :to="path" class="flex flex-col hover:no-underline group">
      <header class="sm:h-[142px]">
        <h3
          class="text-xl text-gray-900 font-bold leading-tight pb-2 group-hover:underline tracking-[-0.01em]"
        >
          {{ title }}
        </h3>

        <p class="line-clamp-3 text-gray-600/90 font-medium">
          {{ description }}
        </p>
      </header>

      <div class="flex-1 flex items-center justify-between gap-1.5 pt-1">
        <ArticleDate :date="created" class="text-gray-900 font-medium" />
      </div>
    </NuxtLink>
  </li>
</template>
