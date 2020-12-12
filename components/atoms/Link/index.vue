<template>
  <component
    :is="tag"
    :href="href"
    :to="href"
    :target="target"
    :class="['link', { block }]"
    ><slot
  /></component>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: '',
      required: true
    },
    target: {
      type: String,
      default: '_self'
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tag() {
      if (this.target === '_blank') {
        return 'a'
      }
      return 'n-link'
    }
  }
}
</script>

<style lang="postcss" scoped>
.link {
  @apply inline-block;
  @apply hover:underline;
}
</style>