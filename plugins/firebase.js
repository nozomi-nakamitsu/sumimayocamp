import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/messaging'
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  })
}
const firebaseMessaging = firebase.messaging()
firebaseMessaging.usePublicVapidKey(
  'BB703smPTUG97wkNXwEqqNSxyuKEtXdO4JddpBeQfmEYpNIiaLuAzZdDqPr5qNQCGsLQmXyVarKRDTEUjUydmv0'
)

// Emulatorの有効化
// const isEmulating = window.location.hostname === 'localhost'
// if (isEmulating) {
//   // firebase.auth().useEmulator('http://localhost:9099')
//   firebase.functions().useEmulator('localhost', 5001)
//   firebase.firestore().useEmulator('localhost', 8080)
// }
export const messaging = firebaseMessaging
export default firebase
export const firestore = firebase.firestore()
export const storage = firebase.storage()

messaging.onMessage((payload) => {
  console.log('event: onMessage')
  console.log('    ', payload)
})

