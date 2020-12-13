<template>
  <div :class="['img-container', { round }]">
    <div class="img-wrapper" :style="{ paddingTop }">
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
    },
    paddingTop: {
      type: String,
      default: '75%'
    },
    round: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.img-container {
  @apply block;
  @apply relative;
  @apply w-full;
  @apply shadow-sm;
}
.img-container.round {
  @apply rounded-md overflow-hidden;
}

.img-wrapper {
  @apply relative;
  @apply overflow-hidden;
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