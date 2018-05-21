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
    },
    calcFullProjectPayment ({commit, dispatch, getters}) {
      commit('LOADING', true)
      if (!getters.project) return
      let projects = getters.projects
      let projectPayment = 0
      fb.firestore().collection('tasks')
        .where('projectId', '==', getters.project.id)
        .where('payment.amount', '>', 0)
        .get()
        .then(snap => {
          snap.docs.forEach(doc => {
            projectPayment += doc.data().payment.amount
          })
          return fb.firestore().collection('projects').doc(getters.project.id).update({
            'payment.amount': projectPayment
          })
        })
        .then(() => {
          console.log('Project payment recalculated')
          projects[getters.project.id].payment.amount = projectPayment
          commit('setProjects', {...projects})
          commit('LOADING', false)
        })
    }
  },
  getters: {
    project: state => state.project,
    projects: state => state.projects
  }
}
