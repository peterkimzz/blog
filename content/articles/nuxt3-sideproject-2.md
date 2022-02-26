---
category: tech
title: '[Nuxt 3] 사이드 프로젝트 만들기 - 개발 환경 설정편'
updated: 2022-02-09
created: 2022-02-09
thumbnail: https://user-images.githubusercontent.com/20244536/152959346-43168905-d155-4e46-b812-9dc5eed12951.png
published: false
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

```html
<template>
  <div class="text-lg **font-bold**">
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

기존에는 전역적인 코드를 넣기 위해 `nuxt.config` 파일에 명시하거나, `plugin` 을 사용하기도 했었는데 이 부분은 `.vue` 파일을 이용해 컴포넌트를 활용한다는 점에서 더 좋아진 것 같습니다.

그러면 라우팅이 잘 되는지 확인을 위해 로그인 페이지도 만들어보고, 라우팅을 위한 `a` 태그도 만들어보겠습니다.

```vue [pages/login/index.vue]
<template>
  <div>
    <nav>
      <NuxtLink to="/">Go to index</NuxtLink>
    </nav>

    <div>login</div>
  </div>
</template>
```

```vue [pages/index.vue]
<template>
  <div>
    <nav>
      <NuxtLink to="/login">Go to login</NuxtLink>
    </nav>

    <div>index</div>
  </div>
</template>
```

![image](https://user-images.githubusercontent.com/20244536/153176122-6f3d47f8-0246-44a8-bec8-4b9c06473d0f.png)
![image](https://user-images.githubusercontent.com/20244536/153176179-649f294d-c033-4221-96c7-af35ca38cf69.png)

링크를 눌러보면 페이지 이동도 잘 되고, `/login` URL에서 새로고침을 하더라도 페이지가 잘 렌더링됩니다.

`<NuxtLink>`는 `nuxt` 에서 기본값으로 포함되어있는 네비게이션용 컴포넌트입니다. 웹사이트 **내부** 페이지 이동을 위해 `<a>` 태그 대신 사용하시면 됩니다.

참고로 페이지 내부 이동을 `<a>` 태그 대신 `<NuxtLink>` 컴포넌트를 사용하는 이유는 라우팅이 훨씬 빠르기 때문입니다. 페이지 전체를 다시 불러오지 않고, 바뀐 부분만 렌더링하기 때문입니다.

그럼 동적 페이지를 만드려면 어떻게 하면 될까요? 여기서도 `nuxt3`의 변경사항이 있습니다.

`/blog/1`, `/blog/2` ... 같이 URL에 따라 다른 페이지를 만드려면 기존에는 폴더명 맨 앞에 `_` 기호를 이용했었습니다. 예를 들어 이렇게요.

```[nuxt2]
- proejct/
|-- pages/
|---- _blogId/
|------ index.vue
```

하지만 `nuxt3`에서는 이렇게 사용합니다.

```[nuxt2]
- proejct/
|-- pages/
|---- [blogId]/
|------ index.vue
```

심지어 이젠 `[blogId]` 말고 `blog-[id]` 이런식으로 일부 텍스트만 동적으로 받을 수도 있습니다.

동적 `path` 파라미터 값을 가져올 땐 기존과 똑같습니다.

```vue [vue]
<template>
  <!-- [blogId] 인 경우 -->
  {{ $route.params.blogId }}

  <!-- blog-[id] 인 경우 -->
  {{ $route.params.id }}
</template>
```

쉽죠? `nuxt3`쪽이 훨씬 더 가독성이 좋습니다. 아 근데 이제는 `<template>`쪽에서 `$route`를 사용하는 건 자제하는게 좋습니다. 이유는 나중에 `Vue3`에서 새롭게 추가된 `Composition API`를 사용할 때 알려드릴게요.

## Navigation Bar

![image](https://user-images.githubusercontent.com/20244536/153179255-d77b4acf-c7f4-4b75-b28d-7a3bd5172710.png)
![image](https://user-images.githubusercontent.com/20244536/153179042-5a5603a5-0b1f-4731-b674-3b1282a0085e.png)
![image](https://user-images.githubusercontent.com/20244536/153179146-3d657f72-a0a8-4343-9f8a-c034b1ddf718.png)

거의 대부분 웹사이트가 가장 상단에 주요 페이지들로 이동할 수 있는 링크들을 배치하고 있습니다. 국룰인 것 같으니 따라하면 됩니다.

크게 나누면 왼쪽엔 서비스 로고, 오른쪽엔 링크를 배치하네요. 보통 이 네비게이션 바는 모든 페이지에서 동일하게 보여지니까 컴포넌트로 만들면 좋겠다는 생각이 듭니다.

`nuxt`는 `components/` 폴더 아래에 존재하는 모든 폴더, 파일을 자동으로 `import`합니다. 사용 방법은 예제를 아래 봐주세요.

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

```vue [pages/index.vue]
<template>
  <div>
    <NavigationBar />

    <div>index</div>
  </div>
