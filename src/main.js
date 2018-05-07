// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from './router'
import {store} from './store'
import {sync} from 'vuex-router-sync'
import vueScrollBehavior from 'vue-scroll-behavior'
import * as firebase from 'firebase'
import {config} from './config/index'
// MIXINS
import {authMixin} from './mixins/auth'
import {appConstants} from './mixins/constants'
import {isLoading} from './mixins/loading'
import {appError} from './mixins/error'
// DIRECTIVES
import {clickOutside} from './directives/click_outside'
// UI
import './styles/global.scss'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// FILTERS
import DateFilter from '@/filters/date'
// for router in store
const unsync = sync(store, router)
unsync()

Vue.mixin(appConstants)
Vue.mixin(authMixin)
Vue.mixin(isLoading)
Vue.mixin(appError)
Vue.filter('date', DateFilter)
Vue.use(vueScrollBehavior, {
  router: router, // The router instance
  maxLength: 100, // Saved history List max length
  ignore: [], // RegExp - ignore some routes, they will directly scroll to the top
  delay: 0 // Delay by a number of milliseconds
})
Vue.use(ElementUI, {locale})
Vue.use(Vuetify, config.vuetifyTheme)
Vue.directive('click-outside', clickOutside)
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  created: function () {
    firebase.initializeApp(config.firebase(process.env.NODE_ENV))
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('fetchUserData', user)
      } else {
        router.push('/signin')
      }
    })
  }
})
