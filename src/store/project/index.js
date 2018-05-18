import * as fb from 'firebase'

export default {
  state: {
    project: '', // selected - PROJECT
    projects: '' // all - PROJECTS
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
      commit('LOADING', true)
      return fb.firestore().collection('projects').get()
        .then(snap => {
          let projects = {}
          snap.docs.forEach(doc => {
            projects[doc.id] = doc.data()
            projects[doc.id].id = doc.id
          })
          commit('setProjects', projects)
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },
    addNewProject ({commit, dispatch}, payload) {
      commit('LOADING', true)
      return fb.firestore().collection('projects').add(payload)
        .then(docRef => {
          payload.id = docRef.id
          commit('setProject', {...payload})
          console.log('Project added')
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },
    updateProject ({commit, dispatch, getters}, payload) {
      commit('LOADING', true)
      return fb.firestore().collection('projects').doc(payload.id).update(payload.updateData)
        .then(() => {
          let project = getters.projects[payload.id]
          commit('setProject', Object.assign(project, payload.updateData))
          console.log('Project updated')
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },
    setProject ({commit, dispatch, getters}, payload) {
      commit('setProject', getters.projects[payload])
      dispatch('fetchProjectNotifications', payload)
    }
  },
  getters: {
    project: state => state.project,
    projects: state => state.projects
  }
}
