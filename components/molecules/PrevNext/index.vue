<template>
  <div class="flex justify-between">
    <n-link
      v-if="prev"
      :to="{ name: 'slug', params: { slug: prev.slug } }"
      class="text-primary font-bold hover:underline"
    >
      {{ prev.title }}
    </n-link>
    <span v-else>&nbsp;</span>
    <n-link
      v-if="next"
      :to="{ name: 'slug', params: { slug: next.slug } }"
      class="font-bold hover:underline"
    >
      {{ next.title }}
    </n-link>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
}
</script>