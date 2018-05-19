import * as fb from 'firebase'

export default {
  state: {
    tasks: '', // in selected project ( with taskStatus )
    taskStatus: 'created',
    timer: '', // currents user's task in work process
    //  task: {}, // full obj! (simplify logic - fetch by id is redundant)
    //  from: '',
    //  to: ''
    workHistory: '' // full work history (firestore)
    // id: {
    //    projectId: '',
    //    taskId: '',
    //    userId: '',
    //    from: '',
    //    to: ''
    // }
  },
  mutations: {
    setTasks (state, payload) {
      state.tasks = payload
    },
    setTaskStatus (state, payload) {
      state.taskStatus = payload
    },
    setTimer (state, payload) {
      state.timer = payload
    },
    setWorkHistory (state, payload) {
      state.workHistory = payload
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
    setTimer ({commit, getters, dispatch}, payload) {
      commit('LOADING', true)
      let data
      if (payload.isTimerStart) {
        if (payload.isNewTask) {
          data = {'timer.task': payload.task, 'timer.from': new Date().getTime(), 'timer.to': 0}
          commit('setTimer', {task: payload.task, from: new Date().getTime(), to: 0})
        } else {
          data = {'timer.from': new Date().getTime(), 'timer.to': 0}
          commit('setTimer', {task: getters.timer.task, from: new Date().getTime(), to: 0})
        }
      } else if (payload.isTimerStop) {
        data = {'timer.to': new Date().getTime()}
        commit('setTimer', {
          task: getters.timer.task,
          from: 0,
          to: new Date().getTime()
        })
      }
      return fb.firestore().collection('users').doc(getters.user.uid).update(data)
        .then(() => {
          commit('LOADING', false)
        })
    }
  },
  getters: {
    tasks: state => state.tasks,
    taskStatus: state => state.taskStatus,
    timer: state => state.timer
  }
}
