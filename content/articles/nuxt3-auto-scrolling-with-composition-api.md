---
category: tech
title: '[Nuxt 3] Composition API로 자동 스크롤링 기능 구현하기'
updated: 2023-07-24
created: 2023-07-24
thumbnail: https://user-images.githubusercontent.com/20244536/136804762-1e64b59c-e60e-462b-99f8-a39131f4c507.png
published: true
---

이번 포스팅에서는 실시간 채팅 서비스에서 새로운 대화 내용이 추가되었을 때 자동으로 스크롤이 계속해서 아래로 내려가면서, 스크롤을 조작함에 따라 자동 스크롤이 활성화/비활성화되는 기능을 Vue 3에서 새로 추가된 [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api)를 통해 만들어볼겁니다.

<!--more-->

## Composition API

이제는 공개된지 꽤 지나서 대부분 Composition API에 대해 익숙하실겁니다. 그래도 이 코드 작성 방법이 기존 방식에 비해 뭐가 더 좋고, 어떻게 사용하는건지 간단하게 먼저 알아보도록 하겠습니다.

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
    console.log('useCount is mounted.')
  })

  return { count, getDoubleCount, addCount }
}
```

차이점이 보이시나요? Vue 빌트인 기능들을 외부로 빼두고 필요한 곳에서 불러다 쓰니, 호출하는 곳에선 내부 구현에 대해 전혀 알 필요가 없어졌습니다. 확실하게 관심사를 분리할 수 있게 되었습니다.

아 참고로 Vue 파일 `<script>` 태그에 `setup` 키워드가 들어가있어야 위 코드가 동작합니다.

## 자동 스크롤링 기능 만들기

최근 회사에서 실시간 채팅 비슷한 UI/UX가 필요한 서비스를 만들었고, 이 때 Composition API를 활용해 나름 보기 좋은 코드를 작성했습니다. 여러분들도 읽어보시고 작업 중인 프로젝트에 응용해보세요.

먼저 해당 기능을 구현하기 위한 설계를 먼저 해봅시다.

1. 가로가 좁고 세로가 긴 화면으로 만든다.
2. 유튜브/트위치 실시간 채팅창처럼 주기적으로 채팅이 생성된다.
3. 채팅은 화면 상단부터 시작해 화면 하단까지 순서대로 쌓인다.
4. 화면이 꽉 찬 상태에서 채팅이 생성되면 스크롤 바가 생성되며 화면 가장 아래로 이동한다.

간단하게 이렇게 설계하고, 이걸 해당 API 사용부에서는 최소한의 정보만을 넘기면서 해당 기능을 재사용할 수 있는 형태가 나오면 되겠습니다.

## 프로젝트 시작하기

일단 프로젝트를 새로 만들어주세요. Node 16버전 이상 설치되어 있어야 합니다.

```bash[bash]
npx nuxi@latest init auto-scrolling-project
cd auto-scrolling-project
yarn && yarn dev
```

정상적으로 설치가 되었다면 [`http://localhost:3000`](http://localhost:3000) 주소로 로컬 서버가 열리게 됩니다.

마지막으로 `css` 적용을 위해 [`Tailwind CSS`](https://tailwindcss.com/)를 설치해주겠습니다.

```bash [bash]
yarn i -D @nuxtjs/tailwindcss
```

패키지 설치 후 사용을 위해 `nuxt.config.ts` 파일을 수정해주세요.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
})
```

잘 적용이 됐는지 확인을 위해 HTML 코드를 수정해주겠습니다.

```vue [app.vue]
<template>
  <div>
    <div class="text-2xl font-bold">Hi!</div>
  </div>
</template>
```

![](https://github.com/peterkimzz/blog/assets/20244536/fe39f827-7238-463a-9b1c-fe687972d298)

## 화면 구성하기

아까 설계했던 대로, 채팅방 형태의 화면이어야 하기 때문에 화면 좌우가 너무 넓을 필요는 없습니다. 그리고 화면 세로가 꽉 차면 좋겠네요. 아 그리고 채팅이 채워지는 공간과 바깥 배경이 시각적으로 분리되면 좋을 것 같으니 배경색이 구분되어 보이면 되겠습니다.

```vue [app.vue]
<template>
  <div class="h-[100dvh]">
    <div class="mx-auto flex h-full max-w-sm flex-col">
      <header class="flex-1 border-b py-3">
        <h1 class="text-lg font-bold">Chat Room with Auto Scrolling</h1>
      </header>

      <main class="h-full bg-gray-100/50 py-2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
        excepturi facilis suscipit, nihil dolorem porro accusamus sapiente
        veritatis atque nesciunt placeat! Dolore ab aut error rerum beatae
        aliquid nulla obcaecati?
      </main>

      <footer class="flex-1 border-t py-2">
        Nuxt 3 + Composition API + TailwindCSS
      </footer>
    </div>
  </div>
