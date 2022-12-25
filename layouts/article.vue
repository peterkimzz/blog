<template>
  <div id="article__layout">
    <vue-container class="max-w-prose">
      <vue-navigation-bar />
    </vue-container>

    <vue-container class="max-w-prose">
      <Nuxt />
    </vue-container>

    <div class="bg-gray-900">
      <vue-container class="max-w-prose">
        <vue-footer-bar />
      </vue-container>
    </div>
  </div>
</template>
