import * as fb from 'firebase'

export default {
  state: {
    project: '', // selected
    projects: '',
    tasks: '',
    taskStatus: 'created'
  },
  mutations: {
    setProject (state, payload) {
      state.project = payload
    },
    setProjects (state, payload) {
      state.projects = payload
    },
    setTasks (state, payload) {
      state.tasks = payload
    },
    setTaskStatus (state, payload) {
      state.taskStatus = payload
    }
  },
  actions: {
    // PROJECT
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
          console.log('Project added')
        })
        .catch(err => dispatch('LOG', err))
    },
    // TASK
    fetchTasks ({commit, dispatch, getters}) {
      return fb.firestore().collection('tasks')
        .where('status', '==', getters.taskStatus)
        .where('projectId', '==', getters.project.id).get()
        .then(snap => {
          let tasks = {}
          snap.docs.forEach(doc => {
            tasks[doc.id] = doc.data()
            tasks[doc.id].id = doc.id
          })
          commit('setTasks', tasks)
          console.log('Fetched: tasks')
        })
        .catch(err => dispatch('LOG', err))
    },
    addNewTask ({commit, dispatch, getters}, payload) {
      let tasks = getters.tasks
      return fb.firestore().collection('tasks').add(payload)
        .then(docRef => {
          tasks[docRef.id] = payload
          tasks[docRef.id].id = docRef.id
          commit('setTasks', {...tasks})
          console.log('Task added')
        })
        .catch(err => dispatch('LOG', err))
    },
    setProject ({commit, getters}, payload) {
      commit('setProject', getters.projects[payload])
    },
    setTaskStatus ({commit, getters}, payload) {
      commit('setTaskStatus', payload)
    }
  },
  getters: {
    project: state => state.project,
    projects: state => state.projects,
    tasks: state => state.tasks,
    taskStatus: state => state.taskStatus
  }
}
