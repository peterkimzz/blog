---
category: tech
title: "[Vue3] 이미지 확대해서 보기 5분만에 구현하기"
updated: 2023-09-21
created: 2023-09-21
image: https://github.com/peterkimzz/blog/assets/20244536/e69b7f72-e24d-4c49-bfa7-1482adf30710
---

<!--more-->

자 이번 포스팅에서 진짜 개꿀 라이브러리 하나 소개해드리려고 합니다. 미디엄같은 블로그 서비스에서 본문 내의 이미지 클릭하면 화면 꽉 차게 만드는 것 보신 적 있으실겁니다. 아래 이미지를 한 번 눌러보시죠.

![thumbnail](https://github.com/peterkimzz/blog/assets/20244536/e69b7f72-e24d-4c49-bfa7-1482adf30710)

미디엄과 작동이 99.9% 동일합니다. 아니 제 눈에는 이게 좀 더 나아보입니다. 미디엄은 확대하면 주변이 하얘지는데 저는 검은색 배경이라 더 집중되는 듯한 느낌이라 더 좋거든요.

이거 깔끔하게 구현하려면 시간 은근 많이 걸리실겁니다.

사실 Vue 아니더라도 어떤 환경에서든 5분만에 설치가 가능합니다. 자 바로 들어갑니다.

:Serieis{:type="in-n-minutes"}

## 패키지 설치하기

일단 패키지 이름은 [`medium-zoom`](https://github.com/francoischalifour/medium-zoom){:target="\_blank"} 입니다. npm을 사용할 수 있다면 아래 방법으로 프로젝트에 패키지를 설치해주세요. 타입스크립트 포함입니다.

```zsh
yarn add medium-zoom
# npm install medium-zoom
```

npm을 사용할 수 없더라도 괜찮습니다. CDN이 있습니다.

```html
<script src="node_modules/medium-zoom/dist/medium-zoom.min.js"></script>
```

자 준비 끝났습니다. CSS import 그런거 필요 없습니다.

## 활성화하기

npm을 사용했다면 `import mediumZoom from 'medium-zoom'` 이렇게 import 후 사용해주시면 되고, CDN인 경우엔 바로 `meidumZoom()` 을 호출하면 되겠습니다.

인터페이스는 간단합니다. 첫 번째 자리에는 CSS Selector 또는 HTML Element를 넣어주시면 됩니다.

```ts
mediumZoom(selector?: string | HTMLElement | HTMLElement[] | NodeList, options?: object): Zoom
```

예시를 보면 이해가 빠릅니다.

```ts
// CSS selector
mediumZoom("[data-zoomable]");

// HTMLElement
mediumZoom(document.querySelector("#cover"));

// NodeList
mediumZoom(document.querySelectorAll("[data-zoomable]"));

// Array
const images = [
  document.querySelector("#cover"),
  ...document.querySelectorAll("[data-zoomable]"),
];
mediumZoom(images);
```

저는 이 블로그에 첫 번째 방법인 CSS Selector를 사용했습니다. 즉 모든 `<img>` 태그에 `data-zoomable` 속성이 들어가있는 애들은 전부 라이브러리의 대상이 된다는 뜻입니다.

아래 예제 코드와 미리보기를 참고해주세요. 정말 너무나 간단합니다.

```ts
import mediumZoom from "medium-zoom";

mediumZoom("[data-zoomable]");
```

:Stackblitz{:src="https://stackblitz.com/edit/js-joozuo?embed=1&file=index.js&hideDevTools=1&theme=dark&view=preview"}

자 근데 여기서 제 블로그와 똑같이 확대되었을 경우, 배경을 투명한 검은색으로 설정하고 싶으시다면 아래 코드처럼 설정하시면 됩니다.

```ts
import mediumZoom from "medium-zoom";

mediumZoom("[data-zoomable]", {
  background: "#000000e6",
});
```

```html
<div>
  <h1>Medium Style Image Zoom Demo</h1>
  <img src="https://picsum.photos/400/300" data-zoomable />
</div>
```

## Vue Composable로 만들기

사실 이대로 마무리해도 알아서 잘 사용하시겠지만, Vue3를 사용하시는 분들을 위해 Composable 하나 투척하겠습니다.

저는 이 Composable을 부르면 알아서 적용되도록 하고 싶어서 이름을 `useClickToZoomImage` 로 지었습니다.

```ts [composables/useClickToZoomImage.ts]
import mediumZoom from "medium-zoom";

export function useClickToZoomImage() {
  onMounted(() => {
    mediumZoom("[data-zoomable]", {
      background: "#000000e6",
    });
  });
}
```

이렇게 한 뒤 `.vue` 파일에서 해당 컴포저블을 호출하시면 되겠습니다.

```vue
<script setup lang="ts">
import { useClickToZoomImage } from "~/composables/useClickToZoomImage.ts";

useClickToZoomImage();
</script>

<template>
  <div>
    <h1>Medium Style Image Zoom Demo in Vue 3</h1>
    <img src="https://picsum.photos/400/300" data-zoomable />
  </div>
</template>
```
