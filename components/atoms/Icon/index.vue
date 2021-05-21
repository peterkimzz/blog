<template>
  <component :is="Icon" class="inline-block w-4 fill-current" @click="Click" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
  },
  computed: {
    Icon() {
      try {
        return () => import(`./${this.icon}.vue`)
      } catch (err) {
        return ''
      }
    },
  },
  methods: {
    Click() {
      console.log('')
      this.$emit('click')
    },
  },
}
</script>