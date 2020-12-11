<template>
  <div>{{ date }}</div>
</template>

<script>
export default {
  computed: {
    date() {
      const text = this.$slots.default ? this.$slots.default[0].text : ''

      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(text).toLocaleDateString('ko', options)
    }
  }
}
</script>