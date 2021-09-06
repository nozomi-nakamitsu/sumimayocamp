const functions = require('firebase-functions')
// cloud functionでfirestoreを使うのに必要な設定は以下の２行
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// データベースの参照を作成
const firestore = admin.firestore()

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send('Hello from firebase functions')
})

// exports.helloWorld = functions.https.onRequest((req, res) => {
//   firestore.document('posts/marie').onWrite((change, context) => {
//     res.send('aaaa')
//     console.log('aaaaa')
//   })
// })
exports.myFunction = functions.firestore
  .document('posts/{content}')
  .onWrite((change, context) => {
    console.log('aaaaa')
  })
