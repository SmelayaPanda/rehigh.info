import * as fb from 'firebase'

export default {
  state: {
    tasks: '', // in selected project ( with taskStatus )
    taskStatus: 'created', // in selected project
    taskTimer: { // USER task in work process (only one)
      taskId: '',
      from: ''
    }
  },
  mutations: {
    setTasks (state, payload) {
      state.tasks = payload
    },
    setTaskStatus (state, payload) {
      state.taskStatus = payload
    },
    setTaskTimer (state, payload) {
      state.taskTimer = payload
    }
  },
  actions: {
    fetchTasks ({commit, dispatch, getters}, payload) {
      commit('LOADING', true)
      let query = fb.firestore().collection('tasks')
      if (payload.status) {
        commit('setTaskStatus', payload.status)
        console.log(payload.status)
        query = query.where('status', '==', payload.status)
      }
      if (payload.projectId) {
        console.log(payload.projectId)
        query = query.where('projectId', '==', payload.projectId)
      }
      if (payload.taskId) {
        query = query.where('taskId', '==', payload.taskId)
      }
      return query.get()
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
    deleteTask ({commit, dispatch, getters}, payload) {
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
    setTasks ({commit}, payload) {
      commit('setTasks', payload)
    },
    setTaskStatus ({commit, getters}, payload) {
      commit('setTaskStatus', payload)
    },
    startTaskTimer ({commit, getters}, payload) {
      commit('setTaskTimer', payload)
    }
  },
  getters: {
    tasks: state => state.tasks,
    taskStatus: state => state.taskStatus,
    taskTimer: state => state.taskTimer
  }
}
