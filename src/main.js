import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'
import router from './config/router'
import store from './config/store'
import VueFire from 'vuefire'

import './config/bootstrap'
import './config/msgs'
import { VueMaskDirective } from 'v-mask'

Vue.directive('mask', VueMaskDirective);

Vue.config.productionTip = false

Vue.use(VueFire)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
