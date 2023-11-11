---
category: nuxt3
title: Nuxt3 Perfect Setup Guide 2024
updated: 2023-11-06
created: 2023-11-06
image: https://user-images.githubusercontent.com/20244536/136804762-1e64b59c-e60e-462b-99f8-a39131f4c507.png
draft: true
---

이번 포스팅에서는 여러분들이 Nuxt3를 이용해 어느 정도 큰 규모의 웹사이트를 만드려고 할 때 미리 구성하면 좋을 것들에 대해 자세히 알려드리려고 합니다.

예를 들어 타입 지정을 위한 Typescript, HTML 스타일링을 위한 Tailwind CSS, 코드 컨벤션을 위한 ESLint 와 Prettier, 그리고 SEO를 위한 Sitemap 생성 등이 있습니다.

<!--more-->

이것들을 나중에 하려고 하면 기존 코드베이스를 대량으로 수정해야하는 불상사가 있을 수 있으니 미리 셋업하시는 것을 추천드립니다.

## Project Setup

먼저 Nuxt3 프로젝트를 만들어주세요.

```zsh
npx nuxi@latest init PROJECT_NAME
```

![Nuxt Welcome](https://github.com/peterkimzz/blog/assets/20244536/65862aba-b3ea-4ad7-9cc8-2faefc5df7c9)

최초의 여러분들의 프로젝트 구조는 이렇습니다.

```zsh
.nuxt/
node_modules/
public/
server/
|- tsconfig.json
app.vue
nuxt.config.ts
package.json
tsconfig.json
yarn.json
```

프로젝트를 만들고나서 가장 먼저 해야할 일은 여러분들의 웹사이트에 여러 경로가 필요할 것이기 때문에 프로젝트 루트 폴더에 `pages` 폴더와 각 `.vue` 파일을 만드는 것입니다. 그리고 가장 최상위의 `app.vue` 파일에선 `pages` 아래 파일들을 렌더링할 수 있도록 해주세요.

```zsh
pages/
|- contact.vue
|- index.vue
```

```vue
<!-- app.vue -->
<template>
  <div>
    <NuxtPage />
  </div>
</template>
```

```vue
<!-- pages/index.vue -->
<script setup lang="ts"></script>

<template>
  <div>This is main page</div>
</template>
```

```vue
<!-- pages/contact.vue -->
<script setup lang="ts"></script>

<template>
  <div>This is Contact page</div>
</template>
```

`http://localhost:3000` 와 `http://localhost:3000/contact` 페이지로 갔을 때 화면이 나오면 성공입니다.

## Nuxt UI

Nuxt 공식 팀이 관리하는 UI 프레임워크입니다. 활발하게 업데이트가 이루어지고 있고, 지금은 꽤나 많은 컴포넌트들을 지원합니다. 테마 커스터마이징도 아주 쉽고, 내부적으로 Tailwind CSS를 사용합니다. 이 패키지를 사용하면 `tailwindcss` 를 따로 설치하지 않아도 됩니다.

그리고 이 프레임워크는 오로지 Nuxt 3를 위해 제작이 되었기 때문에 매우 부드럽고 가볍게 작동하고, 무엇보다 사용하기 매우 편합니다. 웬만하면 그냥 이 프레임워크를 사용하는 것을 추천드립니다.

```zsh
yarn add @nuxt/ui
```

Nuxt 3에서는 모듈을 설치하고 `nuxt.config.ts`에 한 줄 추가해주는 것으로 바로 사용이 가능합니다.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
});
```

Nuxt UI를 이용해 간단한 폼을 만들어보겠습니다. 이미 상당 부분 여러 기능을 제공하기 때문에 굳이 이 컴포넌트들을 다시 Wrapping할 필요 없습니다.

```vue
<!-- pages/contact.vue -->
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

const state = reactive({
  email: undefined,
  password: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });

  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data);
}
</script>

<template>
  <UContainer :ui="{ constrained: 'max-w-sm' }">
    <div class="py-10">
      <UForm
        :validate="validate"
        :state="state"
        @submit="onSubmit"
        class="space-y-4"
      >
        <UFormGroup label="Email" name="email">
          <UInput size="lg" v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput size="lg" v-model="state.password" type="password" />
        </UFormGroup>

        <UButton size="lg" type="submit" block>Submit</UButton>
      </UForm>
    </div>
  </UContainer>
