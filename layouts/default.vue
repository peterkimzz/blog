

<template>
  <div id="default__layout">
    <vue-container>
      <vue-navigation-bar />
    </vue-container>

    <nuxt-child />

    <div class="text-gray-500 bg-gray-50">
      <vue-container>
        <vue-footer-bar />
      </vue-container>
    </div>
  </div>
</template>