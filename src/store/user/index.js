import * as fb from 'firebase'
import router from '../../router'
import axios from 'axios'
import {Message, Notification} from 'element-ui'

export default {
  state: {
    user: '',
    role: 'guest',
    lang: 'ru'
    // all user roles added through db
    // user.roles: [ developer, admin, client, guest ]
    // role: only one selected in app
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setRole (state, payload) {
      state.role = payload
    },
    setLang (state, payload) {
      state.lang = payload
    }
  },
  actions: {
    fetchUserData ({commit, dispatch, getters}, payload) {
      let user = {...payload}
      return fb.firestore().collection('users').doc(payload.uid).get()
        .then(snap => {
          commit('setUser', Object.assign(user, snap.data()))
          commit('setLang', snap.data().lang ? snap.data().lang : 'ru')
          commit('setTimer', snap.data().timer)
          dispatch('setInitialRole', snap.data().roles)
          router.push('/')
        })
    },
    setRole ({commit, getters}, payload) {
      commit('setRole', payload)
    },
    setLang ({commit, dispatch, getters}, payload) {
      commit('setLang', payload)
      return fb.firestore().collection('users').doc(getters.user.uid).update({lang: payload})
        .then(() => {
          console.log('Lang saved')
        })
        .catch(err => dispatch('LOG', err))
    },
    setInitialRole ({commit}, payload) {
      if (payload.indexOf('admin') !== -1) {
        commit('setRole', 'admin')
      } else if (payload.indexOf('client') !== -1) {
        commit('setRole', 'client')
      }
    },
    signUserUp ({commit, dispatch, getters}, payload) {
      commit('ERR', '')
      commit('LOADING', true)
      return fb.auth().createUserAndRetrieveDataWithEmailAndPassword(payload.email, payload.password)
        .then((snap) => {
          return fb.firestore().collection('users').doc(snap.user.uid).set({
            uid: snap.user.uid,
            firstname: payload.firstname,
            lastname: payload.lastname,
            nickname: payload.nickname,
            email: snap.user.email,
            timer: {task: 1, from: 1, to: 1},
            sound: {name: '', frequency: 1000, volume: 0.7},
            lang: 'ru',
            roles: ['guest'],
            created: new Date().getTime()
          })
        })
        .then(() => {
          return fb.auth().currentUser.sendEmailVerification()
        })
        .then(() => {
          Notification({
            title: 'Поздравляем',
            message: 'Аккаунт был успешно создан! Проверьте вашу почту для верификации.',
            type: 'success',
            showClose: true,
            duration: 30000,
            offset: 50
          })
          router.push('/account')
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },
    signUserIn ({commit, dispatch}, payload) {
      commit('ERR', '')
      commit('LOADING', true)
      fb.auth().signInAndRetrieveDataWithEmailAndPassword(payload.email, payload.password)
        .then(() => { // onAuthStateChanged works
          console.log('Successful Login')
          router.push('/account')
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },
    logout ({dispatch, commit}) {
      fb.auth().signOut()
        .then(() => {
          commit('setUser', '')
          commit('ERR', '')
          router.push('/')
        })
        .catch(err => dispatch('LOG', err))
    },
    resetPassword ({commit, dispatch}, payload) {
      commit('ERR', '')
      fb.auth().sendPasswordResetEmail(payload)
        .then(function () {
          Notification({
            title: 'Внимание',
            message: `На почту ${payload} отправлено письмо для восстановления пароля!`,
            type: 'info',
            showClose: true,
            duration: 20000,
            offset: 50
          })
        })
        .catch(function (err) {
          let errorCode = err.code
          let errorMessage = err.message
          if (errorCode === 'auth/invalid-email') {
            Message({
              type: 'error',
              showClose: true,
              message: errorMessage,
              duration: 10000
            })
          } else if (errorCode === 'auth/user-not-found') {
            Message({
              type: 'error',
              showClose: true,
              message: errorMessage,
              duration: 10000
            })
          }
          dispatch('LOG', err)
        })
    },
    saveNotificationSound ({commit, dispatch, getters}, payload) {
      commit('LOADING', true)
      return fb.firestore().collection('users').doc(getters.user.uid).update({sound: payload})
        .then(() => {
          let user = getters.user
          user.sound = payload
          commit('setUser', {...user})
          commit('LOADING', false)
          console.log('Sound saved')
        })
        .catch(err => dispatch('LOG', err))
    },
    updateFcmToken ({commit, dispatch, getters}, payload) {
      commit('LOADING', true)
      return fb.firestore().collection('users').doc(getters.user.uid).update({'fcm.token': payload})
        .then(() => {
          let user = getters.user
          user.fcm = []
          user.fcm.token = payload
          commit('setUser', {...user})
          console.log('FCM: token updated')
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },
    updateFcmTopic ({commit, dispatch, getters}, payload) {
      commit('LOADING', true)
      if (!getters.user.fcm && !getters.user.fcm.token) {
        commit('LOADING', false)
        return console.warn('User has blocked push notification')
      }
      let url
      if (process.env.NODE_ENV === 'production') {
        url = 'https://us-central1-rehigh-dev.cloudfunctions.net/updateFcmTopic'
      } else if (process.env.NODE_ENV === 'development') {
        url = 'https://us-central1-rehigh-info-dev.cloudfunctions.net/updateFcmTopic'
      }
      axios.post(url, {
        userId: getters.user.uid,
        token: getters.user.fcm.token,
        topic: payload.topic,
        subscribe: payload.subscribe // true = subscribe, false = unsubscribe
      })
        .then((data) => {
          console.log('FCM: response data', data)
          console.log('FCM: User subscribed to topic: ', payload.topic)
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },
    sendFcm ({commit, dispatch, getters}, payload) {
      if (!getters.user.fcm && !getters.user.fcm.token) {
        return console.warn('FCM: User has blocked push notification')
      }
      let url
      if (process.env.NODE_ENV === 'production') {
        url = 'https://us-central1-rehigh-dev.cloudfunctions.net/sendFcm'
      } else if (process.env.NODE_ENV === 'development') {
        url = 'https://us-central1-rehigh-info-dev.cloudfunctions.net/sendFcm'
      }
      axios.post(url, {
        token: getters.user.fcm.token,
        title: payload.title,
        body: payload.body
      })
        .then((data) => {
          console.log('FCM: Response data: ', data)
        })
        .catch(err => dispatch('LOG', err))
    }
  },
  getters: {
    user: state => state.user,
    role: state => state.role,
    lang: state => state.lang
  }
}
