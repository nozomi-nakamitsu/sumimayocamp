// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
// firebase.initializeApp({
//   messagingSenderId: '241083348372',
// })

if (!firebase.apps.length) {
  firebase.initializeApp({
    // apiKey: process.env.API_KEY,
    // authDomain: process.env.AUTH_DOMAIN,
    // projectId: process.env.PROJECT_ID,
    // storageBucket: process.env.STORAGE_BUCKET,
    // messagingSenderId: process.env.MESSAGING_SENDER_ID,
    // appId: process.env.APP_ID,
    // measurementId: process.env.MEASUREMENT_ID,
    messagingSenderId: '241083348372',
  })
}

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

const messaging = firebase.messaging()

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload
//   )
//   // Customize notification here
//   const notificationTitle = 'Background Message Title'
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png',
//   }

//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   )
// })

// self.addEventListener('push', function (event) {
//   // メッセージを表示する
//   console.log(event)
//   var data = {}
//   if (event.data) {
//     data = event.data.json()
//   }
//   var title = data.notification.title || '無題'
//   var message = data.notification.body || 'メッセージが届いています。'
//   event.waitUntil(
//     self.registration.showNotification(title, {
//       body: message,
//     })
//   )
// })