</template>
```

![nuxt-ui-contact-page](https://github.com/peterkimzz/blog/assets/20244536/fb2f4f9a-fc28-41d8-9b28-82a4c3e8459a)

이렇게 코드 몇 줄로 꽤 있어보이는 폼을 만들었습니다.

위 코드만 봐도 이 프레임워크에 꽤 여러가지 것들이 이미 통합이 되어있다는 것을 알 수 있는데요, `tailwindcss` 를 이용해 패딩을 주었고, `Input` 태그에는 `heroicons` 를 이용해 아이콘도 표시했습니다. 또 `UForm` 태그의 `validate` 함수에는 `path` 와 `message` 키 값을 가지는 객체를 내보내는 것만으로 에러가 나오게 됩니다. 그리고 `UContainer` 에는 `ui` 라는 속성을 이용해 이미 정의된 스타일을 간단하게 오버라이드 해줄 수 있게됩니다.

여기서 웹사이트 전체에 메인 컬러, 즉 Primary 컬러를 지정하고 싶다면 프로젝트 루트 폴더에 `app.config.ts` 파일을 만들어주세요. 그리고 한 줄만 추가해주세요.

```ts
// app.config.ts
export default defineAppConfig({
  ui: {
    primary: "blue",
  },
});
```

![nuxt-ui-primary-color](https://github.com/peterkimzz/blog/assets/20244536/77974278-02f4-471c-bb6d-322a5986dafa)

이제 Nuxt UI에서 쓰는 모든 컬러는 기본적으로 `blue`에 맞게 표현됩니다. 너무 쉽네요!

## Font Familly

여러분들의 커스텀 폰트는 웹사이트 전역에 적용이 되어야 합니다. 그렇다면 `app.vue` 에 적용하면 됩니다. `app.vue` 페이지에 작성한 내용은 모든 페이지에 적용됩니다.

이 파일에 폰트 CDN 링크를 불러오고, `tailwindcss` 에서 해당 폰트 패밀리 이름을 기본 폰트로 지정해주면 됩니다.

저는 `Inter` 를 사용하도록 하겠습니다.

```vue
<!-- app.vue -->
<script setup lang="ts">
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://rsms.me/inter/inter.css",
    },
  ],
});
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
```

![tailwindcss-font-family](https://github.com/peterkimzz/blog/assets/20244536/c589270e-596b-40a0-a94e-c35d8aa8e981)

폰트가 잘 지정되었습니다.

## Open Graph for SEO

Nuxt3 쓰는 가장 큰 이유 중 하나는 서버 사이드 렌더링입니다. Nuxt 에는 이미 이런 Open Graph를 위해 매우 유용한 빌트인 함수인 `useSeoMeta` 를 제공합니다. `vue` 파일 어디서든 그냥 호출하고 텍스트를 넣어주면 됩니다.

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
useSeoMeta({
  title: "My Main Page",
});
</script>

<template>
  <div>This is main page</div>
</template>
```

이렇게 하고 저장한 뒤, 브라우저 탭의 이름을 확인해주세요.

