const { resolve } = require('path')

module.exports = {
  head: {
    titleTemplate: `tamate - Dashboard`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: `tamate` },
    ],
    link: [

    ],
  },
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  plugins: [ '~plugins/element-ui', { src: '~plugins/element-ui', ssr: false } ],
  loading: { color: '#3B8070' },
  build: {
    vendor: [ 'axios', 'element-ui' ]
  },
  generate: {
    dir: resolve(__dirname, './dist'),
  },
  router: {
    base: process.env.NODE_ENV === 'dev' ? '/' : '/',
  }
}