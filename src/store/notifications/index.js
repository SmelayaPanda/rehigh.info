
import * as fb from 'firebase'

export default {
  state: {
    notifications: [] // in selected project
  },
  mutations: {
    setNotifications (state, payload) {
      state.notifications = payload
    }
  },
  actions: {
    fetchProjectNotifications ({commit, getters}, payload) { // TODO: paginate
      fb.database().ref(`events/${payload}`)
        .once('value')
        .then(snap => {
          if (snap.exists()) {
            commit('setNotifications', Object.values(snap.val()))
          } else {
            commit('setNotifications', '')
          }
        })
    }
  },
  getters: {
    notifications: state => state.notifications
  }
}
