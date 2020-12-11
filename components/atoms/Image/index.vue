<template>
  <div class="img-container">
    <div class="img-wrapper">
      <span class="img">
        <img :src="src" :alt="alt" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: null,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="postcss" scoped>
.img-container {
  @apply block;
  @apply relative;
  @apply w-full;
  @apply rounded-md overflow-hidden;
  @apply shadow-md;
}
.img-wrapper {
  @apply relative;
  @apply overflow-hidden;
  padding-top: 75%;
}
.img {
  @apply block;
  @apply absolute;
  @apply inset-0;
  @apply w-auto h-auto;
}

img {
  @apply w-full h-full;
  @apply object-cover;
}
</style>