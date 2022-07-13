<template>
  <div>
    <p class="text-lg font-semibold">최근 글</p>

    <div v-if="next" class="mt-10">
      <div class="text-sm font-semibold text-gray-500">
        <time>{{ $dayjs(next.created).format('YYYY년 MM월 DD일') }}</time>
      </div>

      <h3>
        <NuxtLink
          :to="`/${next.slug}`"
          class="block text-lg font-semibold hover:underline"
          >{{ next.title }}</NuxtLink
        >
      </h3>

      <p class="mt-2 text-gray-500 line-clamp-3">{{ next.description }}</p>
    </div>

    <div v-if="prev" class="mt-6">
      <div class="text-sm font-semibold text-gray-500">
        <time>{{ $dayjs(prev.created).format('YYYY년 MM월 DD일') }}</time>
      </div>

      <h3>
        <NuxtLink
          :to="`/${prev.slug}`"
          class="block text-lg font-semibold hover:underline"
          >{{ prev.title }}</NuxtLink
        >
      </h3>

      <p class="mt-2 text-gray-500 line-clamp-3">{{ prev.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
}
</script>
