if (typeof importScripts === 'function') {
  importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js')
  importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js')

  // why double initialization?
  firebase.initializeApp({
    messagingSenderId: '182973070710'
  })

  const messaging = firebase.messaging()

  messaging.setBackgroundMessageHandler(function (payload) {
    const title = payload.title
    const options = {
      body: payload.body,
      icon: payload.icon
    }

    self.registration.showNotification(title, options)
  })
}
