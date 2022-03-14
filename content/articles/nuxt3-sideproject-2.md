---
category: tech
title: '[Nuxt 3] 사이드 프로젝트 만들기 - 개발 환경 설정편'
updated: 2022-03-12
created: 2022-03-12
thumbnail: https://user-images.githubusercontent.com/20244536/158020130-9fbf9873-9bdf-43ca-81a8-45cbe5ac900b.png
published: true
---

저번 [사이드 프로젝트 만들기 - 기획편](/nuxt3-sideproject-1/)의 다음 편입니다. 이번엔 `nuxt3`의 주요 변경사항 일부를 알아보고, 쾌적한 개발 환경을 위해 몇 가지 세팅을 해보도록 하겠습니다.

일단 새로운 `Nuxt3` 프로젝트를 생성합시다. 터미널을 열고 아래 명령어를 입력합시다.

저는 웹 애플리케이션이면 프로젝트 이름을 보통 도메인 이름과 매칭해서 만듭니다. `www` 도메인은 이미 사용 중이니, `app.drawbeat.com` 이라는 이름으로 만들겠습니다. 여러분들은 아무거나 하셔도 됩니다.

```bash [bash]
npx nuxi init app.drawbeat.com
cd app.drawbeat.com
yarn && yarn dev -o
```

