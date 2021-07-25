import firebase, { firestore, storage } from '~/plugins/firebase.js'

import 'firebase/storage'
const storageRef = storage.ref()
export const state = () => ({
  isLogined: false,
  currentUser: {
    token: '',
    uid: '',
    photoURL: '',
    displayName: '',
    nickName: '',
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
    state.currentUser.nickName = data.nickName
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
        const userObject = {}
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
        const errorCode = error.code
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
    return new Promise((resolve) => {
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
    return new Promise((resolve) => {
      const publicUser = firestore.collection('users').doc(userObject.uid)
      // ** usersに登録するObjのみを登録する
      const publicObj = {}
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
    return new Promise((resolve) => {
      const privateUsers = firestore
        .collection('privateUsers')
        .doc(userObject.uid)
      // privateUsersに登録するObjのみを登録する
      const privateObj = {}
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
    return new Promise(async (resolve) => {
      const user = firestore.collection('users').doc(userObject.uid)
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
    return new Promise((resolve) => {
      const url = userObject.photoURL
      const xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.onload = function (event) {
        const blob = xhr.response
        const mountainsRef = storageRef.child(
          `user/${userObject.uid}/image.jpg`
        )
        const uploadTask = mountainsRef.put(blob)
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

  editNickName({ commit, state }, nickName) {
    try {
      console.log(state.currentUser)
      console.log('nickName', nickName)
      const publicUser = firestore
        .collection('users')
        .doc(state.currentUser.uid)
      // ** usersに登録するObjのみを登録する
      const publicObj = {}
      publicObj.nickName = nickName
      publicUser.set(publicObj, { merge: true }).then((result) => {
        commit('setCurrentUser', publicObj)
        location.href = '/'
      })
    } catch (error) {
      console.error(error)
    }
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
