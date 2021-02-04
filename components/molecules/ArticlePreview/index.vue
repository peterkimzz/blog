<template>
  <li>
    <n-link
      :to="{ name: 'slug', params: { slug } }"
      class="flex flex-col h-full relative"
    >
      <vue-image
        :src="thumbnail"
        :alt="title"
        class="post-preview--thumbnail"
      />
      <vue-tag :class="['absolute top-2 right-2', TagColor]">{{
        category
      }}</vue-tag>
      <div class="flex-1">
        <vue-heading as="h4" class="post-preview--title">{{
          title
        }}</vue-heading>
        <p v-if="description" class="post-preview--desc">{{ description }}</p>
      </div>
      <div class="mt-1">
        <vue-date class="post-preview--date">{{ updated }}</vue-date>
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

<style lang="postcss" scoped>
.post-preview--thumbnail {
  @apply mb-1.5;
}
.post-preview--title {
  @apply font-bold;
  @apply leading-snug !important;
}
.post-preview--desc {
  @apply mt-1.5;
  @apply text-xs;

  @apply text-gray-500;
  @apply truncate;
}
.post-preview--date {
  @apply text-xs;
  @apply text-gray-600;
}
</style>