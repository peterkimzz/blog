<template>
  <div class="flex justify-between text-xs md:text-sm font-medium">
    <div v-if="prev" class="flex-1 mr-0.5">
      <div class="label">
        <span class="align-middle">이전 글</span>
      </div>
      <vue-link as="a" :href="`/${prev.slug}`" class="link">
        {{ prev.title }}
      </vue-link>
    </div>
    <div v-if="next" class="flex-1 ml-0.5 text-right">
      <div class="label">
        <span class="align-middle">다음 글</span>
      </div>
      <vue-link
        as="a"
        :href="`/${next.slug}`"
        class="link"
        style="word-break: keep-all"
      >
        {{ next.title }}
      </vue-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null
    },
    next: {
      type: Object,
      default: () => null
    }
  }
}
</script>

<style lang="postcss" scoped>
.link {
  @apply leading-snug;
  @apply hover:underline;
}

.label {
  @apply font-semibold;
  @apply text-gray-400;
  @apply mb-0.5;
}
</style>