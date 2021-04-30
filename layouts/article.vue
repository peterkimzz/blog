<template>
  <div id="article__layout">
    <vue-container class="max-w-screen-md">
      <vue-navigation-bar />
    </vue-container>

    <vue-container class="max-w-screen-md">
      <nuxt-child />
    </vue-container>

    <div class="bg-gray-900">
      <vue-container class="max-w-screen-md">
        <vue-footer-bar />
      </vue-container>
    </div>
  </div>
</template>