![useSeoMeta](https://github.com/peterkimzz/blog/assets/20244536/cd842e2d-59ab-419d-8ce7-f7525460ea31)

하지만 여러분들이 서버에서 받아온 값으로 이 타이틀을 지정하고 싶을 수도 있는데요, `script` 안에서 동기 처리를 해준 뒤 똑같이 `useSeoMeta` 를 부르기만 하면 됩니다.

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
const { data } = await useLazyFetch<{ title: string }>(
  () => "https://jsonplaceholder.typicode.com/todos/1"
);

useSeoMeta({
  title: data.value?.title,
});
</script>

<template>
  <div>This is main page</div>
</template>
```

![useSeoMeta-with-async](https://github.com/peterkimzz/blog/assets/20244536/de49480a-ca55-4889-905d-6614482facd3)

다른 페이지에서 넘어오든, 페이지를 새로고침 하더라도 HTML title 태그가 동적으로 변하게 됩니다. `useSeoMeta` 에 대한 더욱 자세한 내용은 아래 공식 문서를 참고해주세요.

- useSeoMeta Documentation

## Environment Variables

API키나 토큰을 프로젝트 한곳에 모아두고, 필요할 때만 클라이언트측에 노출시키는 건 프로젝트 유지보수 측면에서 굉장히 중요합니다.

Nuxt3는 기본적으로 프로젝트 루트 폴더의 `.env` 파일을 읽고 프로젝트에 주입해줍니다. 내부적으로 `dotenv` 를 사용하기 때문에 `process.env.MY_SECRET_TOKEN` 처럼 서버 측에서 각 환경 변수에 접근할 수 있습니다만, Nuxt 에서는 직접 액세스하는 것 대신 `runtimeConfig` 을 사용합니다.

여기서 중요한 사실은 각 환경 변수 앞에 `NUXT_` 또는 `NUXT_PUBLIC_` 이라는 접두어를 붙여서 `runtimeConfig` 를 사용하면 훨씬 편하게 환경 변수를 관리할 수 있습니다.

먼저 프로젝트 루트 폴더에 `.env` 파일을 만들고, 환경 변수를 지정해줍시다.

```
NO_PREFIX_TOKEN="no_prefix_token"
NUXT_SECRET_TOKEN="my_secret_token"
NUXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-XXXXX"
```

Nuxt가 내부적으로 어떻게 환경 변수를 처리하는지 확인하기 위해 간단한 서버측 응답 코드를 작성해봅시다.

```ts
export default defineEventHandler(() => {
  const runtimeConfig = useRuntimeConfig();

  console.log(process.env);
  console.log(runtimeConfig);

  return {};
});
```

로그에는 이렇게 출력됩니다.

```
{
  app: { baseURL: '/', buildAssetsDir: '/_nuxt/', cdnURL: '' },
  nitro: {
    envPrefix: 'NUXT_',
    routeRules: {
      '/__nuxt_error': [Object],
      '/_nuxt/builds/meta/**': [Object],
      '/_nuxt/builds/**': [Object]
    }
  },
  public: {}
}
```

환경 변수가 없습니다. 근데 이건 의도된 동작이고, `nuxt.config.ts` 파일에 명시적으로 키를 지정해주면 자동으로 키가 주입됩니다. 조금 귀찮지만 이렇게 하면 프로젝트에서 어떤 값을 쓰는지 좀 더 명확히 알 수 있고, 타입스크립트의 도움을 받을 수 있습니다.

```ts
export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
  runtimeConfig: {
    secretToken: "",
    public: {
      googleAnalyticsId: "",
    },
  },
});
```

```zsh
{
  app: { baseURL: '/', buildAssetsDir: '/_nuxt/', cdnURL: '' },
  nitro: {
    envPrefix: 'NUXT_',
    routeRules: {
      '/__nuxt_error': [Object],
      '/_nuxt/builds/meta/**': [Object],
      '/_nuxt/builds/**': [Object]
    }
  },
  public: { googleAnalyticsId: 'G-XXXXX' },
  secretToken: 'my_secret_token'
}
```

잘 주입이 됐습니다! 마지막으로 한 가지 더 확인하고 싶은 것은 `NUXT_PUBLIC_` 을 지정한 값을 클라이언트측에서 접근할 수 있는지입니다.

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
const { data } = await useFetch<{ title: string }>(
  () => "https://jsonplaceholder.typicode.com/todos/1"
);

const runtimeConfig = useRuntimeConfig();

useSeoMeta({
  title: data.value?.title,
});
</script>

<template>
  <div>
    <div>{{ runtimeConfig }}</div>
  </div>
</template>
```

