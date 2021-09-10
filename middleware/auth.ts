import { Context } from '@nuxt/types'
import firebase from '@/plugins/firebase'
export default function ({ route, store, redirect }: Context) {
  return new Promise<void>((resolve) => {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        // ログイン中の場合の処理
        store.commit('setIsLogined', true)
        // store.commit('setCurrentUser', {
        //   token: user.refreshToken,
        //   uid: user.uid,
        //   photoURL: user.photoURL,
        //   displayName: user.displayName,
        //   nickName: user.displayName,
        //   fcmToken: user.fcmToken,
        // })
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
