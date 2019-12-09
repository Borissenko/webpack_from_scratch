// JS - ./js/index.js
import './js/'

// SCSS
import './assets/scss/main.scss'

// CSS (example)
import './assets/css/main.css'

// Bootstrap (example)
// import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

// Vue.js
window.Vue = require('vue')
//по-уму здесь надо писать require('vue/dist/vue.js')
//но мы прописали alias в webpack.base.conf.js

import store from './store'

// Vue components (for use in html)
Vue.component('example-component', require('./components/Example.vue').default)

// Vue init
const app = new Vue({
  data () {
    return {
      showExampleComponent: false,
    }
  },
  store,
  el: '#app'
})
