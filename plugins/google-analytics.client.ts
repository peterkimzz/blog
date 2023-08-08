import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.env.NODE_ENV === 'production') {
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: 'G-E7PSWP6P7T',
      },
    })
  }
})
