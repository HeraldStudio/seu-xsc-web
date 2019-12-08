import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/date.js'
Vue.config.productionTip = false

window.__global__ = {
  store,
  router
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
