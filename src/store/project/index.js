import * as fb from 'firebase'

export default {
  state: {
    project: '', // selected
    projects: ''
  },
  mutations: {
    setProject (state, payload) {
      state.project = payload
    },
    setProjects (state, payload) {
      state.projects = payload
    }
  },
  actions: {
    fetchProjects ({commit, dispatch}, payload) {
      return fb.firestore().collection('projects').get()
        .then(snap => {
          let projects = {}
          snap.docs.forEach(doc => {
            projects[doc.id] = doc.data()
            projects[doc.id].id = doc.id
          })
          commit('setProjects', projects)
        })
        .catch(err => dispatch('LOG', err))
    },
    addNewProject ({commit, dispatch}, payload) {
      return fb.firestore().collection('projects').add(payload)
        .then(docRef => {
          payload.id = docRef.id
          commit('setProject', {...payload})
        })
        .catch(err => dispatch('LOG', err))
    },
    setProject ({commit, getters}, payload) {
      commit('setProject', getters.projects[payload])
    }
  },
  getters: {
    project: state => state.project,
    projects: state => state.projects
  }
}
