/* eslint-disable no-undef */
if (typeof importScripts === 'function') {
  importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js')
  importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker scope by passing in the messagingSenderId
  firebase.initializeApp({
    messagingSenderId: '430080679681' // dev: 182973070710, prod: 430080679681
  })

  const messaging = firebase.messaging()

  messaging.setBackgroundMessageHandler(function (payload) {
    const title = payload.title // max - 30 symbols
    const options = {
      body: payload.body, // max - 120 symbols
      icon: payload.icon
    }

    self.registration.showNotification(title, options)
  })
}
