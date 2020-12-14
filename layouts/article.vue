<template>
  <div id="article__layout">
    <vue-container class="max-w-screen-sm">
      <vue-navigation-bar />
    </vue-container>

    <vue-container class="max-w-screen-sm">
      <nuxt-child />
    </vue-container>

    <div class="bg-gray-50 border-t border-gray-100">
      <vue-container class="max-w-screen-sm">
        <vue-footer-bar />
      </vue-container>
    </div>
  </div>
</template>