<template>
  <div>
    <img
      v-if="src"
      :src="src"
      class="inline-block mb-3 w-16 h-16 rounded-3xl bg-gray-700 p-1.5 shadow-sm"
    />
    <div v-if="label" class="text-sm text-gray-500">{{ label }}</div>
    <div class="font-semibold mb-3">
      <slot name="title" />
    </div>
    <div class="leading-7">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ['src', 'label']
}
</script>