import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: { id: 'G-E7PSWP6P7T' },
  enabled: process.env.NODE_ENV === 'production'
})