![env](https://github.com/peterkimzz/blog/assets/20244536/7077a080-de1d-4227-bd23-524c5fb240d5)

`NUXT_` 로 시작한 값은 주입되지 않고, `NUXT_PUBLIC_` 으로 지정한 값만 클라이언트측에서 접근할 수 있게 되었습니다.

## ESLint & Prettier

일관된 코드 규칙과 포맷을 가지는 것은 매우 중요합니다. 이건 개인적인 의견이지만, 혼자 개발하더라도 코드 Linting을 반드시 하시길 바랍니다.

근데 ESLint를 모르시는 분들을 위해 간략히 설명드리자면, 코드에 규칙을 지정할 수 있게됩니다.

예를 들어 `console.log` 를 사용하면 `warning` 이 나오게 한다거나, 사용하지 않는 변수가 있다면 `error` 가 나오게 할 수 있습니다. 이를 이용하면 코드를 푸시하기전에 항상 `eslint` 를 실행시켜서 일관되지 않은 코드가 있다면 커밋이 안되게끔 할 수 있습니다.

그럼 Nuxt와 Typescript를 Linting하기 위한 최소한의 설치를 해봅시다.

```zsh
yarn add -D eslint @nuxtjs/eslint-module
yarn add -D typescript @nuxtjs/eslint-config-typescript
```

그리고 `nuxt.config.ts` 를 수정합니다.

```diff
# nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
+  modules: ["@nuxt/ui", "@nuxtjs/eslint-module"],
  runtimeConfig: {
    secretToken: "",
    public: {
      googleAnalyticsId: "",
    },
  },
});
```

마지막으로 `eslint` 의 설정을 지정하는 `.eslintrc` 파일을 프로젝트 루트 폴더에 만들어주세요.

```zsh
# .eslintrc
{
  "root": true,
  "extends": ["@nuxtjs/eslint-config-typescript"]
}
```

이렇게 하고 서버를 열면 우리가 지정한 `@nuxtjs/eslint-config-typescript` 이 파일 설정에 맞지 않는 규칙이 있다면 오류를 발생시킵니다.

![image](https://github.com/peterkimzz/blog/assets/20244536/68bd1891-392d-4f97-9273-025486090a86)

원래 위 사진처럼 코드에 오류가 표시되지는 않지만, 저는 코드 에디터 (VSCode)에 `ESLint` 플러그인을 미리 설치해두었습니다. (설치 방법은 아래에서 설명)

어쨌든 여기서 이 ESLint 오류들을 자동으로 해결하고 싶다면, 터미널에 이렇게 입력하면 됩니다. (모든 에러가 해결되진 않습니다.)

```zsh
npx eslint --fix .
```

근데 사실 마지막에 한 번에 점검하고 수정하는 것 보다, 코드를 저장할 때 마다 자동으로 오류를 발견하고 수정하는 게 더 좋습니다.

여기서 `Prettier` 가 등장합니다. Prettier도 코드 규칙을 지정하는 도구이지만, 역할이 조금 더 단순합니다. 주로 코드 포맷을 일관되게 유지시켜주는 역할입니다.

예를 들어 각 코드 끝 줄에 세미콜론을 붙일지 말지를 결정한다거나, 한 줄에 일정 글자 수가 넘어가면 자동으로 2줄로 만들어준다든가 하는 것을 강제합니다.

ESLint가 Prettier의 역할을 일부 포함하기 때문에 이 두 가지 도구를 같이 사용하는 경우 무조건 충돌이 생깁니다.

다행히도 `eslint-plugin-prettier` 라는 것을 이용해서 같은 규칙에 대해 충돌이 생기지 않게끔 할 수 있습니다.

일단 한 번에 통합하기 보다는 단계에 맞춰 설치를 해보겠습니다. 먼저 Prettier 만 설치합시다.

```zsh
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

이렇게 하고 프로젝트 루트 폴더에 `.prettierrc` 를 만들어줍시다.

```zsh
{
  "semi": true,
}
```

그리고 `.eslintrc` 파일에 이 플러그인을 추가해주고, prettier와 충돌이 나는 부분에 대해서 오류를 내지 않겠다라고 지정해주면 됩니다.

```zsh
{
  "root": true,
  "extends": [
    "@nuxtjs/eslint-config-typescript",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": "off"
  }
}
```

다만 지금까지 설치한 것들은 모두 터미널에서 파악 가능한 에러이기 때문에, 코드 에디터 내에서 ESLint와 Prettier 오류를 바로 알 수도 없고, 수정할 수도 없습니다.

하지만 VSCode에 ESLint와 Prettier 플러그인을 설치해두면 코드 에디터에서 바로 오류를 인지하고 수정할 수 있습니다. 이것도 꼭 설치해주세요.

- ESLint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- Prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

설치 후 `Command (Ctrl) + ,` 를 눌러 설정 화면에서 `format` 을 검색하고 `defaultFormatter` 를 `Prettier` 로 지정하고 `Format on Save` 를 체크하면 끝입니다.

![vscode-settings-format](https://github.com/peterkimzz/blog/assets/20244536/3a10bf60-09ed-4913-ba7d-6d9011639f82)
