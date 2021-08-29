import { Middleware } from '@nuxt/types'
import firebase, { firestore } from '@/plugins/firebase'
const middleware: Middleware = ({ route, store, redirect }) => {
  store.commit('setIsLoading', true)
  console.log('store.getters.getIsLoading', store.getters.getIsLoading)
  firebase.auth().onAuthStateChanged((user: any) => {
    if (user) {
      // ログイン中の場合の処理
      store.commit('setIsLogined', true)
      firestore
        .collection('users')
        .doc(user.uid)
        .get()
        .then((doc) => {
          store.commit('setCurrentUser', doc.data())
          if (route.name === 'login') {
            // return redirect('/')
            window.location.href = '/'
            return new Promise((resolve) => {
              // Wait for broswer to redirect...
            })
          }
        })
    } else if (!user && route.name !== 'login') {
      return redirect('/login')
    }
  })
  store.commit('setIsLoading', false)
  console.log('store.getters.getIsLoading2', store.getters.getIsLoading)
}
export default middleware
