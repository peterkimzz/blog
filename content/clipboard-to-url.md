---
category: tech
title: 클립보드 이미지를 1초만에 링크로 만드는 툴 개발하기
updated: 2021-09-14
created: 2021-09-14
thumbnail: https://user-images.githubusercontent.com/20244536/133209740-1982eec8-1c1a-4dc9-8c37-ee5970d6ee0a.png
published: true
---

저는 이 블로그를 운영하면서 가장 귀찮은 일이 하나 있습니다. 바로 **이미지 주소**를 만드는 일인데요, 저는 `@nuxt/content` 모듈을 이용해 마크다운 포맷을 이용하는 정적 블로그를 운영 중이라 글 작성 중에 원격 이미지 주소를 삽입하는 기능을 사용하지 않습니다.

<!--more-->

그래서 이미지를 삽입할 땐 클립보드에 저장된 이미지나 가지고 있는 이미지를 제 `GitHub Issue` 아무거나 골라 댓글에 붙여넣기해서 만들어진 URL을 사용하고 있습니다.

![clipboard_to_link](https://user-images.githubusercontent.com/20244536/132941829-34dac179-1ce1-44cf-a683-dd2bca87c4e1.gif)
_이런 식으로 블로그에 삽입할 이미지 주소를 무료로 만들어서 사용 중입니다_

이렇게 하는 이유는 이 블로그 리파지토리에 이미지 리소스를 저장하기 싫고, 외부 저장소를 사용하는 비용을 지불하고 싶지 않기 때문입니다. (참고로 깃허브 저장소는 용량이 무제한이 아니다)

## 좀 더 편하게 링크를 만들어보자

사실 지금도 그렇게 불편하지는 않습니다. 그저 깃허브에 로그인하고 이슈 페이지까지 가는게 너무 귀찮을 뿐이죠..

근데 **클립보드로 영역을 캡쳐하고, 필요할 때 원격 이미지 주소가 생기면** 너무 좋지 않을까? 라는 생각이 들었습니다. 당연히 확장 프로그램이 좀 더 편한 UX가 될 것 같습니다.

클립보드 캡쳐해두고 확장 프로그램 실행하면 바로 원격 저장소에 저장한 뒤, URL이 복사되게끔 하는거죠.

수익화나 PMF 이런 건 일단 제쳐두고, 일단 만들어보도록 하겠습니다.

## 프로젝트 셋업

저는 `Vue.js` 를 좋아하기 때문에 `Vite`과 `Vue`를 이용해 프로젝트를 만들도록 하겠습니다.

```bash [bash]
$ yarn create vite clipboard-to-url --template vue
```

프로젝트 이름은 `Clipboard to URL` 입니다. 클립보드에 저장된 이미지를 URL로 만들기라는 뜻입니다.

그리고 이미지를 저장하기 위한 저장소로 [`supabase.io`](https://supabase.io/) 를 사용하도록 하겠습니다.

이 툴에 대해선 [Firebase를 대체할 오픈소스 프로젝트, Supabase](/supasbase-overview) 포스팅에서 다루었던 적이 있으니 궁금하신 분들은 참고해주세요.

```bash [bash]
$ yarn add @supabase/supabase-js
```

`supabase` 의 공식 라이브러리도 설치해줍시다.

## UI 만들기

일단 기존 컴포넌트는 전부 지워주시구요, 전 [`tailwindcss`](https://tailwindcss.com) 를 이용해 디자인하는 걸 좋아하기 때문에 이것도 설치하도록 하겠습니다.

```bash [bash]
$ yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest

$ npx tailwindcss init -p
```

생성된 `tailwind.config.js` 의 파일을 수정해주세요.

```diff-js [tailwind.config.js]
module.exports = {
- purge: [],
+ purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

마지막으로 `src` 폴더에 `index.css` 파일을 만들어 `tailwindcss` 를 불러온 뒤, `Vue`의 진입점에 이 `css` 파일을 읽도록 하면 되겠습니다.

```css [index.css]
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply text-gray-700;
    @apply bg-white;
    @apply leading-6;
    @apply antialiased;
  }
}
```

```js [main.js]
import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

createApp(App).mount("#app");
```

`tailwindcss` 설정은 이걸로 끝입니다.

먼저 상단 네비게이션 바 부터 만들어보도록 하겠습니다.

`src` 폴더에 `NavigationBar` 폴더를 만들고, 그 안에 `index.vue` 파일을 만들어주세요.

```tree
clipboard-to-url
|- src/
|-- components/
|--- NavigationBar/
|---- index.vue
```

여기서 `NavigationBar.vue` 로 만들지 않는 이유는, 혹시나 나중에 네비게이션 바에서 파생되는 컴포넌트를 또 만들어야 할 가능성이 있기 때문입니다.

크게 상관은 없지만 나중에 불필요하게 리팩토링하는 데 시간쓰지 않도록 하기 위함입니다.

```vue [NavigationBar/index.vue]
<template>
  <nav class="border-b border-gray-200 shadow-sm">
    <div class="mx-auto max-w-4xl px-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-black">
          <a href="/" class="block py-3">Clipboard to URL</a>
        </h1>
      </div>
    </div>
  </nav>
</template>
```

네비게이션 바 컴포넌트를 만들었습니다.

```vue [App.vue]
<template>
  <div>
    <NavigationBar />
  </div>
</template>

<script setup>
import NavigationBar from "~/components/NavigationBar.vue";
</script>
```

여기서 `import` 하는 파일의 경로를 보면 `~` 표시가 있습니다. 이는 현재 파일의 위치에 상관없이 파일을 불러오고 싶을 때 사용하는 `alias` 라는 개념입니다. `vite.config.js` 파일로 가서 설정해주도록 합니다.

```js [vite.config.js]
import path from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [vue()],
});
```

![image](https://user-images.githubusercontent.com/20244536/133067193-c315f86d-5f43-4d46-bea7-013611e30b09.png)

상단 바는 만들었으니, 클립보드에 저장된 이미지를 붙여넣기 하라는 인터페이스가 있으면 좋겠네요.

`components` 폴더 아래 `Image` 폴더를 만들고, `UploadZone.vue` 파일을 만들어주세요.

```vue [UploadZone.vue]
<template>
  <div
    class="
      flex
      justify-center
      rounded-md
      border
      border-dashed
      border-gray-400 bg-white px-6
      pt-5
      pb-6
      transition-colors
      hover:border-gray-600
    "
  >
    <div class="space-y-1 text-center">
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div class="flex text-sm text-gray-600">
        <span class="font-semibold text-indigo-600"
          >Paste a Clipboard Image</span
        >
      </div>
    </div>
  </div>
