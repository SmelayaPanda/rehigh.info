import * as fb from 'firebase'

export default {
  state: {
    project: '', // selected
    projects: '', // all
    tasks: '', // in selected project ( with taskStatus )
    taskStatus: 'created' // in selected project
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
    // TASK
    fetchTasks ({commit, dispatch, getters}) {
      commit('LOADING', true)
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
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },
    addNewTask ({commit, dispatch, getters}, payload) {
      commit('LOADING', true)
      let tasks = getters.tasks
      return fb.firestore().collection('tasks').add(payload)
        .then(docRef => {
          tasks[docRef.id] = payload
          tasks[docRef.id].id = docRef.id
          commit('setTasks', {...tasks})
          dispatch('EVENT', `Добавлена новая задача: ${payload.title}.`)
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },
    updateTask ({commit, dispatch, getters}, payload) {
      commit('LOADING', true)
      let tasks = getters.tasks
      return fb.firestore().collection('tasks').doc(payload.id).update(payload)
        .then(() => {
          if (payload.status) { // change status
            dispatch('EVENT', `Изменен статус задачи ${payload.id}: ${tasks[payload.id].title}`)
            delete tasks[payload.id]
          } else { // edit
            tasks[payload.id] = payload
          }
          commit('setTasks', {...tasks})
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },
    deleteTask  ({commit, dispatch, getters}, payload) {
      commit('LOADING', true)
      let tasks = getters.tasks
      return fb.firestore().collection('tasks').doc(payload).delete()
        .then(() => {
          delete tasks[payload]
          commit('setTasks', {...tasks})
          console.log('Task deleted')
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },
    setProject ({commit, dispatch, getters}, payload) {
      commit('setProject', getters.projects[payload])
      dispatch('fetchProjectNotifications', payload)
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
