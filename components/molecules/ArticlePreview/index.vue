<template>
  <li>
    <n-link :to="`/${slug}`" class="group">
      <span
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase"
        :class="GetCategoryColor"
      >
        {{ category }}
      </span>
      <h2
        class="text-base md:text-lg mt-2 font-semibold text-gray-100 group-hover:underline"
      >
        {{ title }}
      </h2>
      <p class="mt-4 text-gray-400 leading-7 line-clamp-3">{{ description }}</p>
      <div class="text-sm mt-2">
        {{ $dayjs(updated).format('YYYY년 MM월 DD일') }}
      </div>
    </n-link>
  </li>
</template>

<script>
export default {
  props: {
    slug: {
      type: String,
      default: '/',
      required: true,
    },
    category: {
      type: String,
      default: null,
      validator(v) {
        return ['tech', 'design', 'life'].indexOf(v) !== -1
      },
    },
    title: {
      type: String,
      default: 'Title',
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    updated: {
      type: String,
      default: null,
    },
  },
  computed: {
    GetCategoryColor() {
      switch (this.category) {
        case 'tech':
          return 'bg-purple-800 text-purple-200'
        case 'design':
          return 'bg-pink-800 text-pink-200'
        case 'life':
          return 'bg-indigo-800 text-indigo-200'
      }
    },
  },
}
</script>