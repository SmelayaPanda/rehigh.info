import * as fb from 'firebase'

export default {
  state: {
    tasks: '', // in selected project ( with taskStatus )
    taskStatus: 'created', // in selected project
    taskTimer: { // USER task in work process (only one)
      id: '',
      from: ''
    },
    taskInProcess: '' // taskTimer.id full task object
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
    },
    taskInProcess (state, payload) {
      state.taskInProcess = payload
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
    setTaskInProcess ({commit, getters, dispatch}, payload) {
      if (payload.obj) {
        return commit('taskInProcess', payload.obj)
      } else if (payload.id) {
        return fb.firestore().collection('tasks').doc(payload.id).get().then(doc => {
          commit('taskInProcess', Object.assign({id: payload.id}, doc.data()))
        })
      }
    },
    updateUserTaskTimer ({commit, getters}) {
      return fb.firestore().collection('users').doc(getters.user.uid).update({taskTimer: getters.taskTimer})
    },
    startTaskTimer ({commit, getters, dispatch}, payload) {
      commit('LOADING', true)
      dispatch('stopTaskTimer')
        .then(() => {
          commit('setTaskTimer', payload)
          return dispatch('updateUserTaskTimer')
        })
        .then(() => {
          let data
          if (getters.tasks[payload.id]) { // user can quick switch view
            data = {obj: getters.tasks[payload.id]} // already loaded
          } else { // load from db
            data = {id: payload.id}
          }
          return dispatch('setTaskInProcess', data)
        })
        .then(() => {
          commit('LOADING', false)
        })
    },
    stopTaskTimer ({commit, getters, dispatch}) {
      if (!getters.taskTimer.id) return
      commit('LOADING', true)
      let taskRef = fb.firestore().collection('tasks').doc(getters.taskTimer.id)
      return taskRef.get()
        .then((snap) => {
          let newRealTime = snap.data().time.real + (new Date().getTime() - getters.taskTimer.from)
          let tasks = getters.tasks
          if (tasks[getters.taskTimer.id]) { // user found in task view
            tasks[getters.taskTimer.id].time.real = newRealTime
            commit('setTasks', {...tasks})
          }
          return taskRef.update({'time.real': newRealTime})
        })
        .then(() => {
          commit('setTaskTimer', {id: '', from: ''})
          commit('taskInProcess', '')
          return dispatch('updateUserTaskTimer')
        })
        .then(() => {
          commit('LOADING', false)
        })
    }
  },
  getters: {
    tasks: state => state.tasks,
    taskStatus: state => state.taskStatus,
    taskTimer: state => state.taskTimer,
    taskInProcess: state => state.taskInProcess
  }
}
