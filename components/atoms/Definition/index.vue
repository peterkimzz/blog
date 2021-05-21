<template>
  <dl class="flex">
    <dt class="flex flex-col uppercase font-semibold w-28">
      <span class="text-xs text-gray-500">{{ subLabel }}</span>
      <span class="text-gray-300">{{ label }}</span>
    </dt>
    <dd class="flex-1"><slot /></dd>
  </dl>
</template>

<script>
export default {
  props: ['subLabel', 'label'],
}
</script>