</template>
```

`App.vue` 파일에 방금 만든 컴포넌트를 불러와줍니다.

```vue [App.vue]
<template>
  <div>
    <NavigationBar />

    <ImageUploadZone />
  </div>
</template>

<script setup>
import NavigationBar from "~/components/NavigationBar/index.vue";
import ImageUploadZone from "~/components/Image/UploadZone.vue";
</script>
```

![image](https://user-images.githubusercontent.com/20244536/133197396-ffad0a54-7ed1-41ce-8c9f-7a879c9eb684.png)

인터페이스는 그럭저럭 괜찮아 보이지만, 한가지 문제는 좌우 넓이 제한이 없어서 화면에 꽉차보이는 게 영 마음에 들지 않네요.

모든 화면에서 좌우 넓이를 균일하게 맞추기 위해 `Container` 라는 컴포넌트들 만들도록 하겠습니다.

```vue [components/Container/index.vue]
<template>
  <div class="mx-auto max-w-4xl px-4">
    <slot />
  </div>
</template>
```

사실 이 스타일은 `NavigationBar` 에도 이미 적용이 되어 있었습니다. 같이 수정해주도록 합시다.

```diff-vue [NavigationBar/index.vue]
 <template>
  <nav class="border-b border-gray-200 shadow-sm">
-    <div class="mx-auto max-w-4xl px-4">
+    <Container>
      <div class="flex items-center justify-between">
        <h1 class="font-bold text-2xl text-black">
          <a href="/" class="block py-3">Clipboard to URL</a>
        </h1>
      </div>
+    </Container>
-    </div>
  </nav>
 </template>

+ <script setup>
+ import Container from "~/components/Container/index.vue";
+ </script>
```

```diff-vue [App.vue]
 <template>
  <div>
    <NavigationBar />

+   <Container>
+     <ImageUploadZone class="mt-6" />
+   </Container>
  </div>
 </template>

 <script setup>
   import NavigationBar from '~/components/NavigationBar/index.vue'
+  import Container from '~/components/Container/index.vue'
   import ImageUploadZone from '~/components/Image/UploadZone.vue'
 </script>
