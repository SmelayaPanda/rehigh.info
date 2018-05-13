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
            console.log(Object.values(snap.val()))
            commit('setNotifications', Object.values(snap.val()))
          }
        })
    }
  },
  getters: {
    notifications: state => state.notifications
  }
}
