<template>
  <div class="flex justify-between">
    <div v-if="prev">
      <n-link
        :to="{ name: 'slug', params: { slug: prev.slug } }"
        class="text-primary font-bold hover:underline"
      >
        {{ prev.title }}
      </n-link>
      <span>&nbsp;</span>
    </div>
    <div v-else>
      <n-link
        v-if="next"
        :to="{ name: 'slug', params: { slug: next.slug } }"
        class="font-bold hover:underline"
      >
        {{ next.title }}
      </n-link>
      <span v-else>&nbsp;</span>
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