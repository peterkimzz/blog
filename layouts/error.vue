<template>
  <div class="pt-10 pb-20">
    <h1 class="font-black text-white text-4xl transform -rotate-2">
      Sorry, not found.
    </h1>
    <img src="/undraw_dreamer.svg" class="block mt-10" />
  </div>
</template>

<script>
export default {
  layout: 'article',
  props: ['error'],
}
</script>