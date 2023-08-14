<script setup>
useHead({
  script: [
    {
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=G-E7PSWP6P7T",
    },
  ],
});

if (process.env.NODE_ENV === "production") {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "G-E7PSWP6P7T");
}
</script>

<template>
  <span v-if="false"></span>
</template>
