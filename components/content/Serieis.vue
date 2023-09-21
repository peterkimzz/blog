<script setup lang="ts">
const props = defineProps<{
  type: "in-n-minutes" | "forever";
}>();

const metadata = computed(() => {
  switch (props.type) {
    case "in-n-minutes":
      return {
        title: "다른 N분만에 시리즈",
        conditions: "분만에",
      };
    case "forever":
    default:
      return {
        title: "다른 평생 무료 시리즈",
        conditions: "평생",
      };
  }
});

const route = useRoute();
const { data: articles } = await useAsyncData(() =>
  queryContent()
    .where({
      $and: [
        { title: { $contains: [metadata.value.conditions] } },
        { _path: { $ne: route.path } },
      ],
    })
    .only(["title", "_path"])
    .find()
);
</script>

<template>
  <div class="border bg-gray-100/60 p-4 rounded-lg mb-8">
    <p class="!text-gray-900 !font-semibold !m-0">{{ metadata.title }}</p>

    <ul class="!m-0">
      <li v-for="article in articles" :key="'series-' + article._path">
        <NuxtLink :to="article._path">{{ article.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
