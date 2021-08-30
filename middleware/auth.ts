import { Context, Middleware } from '@nuxt/types'
import firebase, { firestore } from '@/plugins/firebase'
const middleware: Middleware = ({ route,store, redirect, } :Context) => {
  // store.commit('setIsLoading', true)
  // console.log('store.getters.getIsLoading', store.getters.getIsLoading)

  firebase.auth().onAuthStateChanged((user: any) => {
    console.log("user",user)
    if (user) {
      // ログイン中の場合の処理
      store.commit('setIsLogined', true)
      store.commit('setCurrentUser', {
        token: user.refreshToken,
        uid:user.uid,
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
  })


  // store.commit('setIsLoading', false)
  // console.log('store.getters.getIsLoading2', store.getters.getIsLoading)
}
export default middleware

