---
title: My first Blog Post
description: Learning how to use @nuxt/content to create a blog
img: first-blog-post.jpg
alt: my first blog post
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

<div class="bg-blue-500 text-white p-4 mb-4">
  This is HTML inside markdown that has a class of note
</div>

```js{1,4}[server.js]
const http = require('http')
const bodyParser = require('body-parser')

http.createServer((req, res) => {
  bodyParser.parse(req, (error, body) => {
    res.end(body)
  })
}).listen(3000)
```