</template>
```

말한대로 화면이 구성되게끔 `app.vue`의 내용을 수정해주었습니다. 이렇게 하면 채팅이 들어가는 영역이 차지할 수 있는 만큼 모든 높이를 차지하게 됩니다.

![](https://github.com/peterkimzz/blog/assets/20244536/fab48203-d2e4-47f8-b2da-0be9afd649db)

## 채팅 데이터를 주기적으로 만들기

다음으로는 `faker` 패키지를 이용해 더미 채팅 데이터를 계속해서 만들어보고, 그 데이터를 화면에 그려보도록 하겠습니다.

먼저 더미 데이터를 만들기 위해 패키지를 설치해주세요.

```bash [bash]
yarn add @faker-js/faker
```

일단은 채팅 데이터 하나를 응답할 함수 하나를 작성합시다.

```vue [app.vue]
<script lang="ts" setup>
import { fakerDE as faker } from '@faker-js/faker'

type Chat = { id: string; name: string; message: string }

function getChat(): Promise<Chat> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          message: faker.lorem.sentence(),
        }),
      500 // 0.5 seconds to respond
    )
  })
}
</script>
```

물론 실제 상황이라면 소켓 연결을 통해 실시간으로 채팅 데이터를 받아오겠지만, 지금은 거기까지 가면 너무 복잡해지니까 지속적으로 이 함수를 호출하는 방식으로 갑시다.

다음은 `setInterval` 함수를 이용해 주기적으로 채팅 데이터를 배열에 넣는 역할을 하는 녀석을 만들어보겠습니다.

```vue [app.vue]
<script lang="ts" setup>
const chats = ref<Chat[]>([])

function pollingChats() {
  const INTERVAL = 2000 // 2 seconds
  setInterval(async () => {
    const chat = await getChat()
    chats.value.push(chat)
  }, INTERVAL)
}

pollingChats()
</script>

<template>
  <div class="h-[100dvh]">
    <div class="mx-auto flex h-full max-w-sm flex-col px-5">
      <header class="flex-1 border-b py-3">
        <h1 class="text-lg font-bold">Chat Room with Auto Scrolling</h1>
      </header>

      <main class="h-full bg-gray-100/50 py-2">
        <ul v-if="chats.length" class="space-y-5">
          <li v-for="chat in chats" :key="chat.id">
            <div>{{ chat.name }}</div>
            <p>{{ chat.message }}</p>
          </li>
        </ul>
      </main>

      <footer class="flex-1 border-t py-2">
        Nuxt 3 + Composition API + TailwindCSS
      </footer>
    </div>
  </div>
</template>
```

이렇게하면 대충 채팅이 쌓이는 것 처럼은 보이게 됐습니다.

![Jul-18-2023 01-54-02](https://github.com/peterkimzz/blog/assets/20244536/c6c4864f-202e-4f87-900d-779b9b71124e)

근데 화면이 꽉 차면 Footer의 위치는 그대로인데, 채팅은 계속 아래로 쌓여서 글자가 겹쳐보이는 현상이 있습니다. 간단하게 CSS를 수정해봅시다.

```vue [app.vue]
<template>
  <div class="h-[100dvh]">
    <div class="mx-auto flex h-full max-w-sm flex-col overflow-hidden px-5">
      <header class="flex-1 border-b py-3">
        <h1 class="text-lg font-bold">Chat Room with Auto Scrolling</h1>
      </header>

      <main class="h-full overflow-y-scroll bg-gray-100/50 py-2">
        <ul v-if="chats.length" class="space-y-5">
          <li v-for="chat in chats" :key="chat.id">
            <div>{{ chat.name }}</div>
            <p>{{ chat.message }}</p>
          </li>
        </ul>
      </main>

      <footer class="flex-1 border-t py-2">
        Nuxt 3 + Composition API + TailwindCSS
      </footer>
    </div>
  </div>
