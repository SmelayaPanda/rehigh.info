import Vue from 'vue'
import Vuex from 'vuex'

import shared from './shared/index'
import user from './user/index'
import project from './project/index'
import dictionaries from './dictionaries/index'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user: user,
    shared: shared,
    project: project,
    dictionaries: dictionaries
  }
})
