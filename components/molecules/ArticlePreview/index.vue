<template>
  <li>
    <n-link :to="`/${slug}/`" class="group">
      <span
        class="
          inline-flex
          items-center
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold
          uppercase
        "
        :class="GetCategoryColor"
      >
        {{ category }}
      </span>

      <h2
        class="
          text-base
          md:text-lg
          mt-2
          font-semibold
          text-gray-100
          group-hover:underline
        "
      >
        {{ title }}
      </h2>
      <p
        class="
          text-sm
          md:text-base
          mt-3
          md:mt-4
          text-gray-400
          leading-7
          line-clamp-3
        "
      >
        {{ description }}
      </p>
      <div class="text-sm mt-2">
        <span>
          {{ $dayjs(updated).format('YYYY년 MM월 DD일') }}
        </span>
        <svg
          v-if="!published"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-gray-500 inline-block align-middle"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clip-rule="evenodd"
          />
        </svg>
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
    published: {
      type: Boolean,
      default: false,
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
          return 'bg-blue-800 text-blue-200'
        case 'review':
          return 'bg-cyan-800 text-cyan-200'
        default:
          return 'bg-gray-700 text-gray-200'
      }
    },
  },
}
</script>