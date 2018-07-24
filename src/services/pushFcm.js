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

        messaging.onTokenRefresh(function () {
          messaging.getToken().then(function (refreshedToken) {
            store.dispatch('updateFcmToken', refreshedToken)
          })
        })

        let getToken = () => {
          messaging.getToken()
            .then(currentToken => {
              if (currentToken) {
                console.log('FCM: Current token:', currentToken)
                console.log('FCM: User ID: ', store.getters.user.uid)
                if (currentToken && store.getters.user.fcm && store.getters.user.fcm.token) {
                  if (currentToken === store.getters.user.fcm.token) {
                    console.log('FCM: Token already stored')
                  } else { // token changed => unsubscribe prev token
                    store.dispatch('updateFcmTopic', {topic: 'workTime', subscribe: false})
                      .then(() => {
                        console.log('FCM: Previous token unsubscribed')
                      })
                  }
                } else {
                  store.dispatch('updateFcmToken', currentToken)
                    .then(() => {
                      store.dispatch('updateFcmTopic', {topic: 'workTime', subscribe: true})
                    })
                }
                return currentToken
              } else {
                console.log('FCM: No Instance ID token available. Request permission to generate one.')
              }
            })
            .catch(err => {
              console.log('FCM: Unable to get permission to notify.', err)
            })
        }

        messaging.useServiceWorker(registration)

        messaging.requestPermission()
          .then(() => {
            console.log('FCM: Notification permission granted.')
            getToken()
          })
      })
      .catch(err => console.warn(err))
  }
}
