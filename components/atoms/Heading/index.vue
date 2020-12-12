<template>
  <component :is="as" class="font-bold">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    as: {
      type: String,
      default: 'h1'
    }
  }
}
</script>

<style lang="postcss" scoped>
h1 {
  @apply text-xl md:text-2xl;
}

h2 {
  @apply text-lg md:text-xl;
}
h3 {
  @apply text-base md:text-lg;
}
h4 {
  @apply text-sm md:text-base;
}
</style>