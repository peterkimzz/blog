---
category: tech
title: "[Vue3] Click to Zoom Image in 5 Minutes"
updated: 2023-09-21
created: 2023-09-21
image: https://github.com/peterkimzz/blog/assets/20244536/e69b7f72-e24d-4c49-bfa7-1482adf30710
---

<!--more-->

Alright, in this post, I'm going to introduce a really cool library. You may have seen on blog services like Medium where clicking an image in the body makes it fill the entire screen. Try clicking the image below.

![thumbnail](https://github.com/peterkimzz/blog/assets/20244536/e69b7f72-e24d-4c49-bfa7-1482adf30710)

It works almost 99.9% the same as Medium. Actually, in my opinion, it looks even better. Medium's background turns white when zoomed in, but I prefer the black background as it feels more focused.

Implementing this cleanly might take some time.

In fact, you can install it in just 5 minutes, even if you're not using Vue. Let's dive right in.

:Serieis{:type="in-n-minutes"}

## Installing the Package

Firstly, the package name is [`medium-zoom`](https://github.com/francoischalifour/medium-zoom){:target="\_blank"}. If you can use npm, install the package in your project using the following command, which includes TypeScript support.

```zsh
yarn add medium-zoom
# npm install medium-zoom
```

If you can't use npm, that's okay. There's a CDN.

```html
<script src="node_modules/medium-zoom/dist/medium-zoom.min.js"></script>
```

Alright, we're ready. No need to import CSS or anything.

## Activating the Package

If you used npm, import mediumZoom like this: import mediumZoom from 'medium-zoom', and then use it. If you're using the CDN, just call meidumZoom() directly.

The interface is simple. Just put a CSS selector or HTML Element in the first position.

```ts
mediumZoom(selector?: string | HTMLElement | HTMLElement[] | NodeList, options?: object): Zoom
```

You'll understand it quickly with examples.

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

I used the first method, CSS Selector, in this blog. It means all <img> tags with the data-zoomable attribute are targets of the library.

Refer to the example code and preview below. It's really simple.

```ts
import mediumZoom from "medium-zoom";

mediumZoom("[data-zoomable]");
```

:Stackblitz{:src="https://stackblitz.com/edit/js-joozuo?embed=1&file=index.js&hideDevTools=1&theme=dark&view=preview&ctl=1"}

But if you want to set the background to transparent black when zoomed in, like on my blog, use the code below.

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

## Creating a Vue Composable

Actually, even if you finish it like this, you'll probably use it well. However, for those using Vue3, I'll throw in a composable.

I named it useClickToZoomImage because I want it to be applied automatically when called.

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

After doing this, call the composible in the .vue file.

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