![image](https://user-images.githubusercontent.com/20244536/153166157-fa49c657-fcc2-43da-bec4-9145a3fb1f92.png)

이렇게 하면 개발 서버가 열리게 되고, `nuxt3`의 첫 화면이 보이게 됩니다.

<!--more-->

![image](https://user-images.githubusercontent.com/20244536/153166558-00d0a21a-9d5d-4382-8730-ede6adfb369a.png)

폴더 구조를 살펴볼까요? `nuxt2` 와는 다르게 파일이 몇 개 없습니다. 그리고 페이지 렌더링을 위해 필수였던 `pages/` 폴더가 사라졌고, `app.vue` 파일만 있습니다.

`nuxt3`의 주요 변경점 중 하나는 `pages/` 폴더가 **옵션**이라는 점입니다.

왜 옵션으로 바뀌었을까요? 프로젝트에 따라 페이지 라우팅이 필요 없는 경우, `pages/` 폴더를 만들지 않으면 `vue-router` 패키지를 결과물에 포함시키지 않게되서 용량을 줄일 수 있기 때문입니다. 이제 랜딩 페이지만 필요한 경우엔 굳이 `pages/` 폴더를 만들지 않아도 되겠네요.

그리고 `tsconfig.json` 파일이 있는걸로 봐선 `typescript`가 이제 기본 언어입니다. 이 기회에 타입스크립트를 사용하지 않으셨던 분들이라면 꼭 도입해보세요. 개발할 때 도움이 많이 됩니다.

근데 저희는 페이지를 여러개 만들거라 라우팅이 꼭 필요합니다. `pages/index.vue` 파일을 만들어주고, `app.vue` 파일을 수정해줍시다.

```vue [app.vue]
<template>
  <div class="text-lg">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```

```vue [pages/index.vue]
<template>
  <div>index</div>
</template>
```

![image](https://user-images.githubusercontent.com/20244536/153169723-be2cc4b6-a1c4-4bb6-aac9-7f381e53fd1a.png)

웰컴 페이지가 사라지고, `pages/index.vue` 파일을 잘 읽고 있네요.

`<NuxtPage>` 태그는 `pages/` 폴더를 가져와서 렌더링한다는 뜻이겠고, `<NuxtLayout>`은 나중에 `layouts/` 폴더를 만들면 그 때 자세히 설명하겠습니다.

여기서 또 하나 추가 변경사항이 있다면 `app.vue`가 모든 페이지의 진입점이 되는 **컴포넌트** 역할을 하기 때문에 전역적으로 `js` 파일이나 `css` 파일을 적용하고 싶다면 `app.vue` 에 적용해도 됩니다.

기존에는 전역으로 적용되는 코드를 넣기 위해 `nuxt.config` 파일에 객체 형식으로 CDN 링크 등을 넣어주거나 `plugin` 을 사용하기도 했었는데, 이 부분은 `.vue` 파일을 이용해 컴포넌트를 활용한다는 점에서 기존보다 조금 더 일관적으로 프로젝트를 관리할 수 있어서 좋아진 것 같습니다.

그러면 라우팅이 잘 되는지 확인을 위해 로그인 페이지도 만들어보고, 라우팅을 위한 `a` 태그도 만들어보겠습니다.

```diff-vue [pages/login/index.vue]
   <template>
     <div>
       <nav>
+        <NuxtLink to="/">Go to index</NuxtLink>
       </nav>

       <div>login</div>
     </div>
   </template>
```

```diff-vue [pages/index.vue]
   <template>
     <div>
       <nav>
+        <NuxtLink to="/login">Go to login</NuxtLink>
       </nav>

       <div>index</div>
     </div>
   </template>
```

![image](https://user-images.githubusercontent.com/20244536/153176122-6f3d47f8-0246-44a8-bec8-4b9c06473d0f.png)
![image](https://user-images.githubusercontent.com/20244536/153176179-649f294d-c033-4221-96c7-af35ca38cf69.png)

링크를 눌러보면 페이지 이동도 잘 되고, `/login` URL에서 새로고침을 하더라도 페이지가 잘 렌더링됩니다.

`<NuxtLink>`는 `nuxt` 에서 기본으로 내장되어있는 페이지 라우팅용 컴포넌트입니다. 웹사이트 **내부** 페이지 이동을 위해 `<a>` 태그 대신 사용하시면 됩니다.

참고로 페이지 내부 이동을 `<a>` 태그 대신 `<NuxtLink>` 컴포넌트를 사용하는 이유는 라우팅이 훨씬 빠르기 때문입니다. 페이지 전체를 다시 불러오지 않고, 바뀐 부분만 렌더링하기 때문입니다.

그럼 동적 페이지를 만드려면 어떻게 하면 될까요? 여기서도 `nuxt3`의 변경사항이 있습니다.

`/blog/1`, `/blog/2` ... 같이 동적 URL 파라미터 값을 사용하려면 기존에는 폴더명 맨 앞에 `_` 기호를 이용했었습니다. 예를 들어 이렇게요.

```bash [nuxt2]
proejct/
└── pages/
    └── _blogId/
        └── index.vue
```

하지만 `nuxt3`에서는 이렇게 사용합니다.

```[nuxt3]
proejct/
└── pages/
    └── [blogId]/
        └── index.vue
```

`nuxt3` 에서만 사용가능한 방법도 새로 추가됐는데요, `[blogId]` 말고 `blog-[id]` 이런식으로 파라미터의 일부 텍스트만 동적으로 받을 수도 있습니다.

동적 `path` 파라미터 값을 가져올 땐 기존과 똑같습니다.

```vue [vue]
<template>
  <!-- [blogId] 인 경우 -->
  {{ $route.params.blogId }}

  <!-- blog-[id] 인 경우 -->
  {{ $route.params.id }}
</template>
```

쉽죠? `nuxt3`쪽이 훨씬 더 가독성이 좋습니다. 아 참고로 이제는 `<template>`쪽에서 `$route`를 사용하는 건 자제하는게 좋습니다. 이유는 나중에 `Vue3`에서 새롭게 추가된 `Composition API`를 사용할 때 알려드릴게요.

## Navigation Bar

![image](https://user-images.githubusercontent.com/20244536/153179255-d77b4acf-c7f4-4b75-b28d-7a3bd5172710.png)
![image](https://user-images.githubusercontent.com/20244536/153179042-5a5603a5-0b1f-4731-b674-3b1282a0085e.png)
![image](https://user-images.githubusercontent.com/20244536/153179146-3d657f72-a0a8-4343-9f8a-c034b1ddf718.png)

거의 대부분 웹사이트가 가장 상단에 주요 페이지들로 이동할 수 있는 링크들을 배치하고 있습니다. 국룰인 것 같으니 따라하면 됩니다.

크게 나누면 왼쪽엔 서비스 로고, 오른쪽엔 링크를 배치하네요. 보통 이 네비게이션 바는 모든 페이지에서 동일하게 보여지니까 컴포넌트로 만들면 좋겠다는 생각이 듭니다.

`nuxt`는 `components/` 폴더 아래에 존재하는 모든 폴더, 파일을 자동으로 `import`합니다. 사실 이게 좋은건지는 의문이긴 한데, 실제로 사용해보면 편하기는 합니다. 왜 좋은지 의문이라고 하냐면 이런식으로 프레임워크가 다른 코드를 불러오는 과정을 자동으로 처리해버리면 나중에 프레임워크 이해도가 없는 사람이 코드를 봤을 때 왜 `import` 없이 렌더링되지? 이런식으로 직관적으로 이해가 안갈 수 있기 때문입니다. 이거 하나는 괜찮을 수 있지만 다른 부분을 계속해서 프레임워크가 자동으로 처리해주는 부분이 많아지면 프로젝트 유지보수가 힘들어지기 때문입니다.

`components/` 폴더를 만들고, `NavigationBar` 라는 이름의 폴더도 만들어주겠습니다.

```vue [components/NavigationBar/index.vue]
<template>
  <nav>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/login">Login</NuxtLink>
  </nav>
</template>
```

그리고 랜딩 페이지랑 로그인 페이지에서 방금 만든 네비게이션 바 컴포넌트를 불러주세요.

```diff-vue [pages/index.vue]
   <template>
     <div>
+      <NavigationBar />

       <div>index</div>
     </div>
   </template>
```

```diff-vue [pages/login/index.vue]
   <template>
     <div>
+     <NavigationBar />

       <div>login</div>
     </div>
   </template>
```

![image](https://user-images.githubusercontent.com/20244536/153180466-d80909a3-8e56-43f0-8e04-8f6f6d6e7e14.png)
![image](https://user-images.githubusercontent.com/20244536/153180615-4ce58c75-2be2-44ea-bb0b-2aa38266991c.png)

`NavigationBar`가 잘 렌더링 됐습니다.

근데 한 가지 문제가 있습니다. 지금대로라면 새로운 페이지가 늘어날 때 마다 `<NavigationBar/>` 를 계속해서 페이지 상단에 불러야합니다. 어떻게 하면 코드 중복을 피할 수 있을까요?

이건 `nuxt`의 `layouts` 폴더를 활용하면 쉽게 해결 가능합니다. `layouts/` 폴더를 만들고, `default.vue` 파일을 만들어주세요.

```vue [layouts/default.vue]
<template>
  <div>
    <NavigationBar />

    <slot />
  </div>
</template>
```

![image](https://user-images.githubusercontent.com/20244536/153181266-477c8008-9195-4356-a74c-7ecefa2c073d.png)

이렇게 `layouts` 폴더를 만드는 것만으로도 `default` 레이아웃이 전역으로 적용됩니다. 사실 이건 `app.vue` 에서 `<NuxtLayout>` 태그를 이미 감싸줘서 그렇습니다.

`<slot>` 태그는 일단 `<NuxtPage>` 태그랑 역할이 비슷하다고 생각하시면 됩니다.

`layouts/` 폴더에서 네비게이션 바를 불러오고 있으니 이제 `pages/` 폴더 밑에 있는 파일에선 `<NavigationBar/>` 를 지워주세요.

```diff-vue [pages/index.vue]
  <template>
    <div>
-     <NavigationBar />

      <div>index</div>
    </div>
  </template>
```

```diff-vue [pages/login/index.vue]
  <template>
    <div>
-     <NavigationBar />

      <div>login</div>
    </div>
  </template>
```

## Tailwind CSS

본격적으로 `css` 를 사용하기 전에 스타일링을 더 편하고 이쁘게 만들어 줄 패키지인 `tailwindcss`를 먼저 설치하도록 하겠습니다.

```bash [bash]
yarn add -D tailwindcss postcss@latest autoprefixer@latest @nuxt/postcss8
npx tailwindcss init
```

이러면 `tailwind.config.js` 파일이 생기게 됩니다. 그 다음 `tailwindcss` 를 사용하기위해 `assets/` 폴더 아래 `css/` 폴더 아래 `tailwind.css` 파일까지 만들어주세요.

```css [assets/css/tailwind.css]
@tailwind base;
@tailwind components;
@tailwind utilities;
```

다음은 `nuxt.config.ts` 파일을 수정해줄게요.

```ts [nuxt.config.ts]
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
})
```

그리고 마지막으로 `tailwind.config.js` 파일을 수정해주면 끝입니다.

```js [tailwind.config.js]
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

잘 적용됐는지 확인하기위해 `pages/index.vue` 를 조금 수정합시다.

```vue [pages/index.vue]
<template>
  <div>
    <!-- font-weight: bold; font-size: 1.875rem; -->
    <h1 class="**font-bold text-3xl**">Home</h1>
  </div>
</template>
```

![image](https://user-images.githubusercontent.com/20244536/153184535-3619e9ea-4a9b-47a8-b788-225e5bed46ce.png)

`tailwindcss` 가 잘 적용됐네요! `tailwindcss` 는 이런식으로 미리 만들어진 클래스를 이용해 `css` 작성없이 스타일링을 적용하는 라이브러리입니다.

그럼 네비게이션 바를 스타일링 하겠습니다.

```vue [components/NavigationBar/index.vue]
<template>
  <nav>
    <div class="flex justify-between">
      <NuxtLink to="/">
        <img
          src="https://pbsmtipexzqvbentyzuw.supabase.co/storage/v1/object/public/drawbeat.com/public/logo1.svg"
          alt="app.drawbeat.com"
          class="**w-[180px]**"
        />
      </NuxtLink>

      <ul>
        <li>
          <NuxtLink to="/login">Login</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
```

![image](https://user-images.githubusercontent.com/20244536/153410898-ededa981-3600-4225-b56d-58fb4353cb02.png)

참고로 `tailwind` 에서 인라인 커스텀 스타일링을 사용하고 싶으면 `w-[180px]` 처럼 대괄호로 감싸서 사용할 수도 있습니다.

로고를 누르면 홈으로 가도록 `<NuxtLink>` 태그로 감싸주었고, 로그인 페이지로 가는 메뉴는 오른쪽에 붙여서 배치했습니다. 아까 참고한거랑 구조는 비슷해졌죠?

## 통신

다음으로 설정해볼 건 HTTP Request 입니다. 보통 다른 서버에 데이터나 작업을 요청하기 위해 사용합니다. 보통은 [`axios`](https://github.com/axios/axios)를 사용하는데, `nuxt3`는 내장된 [`useFetch()`](https://v3.nuxtjs.org/docs/usage/data-fetching#usefetch) 함수가 있습니다.

문서를 살펴보니 이 `fetch` 함수는 [`ohmyfetch`](https://github.com/unjs/ohmyfetch)를 사용하더라구요.

```ts [ohmyfetch]
// ESM / Typescript
import { $fetch } from 'ohmyfetch'

// CommonJS
const { $fetch } = require('ohmyfetch')
```

저도 처음봤습니다. 브라우저랑 노드에서 둘 다 사용 가능하다고 합니다. `axios`에 비해 어떤 이점이 있는지 문서를 읽어봤는데 크게 어떤 이점이 있는지는 잘 모르겠습니다. 하나 꼽자면 타입스크립트 친화적이라는 점 정도 있을 것 같습니다.

`nuxt3` 에서는 이렇게 사용하면 됩니다.

```vue [nuxt3]
<script setup lang="ts">
const { data, error, pending, refresh } = await useFetch('https://...')
</script>
```

역시 프레임워크답게 여러가지 편의 기능을 많이 제공하고 있습니다.

- `data`: HTTP 응답 데이터
- `error?` HTTP 요청 에러 데이터
- `pending: Boolean`: 요청에 대한 응답을 기다리고 있는지 여부를 가지고 있습니다.
- `refresh: (force?: Boolean) => Promise<void>`: 같은 요청을 새로 보내고 싶을 때 컴포넌트 내에서 `refresh()` 하면 요청을 또 보낼 수 있습니다.

`pending` 은 생각보다 엄청 코드량을 줄여줍니다.

```vue [nuxt3]
<template>
  <div>
    <h1 class="text-3xl font-bold">Home</h1>
    <div v-if="pending">Loading..</div>
    <template v-else>
      <div v-if="error">Sorry, error occured.</div>
      <div v-else>{{ data }}</div>
    </template>

    <button @click="refresh()">Refresh</button>
  </div>
</template>

<script setup lang="ts">
const { data, pending, error, refresh } = await useFetch(
  'https://jsonplaceholder.typicode.com/todos/1'
)
</script>
```

프론트엔드에서 HTTP 요청을 보낼 땐 각 상황에 맞는 올바른 UI가 필요합니다. 응답 대기 중에는 로딩이라고 표시하고, 응답이 왔지만 에러가 발생했다면 에러라고 보여줘야하겠죠. 에러가 없다면 그 때서야 원하는 데이터를 보여줄 수 있습니다.

이렇게 `nuxt3` 에서는 스크립트 한 줄로 응답 대기, 에러와 재요청을 모두 처리 가능합니다. 참 편합니다.

근데 이 `useFetch` 함수의 설정을 전역으로 설정하고 싶을 수 있습니다.

그 전에 알아야 할 개념이 있는데요, 일단 `use-` 어쩌구로 시작하는거는 전부 `vue3`의 `composition API` 입니다. `React`의 `hooks`와 같은 개념입니다. 이 둘의 핵심은 프레임워크 기능을 모듈화가 가능하다는 점입니다.

뭐 예를들면 `vue`의 `mounted()` 같은 건 컴포넌트 내에서만 사용 가능했는데, 일부 컴포넌트가 마운트 때 마다 로그를 찍어주고 싶으면 매 컴포넌트마다 `mounted` 훅에 로그를 찍었어야 했습니다. 하지만 `composition` 이라는 이름의 기능이 생기면서 이런 `mounted` 같은 함수를 모듈화해서 재사용이 가능하도록 만들어줬습니다.

어쨌든 `useFetch`도 `use-`로 시작하는걸로 봐선 `composition`이고, `nuxt3` 에서는 이런 커스텀 `composition`을 만드려면 `composables/` 폴더 아래에 파일을 생성하면 자동으로 만들어주도록 되어있습니다. 프로젝트 루트에 `composables/` 폴더를 만들고, `useApi.ts` 파일을 만들어주세요. 이 역시 컴포넌트 폴더처럼 파일 이름을 읽어서 자동으로 전역으로 `import` 해줍니다.

```ts [composables/useApi.ts]
export default (url: string) => {
  return useFetch(url, {
    baseURL: 'https://api.example.com',
    onRequest: (context) => {
      const isDev = process.env.NODE_ENV === 'development'
      if (isDev) {
        // 이 부분은 왜 이렇게밖에 못하는지 모르겠는데, 차후 개선이 되면 좋겠네요.
        // 참고: https://github.com/nuxt/framework/issues/2557#issuecomment-1003865620
        context.options.headers = new Headers(context.options.headers)
        context.options.headers.append('Authrization', 'Bearer TOKEN_FOR_DEV')
      }

      return null
    },
  })
}
```

이렇게 해주고 프로젝트를 재시작하면 아래처럼 커스텀 `composition`을 전역에서 사용이 가능합니다.

```diff-vue [nuxt3]
   <script setup lang="ts">
+  const { data, pending, error, refresh } = await useApi('/todos/1')
-  const { data, pending, error, refresh } = await useFetch(
     'https://jsonplaceholder.typicode.com/todos/1'
   )
   </script>
```

아까 컴포넌트쪽에서 말했듯이 `useFetch` 같은건 `nuxt` 프레임워크에서 전역으로 사용 가능하니까 이대로도 `import` 오류가 발생하진 않습니다.

## 상태 관리

모든 페이지, 컴포넌트에서 같은 데이터를 참조하고 싶을 수 있습니다. 대표적으로 로그인을 한 유저의 정보를 어디서든 가져오고 싶은 경우죠. 기존에는 `Vuex`를 공식 라이브러리로 사용했지만, 이제는 레거시가 되었습니다.

새로운 뷰 코어 팀이 준비한 상태 관리 라이브러리는 바로 [`Pinia`](https://pinia.vuejs.org/) 입니다. `Vuex`도 이미 너무 잘 만든 상태 관리 라이브러리지만 새로 만든 이유는 공식 문서에 따르면 다음과 같습니다.

> Compared to Vuex, Pinia provides a simpler API with less ceremony, offers Composition-API-style APIs, and most importantly, has solid type inference support when used with TypeScript.

요약하자면 컴포지션 API와 타입스크립트를 더 잘 지원하기 위함입니다. 직접 사용해보니까 더 사용하기 편리한 것도 맞고, 타입스크립트 친화적인 것도 맞습니다. 기존에도 좋았는데 지금은 더 좋아졌습니다. 도입하지 않을 이유가 없습니다. 간단하게 사용하기 위해 프로젝트 루트 폴더에 `stores/` 폴더를 만들고 `user.ts` 파일을 만들어줍니다.

`Pinia`의 주요 변경 사항 중 하나는 기존에는 데이터에 변화를 줄 때 비동기 여부에 따라 `actions`와 `commit` 함수를 나누어 사용했는데, 이제는 `actions`에 모두 통합되었습니다. 그거 말고는 똑같습니다.

```ts [stores/user.ts]
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  getters: {
    doubleCount: (state) => state.user,
  },
  actions: {
    save(user?: any) {
      this.user = user
    },
  },
})
```

사용하는 방법도 조금 다른데요, 기존에는 최상위 `store` 객체를 가져와서 미리 정의된 고유한 문자열을 키로 삼아 전역 상태 값을 가져오거나 변경했었습니다.

이제는 타입스크립트를 통해 완벽한 자동완성을 지원받을 수 있고, 각 모듈화된 `store`를 개별적으로 가져오면 됩니다. 이건 정말 좋아진 것 같습니다.

```diff-vue [pages/index.vue]
   <template>
     <div>
       <h1 class="font-bold text-3xl">Home</h1>
       <div v-if="pending">Loading..</div>
       <template v-else>
         <div v-if="error">Sorry, error occured.</div>
         <div v-else>{{ data }}</div>
       </template>

+      <div>{{ userStore.user }}</div>

       <button @click="refresh()">Refresh</button>
+      <button @click="userStore.save({ email: 'peterkimzz69@gmail.com' })">Increment</button>
     </div>
   </template>
```

```diff-vue [pages/index.vue]
   <script setup lang="ts">
+  import { useUserStore } from '~~/stores/users'

   const { data, pending, error, refresh } = await useApi('/todos/1')

+  const userStore = useUserStore()
   </script>
```

## 마무리

이번 글에서는 스타일링 도구인 `tailwindcss`와 HTTP 통신을 위한 `ohmyfetch`에 대해 알아봤습니다. 그리고 `nuxt3`의 주요 변경점도 알아봤습니다.

이 정도면 저희가 하고싶은 개발 환경 설정은 끝이 났습니다. 이것만으로도 적당히 작동하는 앱을 충분히 만들 수 있습니다. 별거 없죠? 요샌 프레임워크들이 편의성을 너무 잘 제공해주고 있어서 창작자들이 개발에 쓰는 시간을 줄여줘서 너무 좋은 것 같습니다. 그 시간 아껴서 고객들이 겪는 문제점을 해결하는데 시간을 더 쓰면 좋겠네요.
