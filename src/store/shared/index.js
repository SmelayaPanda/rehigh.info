// import * as firebase from 'firebase'

export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    LOADING (state, payload) {
      state.loading = payload
    },
    ERR (state, payload) {
      state.error = payload
    }
  },
  actions: {
    ERR ({commit}, payload) {
      commit('ERR', payload)
    },
    LOADING ({commit}, payload) {
      commit('LOADING', payload)
    },
    LOG ({commit}, payload) {
      console.log(payload)
      commit('ERR', payload)
      commit('LOADING', false)
      if (payload.code !== 'aborted') { // offline client
        // firebase.database().ref('errLog').push(payload.stack ? payload.stack : payload)
      }
    }
  },
  getters: {
    loading: state => state.loading,
    error: state => state.error
  }
}
