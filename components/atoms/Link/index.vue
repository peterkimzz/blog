<template>
  <component
    :is="tag"
    :href="href"
    :to="href"
    :title="title"
    :target="target"
    :class="['inline-block hover:underline', { block }]"
    rel="noopener"
    ><slot
  /></component>
</template>

<script>
export default {
  props: {
    as: {
      type: String,
      default: null
    },
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
    },
    title: {
      type: String,
      default: null
    }
  },
  computed: {
    tag() {
      if (this.as) {
        return this.as
      }

      if (this.target === '_blank') {
        return 'a'
      }

      return 'n-link'
    }
  }
}
</script>