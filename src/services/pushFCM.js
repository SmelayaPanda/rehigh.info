import firebase from 'firebase'
import {store} from './../store'

export default function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./static/firebase-messaging-sw.js')
      .then(registration => {
        const messaging = firebase.messaging()

        // if user on the page you can do with payload something else
        messaging.onMessage(payload => {
          console.log(payload)
        })

        let getToken = () => {
          messaging.getToken()
            .then(currentToken => {
              if (currentToken) {
                console.log('Notification permission granted. Current token:')
                console.log(currentToken)
                if (store.getters.user && store.getters.user.fcm && store.getters.user.fcm.token) {
                  console.log('FCM: Token already stored')
                } else {
                  store.dispatch('updateFcmToken', currentToken)
                }
                return currentToken
              } else {
                console.log('No Instance ID token available. Request permission to generate one.')
              }
            })
            .catch(err => {
              console.log('Unable to get permission to notify.', err)
            })
        }

        messaging.useServiceWorker(registration)

        messaging.requestPermission()
          .then(() => {
            getToken()
          })
      })
      .catch(err => console.warn(err))
  }
}
