---
category: tech
title: Fourth article aosif qwfoqiwmf oq fqowifmq owi qwpfomoqiw foqw foqiwmfo iqmw ofimqwoi 
description: Learning how to use @nuxt/content to create a blog
thumbnail: https://images.unsplash.com/photo-1607615859113-444d01cdd09e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80
author:
  name: Benjamin
  bio: All about Benjamin
  image: https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max
---

작년 말에 이직했으니 이제 곧 입사한지 1년이 다 되어간다. 

근데 체감상 나에게 올 한 해는 **"나 뭐 했지"** 인 것 같다.

분명 기술적으로는 굉장히 많은 성장을 한 것 같다.

## This is a heading

Lorem ipsum, dolor sit amet consectetur adipisicing elit. In veniam dignissimos ipsum modi, tenetur eveniet nobis, natus perferendis accusantium repellat voluptates temporibus dolore blanditiis corrupti voluptatem esse quam excepturi qui?

### This is a sub heading

This is some more info

### This is another sub heading

This is some more info

## This is another heading

This is some more info


```js{1,4}[server.js]
const http = require('http')
const bodyParser = require('body-parser')

http.createServer((req, res) => {
  bodyParser.parse(req, (error, body) => {
    res.end(body)
  })
}).listen(3000)
```