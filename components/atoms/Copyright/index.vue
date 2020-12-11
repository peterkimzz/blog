<template>
  <div>© {{ year }} peterkimzz. All right reserved.</div>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getFullYear()
    }
  }
}
</script>