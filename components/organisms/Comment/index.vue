<template>
  <div>
    <script
      type="application/javascript"
      src="https://utteranc.es/client.js"
      repo="peterkimzz/blog"
      issue-term="title"
      theme="github-light"
      crossorigin="anonymous"
      async
    ></script>
  </div>
</template>

<script>
export default {
  methods: {
    InsertScript() {
      const script = document.createElement('script')

      script['type'] = 'application/javascript'
      script['src'] = 'https://utteranc.es/client.js'
      script['crossOrigin'] = 'anonymous'
      script['async'] = true

      script.setAttribute('repo', 'peterkimzz/blog')
      script.setAttribute('issue-term', 'title')
      script.setAttribute('theme', 'github-light')

      this.$el.appendChild(script)
    }
  }
}
</script>