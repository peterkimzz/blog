<script setup lang="ts">
useHead({
  htmlAttrs: {
    dir: "ltr",
    lang: "ko",
  },
  link: [
    {
      rel: "stylesheet",
      as: "style",
      href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css",
      crossorigin: "anonymous",
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
