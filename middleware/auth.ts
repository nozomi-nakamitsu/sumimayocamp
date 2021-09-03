import { Context } from '@nuxt/types'
import firebase from '@/plugins/firebase'
export default function ({ route, store, redirect }: Context) {
  return new Promise<void>((resolve) => {
    firebase.auth().onAuthStateChanged((user: any) => {
      console.log('user', user)
      if (user) {
        // ログイン中の場合の処理
        store.commit('setIsLogined', true)
        store.commit('setCurrentUser', {
          token: user.refreshToken,
          uid: user.uid,
          photoURL: user.photoURL,
          displayName: user.displayName,
          nickName: user.displayName,
        })
        if (route.name === 'login') {
          redirect('/')
        }
      } else if (!user && route.name !== 'login') {
        redirect('/login')
      }
      resolve()
    })
  })
}

