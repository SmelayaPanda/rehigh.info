// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from './router'
import {store} from './store'
import {sync} from 'vuex-router-sync'
import vueScrollBehavior from 'vue-scroll-behavior'
// import * as firebase from 'firebase'
// UI
import './styles/global.scss'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// for router in store
const unsync = sync(store, router)
unsync()

Vue.use(vueScrollBehavior, {
  router: router, // The router instance
  maxLength: 100, // Saved history List max length
  ignore: [], // RegExp - ignore some routes, they will directly scroll to the top
  delay: 0 // Delay by a number of milliseconds
})
Vue.use(ElementUI, {locale})
Vue.use(Vuetify, { theme: {
  primary: '#039be5',
  secondary: '#262f3d',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#dddddd',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
