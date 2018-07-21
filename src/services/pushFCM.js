import firebase from 'firebase'

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
                // TODO: save currentToken to db user collection -> fcmToken field
                // console.log(firebase.auth().currentUser.uid)
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
