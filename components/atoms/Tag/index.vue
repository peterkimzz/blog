<template>
  <span class="tag"><slot /></span>
</template>

<style lang="postcss" scoped>
.tag {
  @apply uppercase;
  @apply font-medium;
  @apply rounded-sm;
  @apply shadow-sm;

  @apply py-1 px-2;
  @apply text-xs;

  @apply bg-gray-600;
  @apply text-gray-50;
}
</style>