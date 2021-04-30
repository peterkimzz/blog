<template>
  <div>
    <img
      v-if="src"
      :src="src"
      class="inline-block mb-3 w-16 h-16 rounded-[1.6rem] shadow-lg bg-gray-700 bg-opacity-50 p-1.5 object-contain"
    />
    <div v-if="label" class="text-xs md:text-sm text-gray-500">{{ label }}</div>
    <div class="font-semibold mb-3">
      <slot name="title" />
    </div>
    <div class="leading-7 md:leading-8">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ['src', 'label'],
}
</script>