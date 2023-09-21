<script setup lang="ts">
useHead({
  htmlAttrs: {
    dir: "ltr",
    lang: "ko",
  },
  meta: [
    { "http-equiv": "X-UA-Compatible", content: "IE=edge,chrome=1" },
    { name: "robots", content: "index, follow" },
    {
      name: "viewport",
      content:
        "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no",
    },
    {
      name: "google-site-verification",
      content: "4UxOeSKrw8W8YzFcrj7uL5G8n88ZFWKa0VHSHiDzyqg",
    },
    {
      name: "naver-site-verification",
      content: "7ba96ea30a0f3e92ddd2c4429331bfb82798e3ce",
    },
  ],
  link: [
    {
      rel: "stylesheet",
      as: "style",
      href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css",
      crossorigin: "anonymous",
    },
    {
      rel: "icon",
      href: "https://user-images.githubusercontent.com/20244536/132115763-2a9011f1-0336-4cb6-9a57-5e44def5c131.png",
    },
  ],
});

useSeoMeta({
  title: "peterkimzz: 기술과 예술을 담은 블로그",
  ogSiteName: "peterkimzz",
  ogImage:
    "https://user-images.githubusercontent.com/20244536/132115770-59711547-4cb3-4a3a-abfe-12740b985441.png",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
