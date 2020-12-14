

<template>
  <div id="default__layout">
    <vue-container>
      <vue-navigation-bar />
    </vue-container>

    <nuxt-child />

    <div class="bg-gray-50 border-t border-gray-100">
      <vue-container>
        <vue-footer-bar />
      </vue-container>
    </div>
  </div>
</template>