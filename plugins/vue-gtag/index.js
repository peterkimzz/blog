import Vue from 'vue'
import VueGtag from 'vue-gtag'

const isProd = process.env.NODE_ENV === 'production'

Vue.use(VueGtag, {
  config: { id: 'G-E7PSWP6P7T' },
  enabled: isProd ? true : false
})