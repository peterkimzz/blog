

<template>
  <div id="default__layout">
    <vue-container>
      <vue-navigation-bar />
    </vue-container>

    <div class="min-h-screen">
      <nuxt-child />
    </div>

    <div class="bg-gray-900">
      <vue-container>
        <vue-footer-bar />
      </vue-container>
    </div>
  </div>
</template>