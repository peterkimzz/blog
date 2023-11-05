<script setup lang="ts">
useHead({
  script: [
    {
      src: "https://giscus.app/client.js",
      "data-repo": "peterkimzz/blog",
      "data-repo-id": "MDEwOlJlcG9zaXRvcnkzMjAyNTkyMTY=",
      "data-category": "Blog Comments",
      "data-category-id": "DIC_kwDOExbEkM4B-8Mf",
      "data-mapping": "title",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": "preferred_color_scheme",
      "data-lang": "ko",
      "data-loading": "lazy",
      crossorigin: "anonymous",
      async: true,
    },
  ],
});
</script>

<template>
  <div class="giscus"></div>
</template>
