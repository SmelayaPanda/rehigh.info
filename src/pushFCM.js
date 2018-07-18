import firebase from 'firebase'

export default function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./static/firebase-messaging-sw.js')
      .then(registration => {
        const messaging = firebase.messaging()

        let getToken = () => {
          messaging.getToken()
            .then(currentToken => {
              if (currentToken) {
                console.log('Notification permission granted. Current token:')
                console.log(currentToken)
                return currentToken
              } else {
                console.log('No Instance ID token available. Request permission to generate one.')
              }
            })
            .catch(err => {
              console.log('Unable to get permission to notify.', err)
            })
        }

        // messaging.usePublicVapidKey('BCqvr6Krb0q8kpyHuVPrhmk3UOycdQqeS1vVvN6iRA6mbIkTlW0kmj0eYdeYtvDJ7eV--xWVQ5ProTDGgjefVFo')
        messaging.useServiceWorker(registration)

        messaging.requestPermission()
          .then(() => {
            getToken()
          })

        messaging.onMessage(payload => {
          console.log(payload)
        })
      })
      .catch(err => console.warn(err))
  }
}
