// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from './router'
import {store} from './store'
import {sync} from 'vuex-router-sync'
import vueScrollBehavior from 'vue-scroll-behavior'
import * as firebase from 'firebase'
import 'firebase/firestore'
import {config} from './config/index'
// MIXINS
import {computed} from './mixins/computed'
import {data} from './mixins/data'
// DIRECTIVES
import {clickOutside} from './directives/click_outside'
// UI
import './styles/global.scss'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// FILTERS
import DateFilter from '@/filters/date'
// for router in store
const unsync = sync(store, router)
unsync()

Vue.mixin(data)
Vue.mixin(computed)
Vue.filter('date', DateFilter)
Vue.use(vueScrollBehavior, {
  router: router, // The router instance
  maxLength: 100, // Saved history List max length
  ignore: [], // RegExp - ignore some routes, they will directly scroll to the top
  delay: 0 // Delay by a number of milliseconds
})
Vue.use(ElementUI, {locale})
Vue.use(Vuetify, config.vuetifyTheme)
Vue.use(VueQuillEditor /* { default global options } */)
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
  created () {
    firebase.initializeApp(config.firebase(process.env.NODE_ENV))
    firebase.firestore().settings({timestampsInSnapshots: true})
    // Vue.prototype
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('fetchUserData', user)
        this.$store.dispatch('fetchProjects')
      } else {
        router.push('/signin')
      }
    })
  }
})