```

![image](https://user-images.githubusercontent.com/20244536/133198202-01e35f86-a636-439a-ac80-0d862a516013.png)

전보다 조금 더 낫네요.

## 클립보드 저장 후 붙여넣기

핵심 로직이 될 자바스크립트는 이렇습니다.

자바스크립트 이벤트인 `onpaste` 를 이용해서 붙여넣기를 감지하고, `Blob` 형태의 파일을 `supabase`의 저장소로 바로 업로드할겁니다.

저는 클립보드에 저장된 이미지를 혹시나 여러번 저장하더라도 모두 다른 URL이 나오게 하기 위해, 타임스탬프를 기반으로 고유한 문자열을 생성해주는 `uuid` 를 사용하도록 하겠습니다.

```bash [bash]
$ yarn add uuid
```

`uuid` 패키지를 설치해주고, `supabase` 에 업로드하는 로직까지 작성해보도록 하겠습니다.

먼저 `src` 폴더 아래 `utils` 폴더를 만들고, `supabase.js` 파일을 만들어줍니다.

```js [utils/supabase.js]
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

그리고 프로젝트 루트 폴더에 `.env` 파일도 만들고 `supabase` 의 API 주소와, `ANON_KEY` 를 환경 변수로 저장합니다. 여기에는 자기 프로젝트에 해당하는 값을 넣어주면 됩니다.

```[.env]
VITE_SUPABASE_URL=https://yourprojectid.supabase.co
VITE_SUPABASE_ANON_KEY=ey...
```

여기까지 작성했다면 `supabase` 를 클라이언트 측에서 사용할 준비가 됐으니, 클립보드 이미지를 원격 저장소에 저장하는 로직을 작성해보도록 합시다.

```vue [App.vue]
<script setup>
import { v4 as uuidv4 } from "uuid";
import { supabase } from "./utils/supabase";

document.onpaste = async (event) => {
  try {
    const items = event.clipboardData.items;
    const blob = items?.[0]?.getAsFile();

    if (!blob) {
      return;
    }

    const key = uuidv4();
    const bucket = "images"; // supabase 에 미리 만들어둔 public 버킷 이름

    await supabase.storage.from(bucket).upload(key, blob, {
      cacheControl: "3600",
    });

    const { publicURL } = await supabase.storage.from(bucket).getPublicUrl(key);
    console.log(publicURL);
  } catch (err) {
    console.log(err);
  }
};
</script>
```