</template>
```

![Jul-18-2023 01-57-06](https://github.com/peterkimzz/blog/assets/20244536/937d1b27-90ff-4e96-a61d-60d09fcc4192)

css의 `overflow` 속성을 이용해 아주 쉽게 Header와 Footer는 고정시키면서 가운데 영역의 콘텐츠가 꽉 찼을 때만 스크롤이 되게끔 동작하게 됐습니다.

## 자동 스크롤 구현하기

다음으로는 채팅이 쌓여 스크롤이 길어질 때 마다 가장 아래로 화면을 스크롤시키면 됩니다. 근데 어떻게 할까요?

채팅이 새로 추가가 됐을때 가운데 영역이 차지하는 영역 높이를 계산 후 스크롤을 아래로 보내면 됩니다. 말로는 약간 복잡한데 코드로 보면 쉽습니다.

채팅을 감싸는 HTML 태그에 접근할 수 있도록 변수에 담고, 아까 만든 `pollingChats` 함수를 약간 수정합시다.

```ts
function pollingChats() {
  const INTERVAL = 2000 // 2 seconds
  setInterval(async () => {
    const chat = await getChat()
    chats.value.push(chat)

    if (chatContainer.value) {
      chatContainer.value.scrollTo(0, chatContainer.value.scrollHeight)
    }
  }, INTERVAL)
}
```

![Jul-18-2023 02-08-17](https://github.com/peterkimzz/blog/assets/20244536/e3abbba8-1cb6-43f5-b695-ea68a84660ee)

채팅이 새로 생겼을 때 자동으로 밑으로 내려가기는 하지만 뭔가 이상합니다. 마지막으로 생성된 채팅으로 이동하는 게 아니라, 그 위에까지만 이동하고 있습니다.

이유는 채팅이 실제로 그려진 이후 영역이 늘어난 다음에 스크롤이 이동해야하기 때문입니다. 현재 코드는 화면이 새로 업데이트가 되기도 전에 스크롤이 이동하기 때문에 마지막 위치로 이동하지 못하는 것이죠.

여기서 꿀팁은 Vue의 `nextTick` 함수를 이용하면 아주 쉽게 구현이 됩니다. 이 녀석의 역할을 간단하게 설명드리면 데이터 변화로 인한 화면 업데이트 이후 콜백이 실행되는 함수입니다. 다시 코드를 조금만 수정해주겠습니다.

```ts
function pollingChats() {
  const INTERVAL = 2000 // 2 seconds
  setInterval(async () => {
    const chat = await getChat()
    chats.value.push(chat)

    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTo(0, chatContainer.value.scrollHeight)
      }
    })
  }, INTERVAL)
}
```

![Jul-18-2023 02-13-04](https://github.com/peterkimzz/blog/assets/20244536/3392318a-beb7-497e-aaf0-5ae981c8eeed)

마지막 채팅이 추가되는 순간에 그 위치로 스크롤이 이동하고 있습니다.

## 역할 분리하기

지금까지 크게 2개의 역할을 수행하는 함수를 만들어습니다. 하나는 채팅 데이터를 관리하는 녀석, 나머지 하나는 스크롤링을 하는 녀석입니다.

이렇게 분리하는 이유는 채팅 데이터를 관리하는 녀석은 다른 페이지에서 그대로 다시 보여줄 가능성이 높고, 스크롤링을 하는 함수는 이 역할만 다른 곳에서 또 재사용해서 사용할 가능성이 높기 때문입니다. 그리고 초반부에 말씀드렸다시피 `app.vue`의 입장에서 굳이 채팅을 가져오는 부분과 스크롤링을 하는 내부 구현을 알 필요가 없기 때문입니다.

Nuxt 3에는 최상위 디렉토리에 `composables` 라는 폴더가 있으면서 그 아래에 파일이 있으면 자동으로 함수를 전역으로 주입해줍니다. 먼저 채팅을 관리하는 녀석부터 분리해봅시다.

프로젝트 최상위 디렉토리에 `composables` 폴더를 만들고 그 안에 `useChat.ts` 파일을 만들어주세요.

```ts [composables/useChat.ts]
import { fakerDE as faker } from '@faker-js/faker'

type Chat = { id: string; name: string; message: string }

export function useChat() {
  const chats = ref<Chat[]>([])

  function getChat(): Promise<Chat> {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            message: faker.lorem.sentence(),
          }),
        500 // 0.5 seconds to respond
      )
    })
  }

  function pollingChats() {
    const INTERVAL = 2000 // 2 seconds
    setInterval(async () => {
      const chat = await getChat()
      chats.value.push(chat)
    }, INTERVAL)
  }

  return { chats, getChat, pollingChats }
}
```

그리고 `app.vue` 파일의 `script` 부분을 수정해주세요.

```vue [app.vue]
<script lang="ts" setup>
const { chats, pollingChats } = useChat()

const chatContainer = ref<HTMLElement>()

