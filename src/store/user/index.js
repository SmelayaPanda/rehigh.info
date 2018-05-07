import * as firebase from 'firebase'
import router from '../../router'
// import {appConstants} from '@/mixins/constants'
import {Message, Notification} from 'element-ui'

export default {
  state: {
    user: ''
  },
  mutations: {
    setUser (state, payload) {
      console.log(payload)
      state.user = payload
    },
    setRole (state, payload) {
      state.isAdmin = payload
    }
  },
  actions: {
    fetchUserData ({commit, dispatch, getters}, payload) {
      commit('setUser', {...payload})
    },
    signUserUp ({commit, dispatch}, payload) {
      commit('ERR', '')
      commit('LOADING', true)
      return firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          firebase.auth().currentUser.sendEmailVerification()
          Notification({
            title: 'Поздравляем',
            message: 'Аккаунт был успешно создан!',
            type: 'success',
            showClose: true,
            duration: 10000,
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
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(payload.email, payload.password)
        .then(() => { // onAuthStateChanged works
          console.log('Successful Login')
          router.push('/account')
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },
    logout ({dispatch, commit}) {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', '')
          commit('ERR', '')
          router.push('/')
        })
        .catch(err => dispatch('LOG', err))
    },
    resetPassword ({commit, dispatch}, payload) {
      commit('ERR', '')
      firebase.auth().sendPasswordResetEmail(payload)
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
    }
  },
  getters: {
    user: state => state.user
  }
}
