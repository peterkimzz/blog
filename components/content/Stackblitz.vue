<script setup lang="ts">
const props = defineProps<{
  src: string;
}>();
</script>

<template>
  <iframe :src="props.src" frameborder="0" class="w-full aspect-[4/3]"></iframe>
</template>
