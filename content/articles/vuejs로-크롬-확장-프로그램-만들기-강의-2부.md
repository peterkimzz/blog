---
category: tech
title: Vue.js로 크롬 확장 프로그램 만들기 강의 - 2부
thumbnail: https://user-images.githubusercontent.com/20244536/112748762-fd580e80-8ff8-11eb-8fcb-a36b676c7c48.png
updated: 2021-04-30
created: 2021-04-30
is_published: false
---

Learn how to use @nuxt/content.

Full amount of content beyond the more divider.

<!--more-->

# Lorem ipsum

## dolor—sit—amet

### consectetur &amp; adipisicing

#### elit

##### elit

---

## title: Home

## Links

[Markdown Link to Blog](/)

[External Link markdown](https://nuxtjs.org)

```js{1,3-5}[server.js]
const http = require('http')
const bodyParser = require('body-parser')

http
  .createServer((req, res) => {
    bodyParser.parse(req, (error, body) => {
      res.end(body)
    })
  })
  .listen(3000)
```
