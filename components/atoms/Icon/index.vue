<template>
  <component :is="Icon" class="icon fill-current" @click="Click" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    }
  },
  computed: {
    Icon() {
      try {
        return () => import(`./${this.icon}.vue`)
      } catch (err) {
        return ''
      }
    }
  },
  methods: {
    Click() {
      console.log('')
      this.$emit('click')
    }
  }
}
</script>

<style lang="postcss" scoped>
.icon {
  @apply inline-block;
  @apply w-4;
}
</style>