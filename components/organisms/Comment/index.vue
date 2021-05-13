<template>
  <div id="comment"></div>
</template>

<script>
export default {
  // watch: {
  //   $route() {
  //     this.InsertScript()
  //   },
  // },
  methods: {
    InsertScript() {
      const script = document.createElement('script')

      script.setAttribute('src', 'https://utteranc.es/client.js')
      script.setAttribute('repo', 'peterkimzz/blog')
      script.setAttribute('issue-term', 'pathname')
      script.setAttribute('label', 'Comment')
      script.setAttribute('theme', 'github-dark')
      script.setAttribute('crossorigin', 'anonymous')
      script.setAttribute('async', 'async')

      this.$el.append(script)

      // const $comment = document.getElementById('comment')
      // $comment.appendChild(script)
    },
  },
  mounted() {
    this.InsertScript()
  },
}
</script>