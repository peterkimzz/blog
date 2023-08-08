<script setup lang="ts">
const { date } = defineProps<{ date: string }>();

const dayjs = useDayjs();
</script>

<template>
  <time :datetime="dayjs(date).utc().toString()">
    {{ dayjs(date).format("YYYY년 M월 D일") }}
  </time>
</template>