![ani](https://user-images.githubusercontent.com/20244536/133199963-e79ea6f8-93a6-4b29-8595-2c468f32e489.gif)

gif가 잘 안보이긴 하지만, 화면 캡쳐 후 붙여넣기하면 정상적으로 저장소에 저장된 URL을 받았고 접속해보니 사진도 캡쳐한 영역만큼 잘 저장됐다는 걸 확인할 수 있습니다.

여기서 링크를 누르지 않더라도 잘 저장이 됐다는 걸 바로 인지하기 위해 조금만 더 인터페이스를 개선해봅시다.

```diff-vue [App.vue]
 <template>
  <div>
    <NavigationBar />

    <Container>
+      <div v-if="url" class="mt-6">
+        <p class="font-semibold text-sm uppercase text-gray-400">
+          Image preview
+        </p>
+        <img
+          :src="url"
+          class="mt-2 w-full shadow border border-gray-200 rounded-lg"
+        />
+        <a
+          :href="url"
+          target="_blank"
+          class="block mt-2 text-gray-700 font-semibold"
+        >
+          {{ url }}
+        </a>
+      </div>

      <ImageUploadZone class="mt-6" />
    </Container>
  </div>
 </template>

 <script setup>
  import { supabase } from './utils/supabase'
+ import { ref } from '@vue/reactivity'
  import { v4 as uuidv4 } from 'uuid'

  import Container from '~/components/Container/index.vue'
  import NavigationBar from '~/components/NavigationBar/index.vue'
  import ImageUploadZone from '~/components/Image/UploadZone.vue'
+ const url = ref(null)

  document.onpaste = async (event) => {
    try {
      const items = event.clipboardData.items
      const blob = items?.[0]?.getAsFile()

      if (!blob) {
        return
      }

      const key = uuidv4()
      const bucket = 'images'

      await supabase.storage.from(bucket).upload(key, blob, {
        cacheControl: '3600',
      })

      const { publicURL } = await supabase.storage.from(bucket).getPublicUrl(key)
+     url.value = publicURL
    } catch (err) {
      console.log(err)
    }
  }
 </script>
```

![2222](https://user-images.githubusercontent.com/20244536/133201523-ce63197b-28b0-43fb-9834-eceba9a63997.gif)

이제 붙여넣기를 하자마자 저장소에 잘 저장됐다는 걸 확인할 수 있습니다.

## 확장 프로그램

잘 작동하는 걸 확인했으니, 더 편리하기 사용하기 위해 확장 프로그램으로 만들어볼겁니다.

```bash [bash]
$ yarn add vite-plugin-chrome-extension
```

크롬 확장 프로그램은 `manifest.json` 파일만 있으면 작동합니다. 관련해서 개발을 좀 더 수월하게 도와주는 [`vite-plugin-chrome-extension`](https://www.npmjs.com/package/vite-plugin-chrome-extension) 패키지를 설치합시다.

```diff-js [vite.config.js]
  import path from 'path'
  import vue from '@vitejs/plugin-vue'
  import { defineConfig } from 'vite'
+ import { chromeExtension } from 'vite-plugin-chrome-extension'

  export default defineConfig({
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
+  build: {
+    rollupOptions: {
+      input: 'src/manifest.json',
+    },
+  },
    plugins: [vue(), chromeExtension()],
  })
```

확장 프로그램으로 만들기 위해 약간의 파일 정리가 필요합니다.

`manifest.json` 파일을 `src` 폴더 아래에 만들어주고, 루트 폴더에 있던 `index.html` 파일을 `src` 폴더 아래로 옮겨주세요. 변경된 폴더 구조는 아래와 같아야 합니다.

```tree
clipboard-to-url/
|- src/
|-- components/
|-- utils/
|-- App.vue
|-- index.css
|-- index.html
|-- main.js
|-- manifest.json
```

마지막으로 `package.json` 파일의 `scripts` 부분도 수정해줍시다.

```json [package.json]
{
  "scripts": {
    "dev": "vite build --watch --mode=development",
    "build": "vite build",
    "serve": "vite preview"
  }
}
```

이 상태로 `yarn dev` 를 이용해 `dist` 폴더를 만들면 이 폴더가 확장 프로그램이 되는 겁니다.

근데 하.. 작성하면서 보니까 현재 `vite-plugin-chrome-extension` 플러그인이 프로젝트 빌드시에 `tailwindcss` 를 인식하지 못하는 이슈가 있습니다.

그래서 개발자 모드 켜서 확장 프로그램을 로드해보면 스타일링 적용되지 않는 현상이 있습니다. 이 허탈함..

다시 스타일링을 적용하기엔 먼 길을 와버렸으니 그냥 진행하도록 하겠습니다.

```diff-vue [App.vue]
  <template>
-   <div>
+   <div style="width: 15rem; height: 15rem">
      <NavigationBar />

      <Container>
        <div v-if="url" class="mt-6">
          <p class="font-semibold text-sm uppercase text-gray-400">
            Image preview
          </p>
          <img
            :src="url"
            class="mt-2 w-full shadow border border-gray-200 rounded-lg"
+           style="width: 100%"
          />
          <a
            :href="url"
            target="_blank"
            class="block mt-2 text-gray-700 font-semibold"
          >
            {{ url }}
          </a>
        </div>

        <ImageUploadZone class="mt-6" />
      </Container>
    </div>
  </template>
```

일단 확장 프로그램 최소 사이즈를 맞추기 위해 최상단 `div` 태그에 높낮이를 적용합니다.

![3333](https://user-images.githubusercontent.com/20244536/133208249-570abac2-ef8a-4ea3-aed6-23dd0f2f98d5.gif)

## 마무리

짝짝짝! 여기까지 하셨으면 알파 버전 정도의 툴을 완성한겁니다. `css` 적용 안되는 문제만 없다면 참 좋았을텐데요..

추가로 이건 선택 사항인데, 붙여넣는 것도 귀찮다면 확장 프로그램을 누르는 순간 이미지를 만들어줘도 됩니다.

그리고 앱을 삭제하지 않는다면 기존 캡쳐 이미지 링크를 `localStorage` 를 이용해 저장해두고 언제든지 다시 링크를 가져올 수 있게 할 수도 있습니다. 이건 여러분들에게 과제로 남기겠습니다. 😄
