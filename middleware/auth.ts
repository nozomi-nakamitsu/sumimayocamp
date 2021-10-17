import { Context } from '@nuxt/types'
import firebase, { firestore } from '@/plugins/firebase'
export default function ({ route, store, redirect }: Context) {
  return new Promise<void>((resolve) => {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        // ログイン中の場合の処理
        store.commit('setIsLogined', true)
        firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            console.log("middleware")
            store.commit('setCurrentUser', doc.data())
          })
        if (route.name === 'login___ja') {
          redirect('/')
        }
      } else if (!user && route.name !== 'login___ja') {
        redirect('/login')
      }
      resolve()
    })
  })
}
