<template>
  <li>
    <n-link
      :to="{ name: 'slug', params: { slug } }"
      class="flex flex-col h-full relative"
    >
      <div class="aspect-w-3 aspect-h-2 shadow-sm rounded-lg overflow-hidden">
        <img :src="thumbnail" :alt="title" class="object-cover" />
      </div>
      <vue-tag :class="['absolute top-2 right-2', TagColor]">{{
        category
      }}</vue-tag>
      <div class="flex-1 mt-2">
        <vue-heading as="h4" class="font-bold leading-snug">{{
          title
        }}</vue-heading>
        <p v-if="description" class="mt-1.5 text-xs text-gray-500 truncate">
          {{ description }}
        </p>
      </div>
      <div class="mt-1">
        <vue-date class="text-xs text-gray-600">{{ updated }}</vue-date>
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
      required: true
    },
    thumbnail: {
      type: String,
      default: '/',
      required: true
    },
    category: {
      type: String,
      default: null,
      validator(v) {
        return ['tech', 'design', 'life'].indexOf(v) !== -1
      }
    },
    title: {
      type: String,
      default: 'Title',
      required: true
    },
    description: {
      type: String,
      default: null
    },
    updated: {
      type: String,
      default: null
    }
  },
  computed: {
    TagColor() {
      switch (this.category) {
        case 'tech':
          return ''
        case 'design':
          return 'bg-red-500 text-red-50'
        case 'life':
          return 'bg-blue-500 text-blue-50'
      }
    }
  }
}
</script>