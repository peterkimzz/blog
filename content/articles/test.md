---
category: tech
title: Introduction
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