pollingChats()
</script>
```

근데 여기서 잠깐, 채팅과 관련된 녀석의 역할을 분리함으로써 오히려 자동 스크롤을 구현하기가 어려워졌습니다. `pollingChats` 함수 마지막 부분에서 `chatContainer.scrollTo`를 호출하고 있었는데 역할 분리에 따라 자동 스크롤과 관련된 코드를 넣기가 어려워졌기 때문입니다.

저는 2가지 해결 방법이 떠오르는데요, `pollingChats()`의 파라미터로 `setInterval` 호출 이후 콜백을 받을 수 있게 하든가, 아니면 Vue의 빌트인 함수인 `watch`를 사용하는 방법이 생각났습니다.

저는 좀 더 Vue스럽게 문제를 해결하기 위해 두 번째 방법을 시도하겠습니다. 일단 자동 스크롤과 관련된 녀석을 분리하기 위해 `useAutoScroll.ts` 파일을 `composables` 폴더 아래에 만들어줍시다.

```ts [composables/useAutoScroll.ts]
export function useAutoScroll(container: Ref<HTMLElement | undefined>) {
  function scrollToBottom() {
    nextTick(() => {
      if (!container.value) {
        return
      }

      container.value.scrollTo(0, container.value.scrollHeight)
    })
  }

  return { scrollToBottom }
}
```

여기서 언급할만한 부분은 이 함수의 인자로 자동 스크롤을 적용하고 싶은 Vue의 반응형 HTML Element를 옵셔널로 받게끔 해주는 겁니다. 옵셔널로 해주는 이유는 `app.vue` 즉 이 함수를 호출하는 곳에서 옵셔널을 신경쓰지 않게끔 해주기 위함입니다. 이건 아래 코드를 보면 더 이해가 빠릅니다. 이제 `app.vue` 파일을 수정해줍시다.

```vue [app.vue]
<script lang="ts" setup>
const { chats, pollingChats } = useChat()

const chatContainer = ref<HTMLElement>()
const { scrollToBottom } = useAutoScroll(chatContainer)

watch(
  () => chats.value.length,
  () => {
    scrollToBottom()
  }
)

pollingChats()
</script>
```

`watch` 함수에 대한 설명으로는, 첫 번째 반환값에 데이터 변화를 감지하고 싶은 녀석을 넣어주면 두 번째 응답 콜백에서는 데이터 변화가 일어났을 때 이 콜백이 실행됩니다.

즉 위 코드는 채팅 데이터를 담고 있는 녀석의 배열 갯수가 달라질때마다 스크롤을 화면 밑으로 내려라가 됩니다.

이렇게 하면 역할을 분리하기 전과 동일하게 작동하고, 관심사가 분리되어 훨씬 더 보기 좋은 코드가됐습니다.

## UX 개선하기

블로그를 마무리하기 전에 조금 신경쓰이는 부분이 있습니다.

보통 우리가 지금까지 만든 실시간 채팅 형태의 UX에선 지나간 채팅을 보기 위해 스크롤을 올리면 자동 스크롤이 멈춥니다. 그리고 다시 스크롤을 가장 아래로 내리면 알아서 다시 자동 스크롤이 시작됩니다.

마지막으로 이걸 개선해봅시다.

일단 채팅과는 관련이 없기 때문에 이건 `useAutoScroll.ts` 파일로 가서 수정합시다.

```ts [composables/useAutoScroll.ts]
export function useAutoScroll(container: Ref<HTMLElement | undefined>) {
  const isAutoScrolling = ref<boolean>(true)

  watch(
    () => container.value,
    () => {
      if (container.value) {
        container.value.addEventListener('scroll', () => {
          const scrollTop = container.value!.scrollTop
          const scrollHeight = container.value!.scrollHeight
          const clientHeight = container.value!.clientHeight

          const reachBottom = scrollTop + clientHeight >= scrollHeight

          if (reachBottom) {
            isAutoScrolling.value = true
          } else {
            isAutoScrolling.value = false
          }
        })
      }
    }
  )

  function scrollToBottom() {
    nextTick(() => {
      if (!container.value || !isAutoScrolling.value) {
        return
      }

      container.value.scrollTo(0, container.value.scrollHeight)
    })
  }

  return { scrollToBottom }
}
```

코드는 간단합니다.

이 `useAutoScroll` 내부에 아까처럼 `watch` 를 이용해 `container` 변화를 감지해서 실제로 `container` 가 생겼을 때 `addEventListener` 를 붙여주고, 스크롤할 때 마다 높이를 감지해서 바닥에 스크롤이 닿았으면 `boolean` 값을 `true`으로 만들고, 아니면 `false` 로 만들어주면 됩니다.

![Jul-24-2023 21-00-15](https://github.com/peterkimzz/blog/assets/20244536/5141b946-3ac3-419d-a2d7-24d9d6cf14a1)

잘 되네요!

## 마무리

Vue 3 Composition API 에서 새로 추가된 몇 가지 기능들과 Nuxt 3에서 새로 추가된 `composables` 을 활용해 간단한 예제와 함께 알아보았습니다. Composition API를 사용하면 훨씬 더 가독성 좋은 코드를 작성할 수 있고, 장기적으로 유지보수하기에 좋아지기 때문에 익숙하게 사용하신다면 매우 도움이 될 것 같습니다.

Nuxt 3에 대해 조금 더 자세히 알고 싶으시다면 [[Nuxt 3] 사이드 프로젝트 만들기 - 개발 환경 설정편](/nuxt3-sideproject-2)를 읽어주세요.
