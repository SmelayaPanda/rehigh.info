import * as fb from 'firebase'

export default {
  state: {
    loading: false,
    error: null,
    events: [] // all project events
  },
  mutations: {
    LOADING (state, payload) {
      state.loading = payload
    },
    ERR (state, payload) {
      state.error = payload
    },
    EVENTS (state, payload) {
      state.events = payload
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
    },
    EVENT ({commit, dispatch, getters}, payload) {
      let newEvent = {
        msg: payload,
        userId: getters.user.uid,
        date: new Date().getTime()
      }
      fb.database().ref(`events/${getters.project.id}`).push(newEvent)
        .then((data) => {
          let events = getters.events ? getters.events : []
          events[data.key] = newEvent
          commit('EVENTS', events)
        })
        .catch(err => dispatch('LOG', err))
    }
  },
  getters: {
    loading: state => state.loading,
    error: state => state.error,
    events: state => state.events
  }
}