</template>
```

```vue [pages/login/index.vue]
<template>
  <div>
    <NavigationBar />

    <div>login</div>
  </div>
</template>
```

![image](https://user-images.githubusercontent.com/20244536/153180466-d80909a3-8e56-43f0-8e04-8f6f6d6e7e14.png)
![image](https://user-images.githubusercontent.com/20244536/153180615-4ce58c75-2be2-44ea-bb0b-2aa38266991c.png)

잘 렌더링되고 있습니다.

근데 한 가지 문제가 있습니다. 지금대로라면 새로운 페이지가 늘어날 때 마다 `<NavigationBar/>` 를 계속해서 페이지 상단에 불러야합니다. 어떻게 하면 코드 중복을 피할 수 있을까요? 이건 `layouts` 폴더를 활용하면 쉽게 해결 가능합니다. `layouts/` 폴더를 만들고, `default.vue` 파일을 만들어주세요.

```vue [layouts/default.vue]
<template>
  <div>
    <NavigationBar />

    <slot />
  </div>
</template>
```

![image](https://user-images.githubusercontent.com/20244536/153181266-477c8008-9195-4356-a74c-7ecefa2c073d.png)

파일을 만드는 것만으로도 `default` 레이아웃이 전역적으로 적용됩니다. 사실 이건 `app.vue` 에서 `<NuxtLayout>` 태그를 이미 감싸줘서 그렇습니다.

`<slot>` 태그는 일단 `<NuxtPage>` 태그랑 역할이 비슷하다고 생각하시면 됩니다.

`layouts/` 폴더에서 네비게이션 바를 불러오고 있으니 이제 `pages/` 폴더 밑에 있는 파일에선 `<NavigationBar/>` 를 지워주세요.

## Tailwind CSS

본격적으로 `css` 를 사용하기 전에 스타일링을 더 편하고 이쁘게 만들어 줄 패키지인 `tailwindcss`를 먼저 설치하도록 하겠습니다.

```bash [bash]
$ yarn add -D tailwindcss postcss@latest autoprefixer@latest @nuxt/postcss8
$ npx tailwindcss init
```

이러면 `tailwind.config.js` 파일이 생기게 됩니다. 그 다음 `tailwindcss` 를 사용하기위해 `assets/` 폴더 아래 `css/` 폴더 아래 `tailwind.css` 파일까지 만들어주세요.

```css [assets/css/tailwind.css]
@tailwind base;
@tailwind components;
@tailwind utilities;
```

다음은 `nuxt.config` 파일을 수정해줄게요.

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
    <h1 class="text-3xl **font-bold**">Home</h1>
  </div>
</template>
```

![image](https://user-images.githubusercontent.com/20244536/153184535-3619e9ea-4a9b-47a8-b788-225e5bed46ce.png)

`tailwindcss` 가 잘 적용됐네요!

그럼 네비게이션 바를 만들어보도록 하겠습니다.

```vue [components/NavigationBar/index.vue]
<template>
  <nav>
    <div class="flex justify-between">
      <NuxtLink to="/">
        <img
          src="https://pbsmtipexzqvbentyzuw.supabase.co/storage/v1/object/public/drawbeat.com/public/logo1.svg"
          alt="app.drawbeat.com"
          class="w-[180px]"
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

로고를 누르면 홈으로 가도록 `<NuxtLink>` 태그로 감싸주었고, 로그인 페이지로 가는 메뉴는 오른쪽에 붙여서 배치했습니다. 아 참고로 `<NuxtLink>`는 브라우저에는 `<a>` 태그로 대치됩니다.
