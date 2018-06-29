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
        query = query.where('status', '==', payload.status)
      }
      if (payload.projectId) {
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
          if (!payload.hidden) {
            dispatch('EVENT', `Добавлена новая задача: ${payload.title}.`)
          }
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },
    updateTask ({commit, dispatch, getters}, payload) {
      commit('LOADING', true)
      let tasks = getters.tasks
      return fb.firestore().collection('tasks').doc(payload.id).update(payload.data)
        .then(() => {
          if (payload.isChangedPayment) {
            dispatch('calcFullProjectPayment')
          }
          if (payload.isStatusChange) {
            dispatch('EVENT', `Изменен статус задачи: "${tasks[payload.id].title}" (${payload.data.status})`)
            delete tasks[payload.id]
          } else { // edit
            tasks[payload.id] = payload.data
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
    async setTimer ({commit, getters, dispatch}, payload) {
      commit('LOADING', true)
      let now = new Date().getTime()
      let updateUserData
      let projects = getters.projects
      let tasks = getters.tasks
      let task = payload.isNewTask ? payload.task : getters.timer.task
      let actions = []
      if (payload.isTimerStart) { // START
        if (payload.isNewTask) {
          updateUserData = {'timer.task': task, 'timer.from': now, 'timer.to': 0}
        } else {
          updateUserData = {'timer.from': now, 'timer.to': 0}
        }
        await commit('setTimer', Object.assign({}, {task: task, from: now, to: 0}))
      } else if (payload.isTimerStop) { // STOP
        // console.log('1. stop timer')
        // UPDATE time.real of project and task
        let addTime = now - getters.timer.from
        // console.log('2. add time: ' + addTime)
        actions.push(fb.firestore().collection('tasks').doc(task.id).update({
          'time.real': task.time.real + addTime
        }))
        actions.push(fb.firestore().collection('projects').doc(task.projectId).update({
          'time.real': getters.projects[task.projectId].time.real + addTime
        }))
        actions.push(fb.firestore().collection('workHistory').add({
          projectId: task.projectId,
          taskId: task.id,
          userId: getters.user.uid,
          from: getters.timer.from,
          to: now
        }))
        updateUserData = {'timer.to': now}
        if (tasks[task.id]) { // in tasks view with this task
          tasks[task.id].time.real = tasks[task.id].time.real + addTime
          await commit('setTasks', {...tasks})
        }
        projects[task.projectId].time.real += addTime
        await commit('setProjects', {...projects})
        await commit('setTimer', Object.assign({}, {task: task, from: getters.timer.from, to: now}))
      }
      actions.push(fb.firestore().collection('users').doc(getters.user.uid).update(updateUserData))
      await Promise.all(actions)
        .then(() => {
          commit('LOADING', false)
        })
    },
    addHandleTimer () {}
  },
  getters: {
    tasks: state => state.tasks,
    taskStatus: state => state.taskStatus,
    timer: state => state.timer
  }
}
