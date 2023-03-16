---
category: tech
title: '[Nuxt 3] 채팅 서비스 자동 스크롤링 기능 구현하기'
updated: 2023-03-15
created: 2023-03-15
thumbnail: https://user-images.githubusercontent.com/20244536/136804762-1e64b59c-e60e-462b-99f8-a39131f4c507.png
published: false
---

이번 포스팅에서는 채팅 서비스에서 새로운 대화 내용이 추가되었을 때 자동으로 스크롤이 계속해서 아래로 내려가면서, 스크롤을 조작함에 따라 자동 스크롤이 활성화/비활성화되는 기능을 Vue의 [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api)를 통해 만들어볼겁니다.

<!--more-->

## Composition API

Vue 3가 공개된지 꽤 오래되서 이제는 대부분 Composition API에 대해 익숙하시겠지만, 이게 기존 코드 작성 방식에 비해 뭐가 더 좋고 어떻게 사용하는건지 간단하게 먼저 짚어보도록 하겠습니다.

```vue [Options API]
<template>
  <div>count: {{ count }}</div>
  <div>double count: {{ getDoubleCount }}</div>
  <button @click="addCount">Add count</button>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
    }
  },
  computed: {
    getDoubleCount() {
      return this.count * 2
    },
  },
  methods: {
    addCount() {
      this.count++
    },
  },
  mounted() {
    console.log('mounted')
  },
}
</script>
```

먼저 Vue 2의 Options API입니다. 이 방식은 Vue의 빌트인 기능들을 사용할 때 `count` 같은 반응형 데이터와 `computed`,`mounted` 같은 라이프사이클 함수들을 호출하는 `.vue` 파일 안에 위치시켜야 했습니다. 그리고 특히 이 요소들을 밖으로 빼내서 재사용하기가 어려웠습니다.

그리고 지금은 코드가 짧아서 보기에 문제가 없어보이지만, 코드가 많아졌을 때 원하는 코드를 찾기가 매우 힘들었습니다.

자 그럼 이제 Composition API를 활용해 재사용성을 높인 코드를 봅시다.

```vue [Composition API]
<template>
  <div>count: {{ count }}</div>
  <div>double count: {{ getDoubleCount }}</div>
  <button @click="addCount">Add count</button>
</template>

<script setup>
import { useCount } from './useCount'

const { count, getDoubleCount, addCount } = useCount()
</script>
```

```ts [useCount.ts]
import { ref, computed, onMounted } from 'vue'

export function useCount() {
  const count = ref(1)
  const getDoubleCount = computed(() => count.value)

  function addCount() {
    count.value++
  }

  onMounted(() => {
    console.log('mounted')
  })

  return { count, getDoubleCount, addCount }
}
```

차이점이 보이시나요? Vue 빌트인 기능들을 외부로 빼두고, 필요한 곳에서 불러다 쓰니 쓰는 곳
