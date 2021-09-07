const functions = require('firebase-functions')
// cloud functionでfirestoreを使うのに必要な設定は以下の２行

var admin = require('firebase-admin')

var serviceAccount = require('/Users/nakamitsunozomi/Downloads/sumimayocamp-firebase-adminsdk-o4heo-cc62777183.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
// データベースの参照を作成
const firestore = admin.firestore()

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send('Hello from firebase functions')
})
// 例
exports.myFunction = functions.firestore
  .document('posts/{content}')
  .onWrite((change, context) => {
    console.log('myFunction')
    functions.logger.log('myFunction')
  })

exports.sendPushMessage = functions.firestore
  .document('posts/{id}/messages/{text}')
  .onWrite(async (change, context) => {
    const data = change.after.data()
    functions.logger.log('data', data)
    const previousData = change.before.data()
    console.log('data', data)
    // // uidから通知先のユーザー情報を取得
    const userRef = await admin.firestore().collection('users').doc(data.uid)
    const userDoc = await userRef.get()
    functions.logger.log('userDoc', userDoc)
    if (userDoc.exists) {
      const user = userDoc.data()
      functions.logger.log('user', user)
      // 通知のタイトルと本文を設定
      const payload = {
        notification: {
          title: `${user.nickName}さんへ`,
          body: '通知です',
        },
      }

      /// プッシュ通知を送信
      if (user.fcmToken) {
        try {
          admin.messaging().sendToDevice(user.fcmToken, payload)
          functions.logger.log('ok')
          console.log('ok')
        } catch (error) {
          console.error(error)
          functions.logger.log(error)
        }
      } else {
        console.error('No Firebase Cloud Messaging Token.')
        functions.logger.log('No Firebase Cloud Messaging Token.')
      }
    } else {
      console.error('No User.')
      functions.logger.log('No User.')
    }

    return true
  })
