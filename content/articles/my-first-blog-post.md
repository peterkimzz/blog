---
category: tech
title: First article
description: Learning how to use @nuxt/content to create a blog
thumbnail: https://images.unsplash.com/photo-1607623427917-fecea7c7959e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1258&q=80
author:
  name: Benjamin
  bio: All about Benjamin
  image: https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max
---

Learn how to use @nuxt/content.
<!--more-->
Full amount of content beyond the more divider.

## This is a heading

Lorem ipsum, dolor sit amet consectetur adipisicing elit. In veniam dignissimos ipsum modi, tenetur eveniet nobis, natus perferendis accusantium repellat voluptates temporibus dolore blanditiis corrupti voluptatem esse quam excepturi qui?

### This is a sub heading

This is some more info

### This is another sub heading

This is some more info

## This is another heading

This is some more info

> This is highlighted text box qwfmq wfoqi wfoiqm fiq wofqm oi
qowi fqiwfoqwmfoqimwfoqimwoqwif 

```js{0,0}[server.js]
const http = require('http')
const bodyParser = require('body-parser')

http.createServer((req, res) => {
  bodyParser.parse(req, (error, body) => {
    res.end(body)
  })
}).listen(3000)
```