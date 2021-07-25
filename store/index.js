import firebase from '~/plugins/firebase.js'
import { firestore, storage } from '~/plugins/firebase.js'
import 'firebase/storage'
const storageRef = storage.ref()
// const db = firebase.firestore()
// const todoRef = db.collection('todos')
export const state = () => ({
  userUid: '',
  userName: '',
  isLogined: false,
  currentUser: {
    token: '',
    uid: '',
    photoURL: '',
    displayName: '',
  },
})

export const mutations = {
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  setIsLogined(state, isLogined) {
    state.isLogined = isLogined
  },
  setCurrentUser(state, data) {
    console.log('data', data)
    console.log('data.uid', data.uid)
    state.currentUser.uid = data.uid
    state.currentUser.token = data.token
    state.currentUser.photoURL = data.photoURL
    state.currentUser.displayName = data.displayName
    console.log('state.currentUser', state.currentUser)
    console.log('セットしました')
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
        console.log('success : ' + user.uid + ' : ' + user.displayName)
        commit('setUserUid', user.uid)
        commit('setUserName', user.displayName)
        commit('setIsLogined', true)
        console.log('auth完了')
        console.log('result', result)
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
        console.log('getAccountData', userObject)
        dispatch('createPhotoURL', userObject)
        dispatch('setPublicUserData', userObject)
        dispatch('setLocalUserData', userObject)
      })
      .catch(function (error) {
        var errorCode = error.code
        console.log('error : ' + errorCode)
        console.log('errorMessage : ' + error)
      })
  },
  // ③ 認証後のユーザー情報を取得してオブジェクト化
  // getAccountData(result) {
  //   console.log('result.credential', result.credential)
  //   debugger
  //   return new Promise((resolve, reject) => {
  //     let userObject = {}
  //     let user = result.user
  //     console.log('user', user)

  //     userObject.token = result.credential.accessToken
  //     userObject.refreshToken = user.refreshToken
  //     userObject.uid = user.uid
  //     userObject.displayName = user.displayName
  //     userObject.photoURL = user.photoURL
  //     userObject.uid = user.uid
  //     userObject.email = user.email
  //     userObject.isNewUser = result.additionalUserInfo.isNewUser
  //     userObject.providerId = result.additionalUserInfo.providerId
  //     resolve(userObject)
  //     console.log('getAccountData', userObject)
  //   })
  // },
  // エラーの時
  onRejectted(error) {
    console.log('エラーです', error)
  },
  // // 公開ユーザーのstoregeに保存するオブジェクト作成
  // createPublicObj(userObject) {
  //   console.log('obj', userObject)
  //   // let publicObj = {}
  //   // publicObj.uid = obj.uid
  //   // publicObj.providerId = obj.providerId
  //   // publicObj.isNewUser = obj.isNewUser
  //   // publicObj.photoURL = obj.photoURL
  //   // publicObj.displayName = obj.displayName
  //   // console.log('publicObj', publicObj)
  //   // return publicObj
  // },
  // 非公開ユーザーのstoregeに保存するオブジェクト作成
  // createPrivateObj(obj) {
  //   let privateObj = {}
  //   privateObj.uid = obj.uid
  //   privateObj.providerId = obj.providerId
  //   privateObj.isNewUser = obj.isNewUser
  //   privateObj.email = obj.email
  //   privateObj.token = obj.token
  //   privateObj.refreshToken = obj.refreshToken
  //   return privateObj
  // },
  // ① 認証状態を明示的にセットする
  setPersistence() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then((result) => {
          resolve()
        })
      console.log('setPersistence 完了')
    })
  },
  // ⑤ 公開可能なユーザー情報をFirestoreに登録
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
      console.log('publicObj', publicObj)
      publicUser.set(publicObj, { merge: true }).then((result) => {
        resolve(userObject)
      })
    })
  },
  // ⑥ 非公開のユーザー情報をFirestoreに登録
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
  // ⑦ ローカルストレージに保持するユーザー情報を設定
  setLocalUserData({ dispatch, commit }, userObject) {
    return new Promise(async (resolve, reject) => {
      console.log('userObject', userObject)
      let user = firestore.collection('users').doc(userObject.uid)
      user
        .get()
        .then((doc) => {
          console.log('doc', doc)
          if (doc.exists) {
            commit('setCurrentUser', doc.data())
            console.log(`ログインに成功しました`)
            // location.reload()
            location.href = '/'
            resolve(userObject)
          } else {
            console.log('ない')
          }
        })
        .catch((error) => {
          console.log('ログインに失敗しました。Error getting document:', error)
        })
    })
  },
  // ④ 取得したアイコンのURLをFirestorageに保存して、そのURLをFirestoreに登録する準備
  createPhotoURL({ dispatch }, userObject) {
    console.log('userObject', userObject)
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
            console.log(downloadURL)
            // firestorageに登録したURLを登録するオブジェクトに代入
            userObject.photoURL = downloadURL
            resolve(userObject)
          })
        })
      }
      // メッセージを受け取った後に返信する
      xhr.open('GET', url)
      xhr.send()
      console.log('createPhotoURL OK')
    })
  },
}

export const getters = {
  getUserUid(state) {
    return state.userUid
  },
  getUserName(state) {
    return state.userName
  },
  getIsLogined(state) {
    return state.isLogined
  },
  getCurrentUser(state) {
    return state.currentUser
  },
}
