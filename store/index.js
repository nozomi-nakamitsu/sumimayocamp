import firebase from '~/plugins/firebase.js'
import { firestore, storage } from '~/plugins/firebase.js'
import 'firebase/storage'
const storageRef = storage.ref()
export const state = () => ({
  isLogined: false,
  currentUser: {
    token: '',
    uid: '',
    photoURL: '',
    displayName: '',
  },
})

export const mutations = {
  setIsLogined(state, isLogined) {
    state.isLogined = isLogined
  },
  setCurrentUser(state, data) {
    state.currentUser.uid = data.uid
    state.currentUser.token = data.token
    state.currentUser.photoURL = data.photoURL
    state.currentUser.displayName = data.displayName
  },
}

export const actions = {
  // ② Google認証
  auth({ commit, dispatch }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const user = result.user
        commit('setIsLogined', true)
        // 認証後のユーザー情報を取得してオブジェクト化
        let userObject = {}
        userObject.token = result.credential.accessToken
        userObject.refreshToken = user.refreshToken
        userObject.uid = user.uid
        userObject.displayName = user.displayName
        userObject.photoURL = user.photoURL
        userObject.uid = user.uid
        userObject.email = user.email
        userObject.isNewUser = result.additionalUserInfo.isNewUser
        userObject.providerId = result.additionalUserInfo.providerId
        dispatch('createPhotoURL', userObject)
        dispatch('setPublicUserData', userObject)
        dispatch('setLocalUserData', userObject)
      })
      .catch(function (error) {
        var errorCode = error.code
        console.error('error : ' + errorCode)
        console.error('errorMessage : ' + error)
      })
  },
  // エラーの時
  onRejectted(error) {
    console.error('エラーです', error)
  },
  // ① 認証状態を明示的にセットする
  setPersistence() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then((result) => {
          resolve()
        })
    })
  },
  // ④ 公開可能なユーザー情報をFirestoreに登録
  setPublicUserData({ dispatch }, userObject) {
    return new Promise((resolve, reject) => {
      let publicUser = firestore.collection('users').doc(userObject.uid)
      // ** usersに登録するObjのみを登録する
      let publicObj = {}
      publicObj.uid = userObject.uid
      publicObj.providerId = userObject.providerId
      publicObj.isNewUser = userObject.isNewUser
      publicObj.photoURL = userObject.photoURL
      publicObj.displayName = userObject.displayName
      publicObj.token = userObject.token
      publicUser.set(publicObj, { merge: true }).then((result) => {
        resolve(userObject)
      })
    })
  },
  // ⑤非公開のユーザー情報をFirestoreに登録
  setPrivateUserData({ dispatch }, userObject) {
    return new Promise((resolve, reject) => {
      let privateUsers = firestore
        .collection('privateUsers')
        .doc(userObject.uid)
      // privateUsersに登録するObjのみを登録する
      let privateObj = {}
      privateObj.uid = userObject.uid
      privateObj.providerId = userObject.providerId
      privateObj.isNewUser = userObject.isNewUser
      privateObj.email = userObject.email
      privateObj.token = userObject.token
      privateObj.refreshToken = userObject.refreshToken
      privateUsers.set(privateObj, { merge: true }).then((result) => {
        resolve(userObject)
      })
    })
  },
  // ⑥ ローカルストレージに保持するユーザー情報を設定
  setLocalUserData({ dispatch, commit }, userObject) {
    return new Promise(async (resolve, reject) => {
      let user = firestore.collection('users').doc(userObject.uid)
      user
        .get()
        .then((doc) => {
          if (doc.exists) {
            commit('setCurrentUser', doc.data())
            console.log(`ログインに成功しました`)
            // location.reload()
            location.href = '/'
            resolve(userObject)
          }
        })
        .catch((error) => {
          console.error(
            'ログインに失敗しました。Error getting document:',
            error
          )
        })
    })
  },
  // ③ 取得したアイコンのURLをFirestorageに保存して、そのURLをFirestoreに登録する準備
  createPhotoURL({ dispatch }, userObject) {
    return new Promise((resolve, reject) => {
      let url = userObject.photoURL
      let xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.onload = function (event) {
        let blob = xhr.response
        let mountainsRef = storageRef.child(`user/${userObject.uid}/image.jpg`)
        let uploadTask = mountainsRef.put(blob)
        uploadTask.then((snapshot) => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            // firestorageに登録したURLを登録するオブジェクトに代入
            userObject.photoURL = downloadURL
            resolve(userObject)
          })
        })
      }
      // メッセージを受け取った後に返信する
      xhr.open('GET', url)
      xhr.send()
    })
  },
  logout({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit('setCurrentUser', {})
        commit('setIsLogined', false)
        location.href = '/login'
      })
  },
}

export const getters = {
  getIsLogined(state) {
    return state.isLogined
  },
  getCurrentUser(state) {
    return state.currentUser
  },
}
