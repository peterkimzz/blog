<template>
  <div id="default__layout">
    <vue-navigation-bar />

    <vue-container>
      <div class="py-10">
        <nuxt-child />
      </div>
    </vue-container>

    <vue-footer-bar />
  </div>
</template>