import firebase, { firestore, storage, messaging } from '~/plugins/firebase.js'

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
    fcmToken: '',
  },
  post: {
    id: '',
    user_id: '',
    title: '',
    content: '',
    created_at: '',
    updated_at: '',
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
    state.currentUser.fcmToken = data.fcmToken
  },
  setPost(state, data) {
    state.post.id = data.id
    state.post.user_id = data.user_id
    state.post.title = data.title
    state.post.content = data.content
    state.post.created_at = data.created_at
    state.post.updated_at = data.updated_at
  },
}

export const actions = {
  // ② Google認証
  auth({ commit, dispatch }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async function (result) {
        const user = result.user
        await messaging.requestPermission()
        var currentToken = await messaging.getToken()
        console.log('aaaaaaaaa')
        messaging.onTokenRefresh(async () => {
          // トークンがリフレッシュされた場合
          await messaging.requestPermission()
          var currentToken = await messaging.getToken()
        })
        commit('setIsLogined', true)
        // 認証後のユーザー情報を取得してオブジェクト化
        const userObject = {}
        userObject.token = result.credential.accessToken
        userObject.refreshToken = user.refreshToken
        userObject.uid = user.uid
        userObject.displayName = user.displayName
        userObject.nickName = user.displayName
        userObject.photoURL = user.photoURL
        userObject.uid = user.uid
        userObject.email = user.email
        userObject.isNewUser = result.additionalUserInfo.isNewUser
        userObject.providerId = result.additionalUserInfo.providerId
        userObject.fcmToken = currentToken

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
          resolve(result)
        })
    })
  },
  // ④ 公開可能なユーザー情報をFirestoreに登録
  setPublicUserData({ commit }, userObject) {
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
      publicObj.nickName = userObject.nickName
      publicObj.fcmToken = userObject.fcmToken

      publicUser.set(publicObj, { merge: true }).then(() => {
        resolve(userObject)
      })
    })
  },
  // ⑤非公開のユーザー情報をFirestoreに登録
  setPrivateUserData(userObject) {
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
      privateObj.nickName = userObject.nickName
      privateObj.fcmToken = userObject.fcmToken
      privateUsers.set(privateObj, { merge: true }).then(() => {
        resolve(userObject)
      })
    })
  },
  // ⑥ ローカルストレージに保持するユーザー情報を設定
  setLocalUserData({ commit }, userObject) {
    return new Promise((resolve) => {
      firestore
        .collection('users')
        .doc(userObject.uid)
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
  createPhotoURL({ commit }, userObject) {
    return new Promise((resolve) => {
      const url = userObject.photoURL
      const xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.onload = function () {
        const blob = xhr.response
        const mountainsRef = storageRef.child(
          `user/${userObject.uid}/image.jpg`
        )
        const uploadTask = mountainsRef.put(blob)
        uploadTask.then(() => {
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
  // ログインユーザーのニックネームを変更する
  editNickName({ commit, state }, formData) {
    return new Promise((resolve) => {
      try {
        firestore
          .collection('users')
          .doc(state.currentUser.uid)
          .update(formData)
          .then(() => {
            commit('setCurrentUser', formData)
            resolve(formData)
          })
      } catch (error) {
        console.error(error)
      }
    })
  },
  uploadFile(payload) {
    return new Promise((resolve) => {
      try {
        const file = payload.file
        const ref = `public/${payload.id}`
        storage
          .ref(ref)
          .put(file)
          .then((uploadTask) => {
            storage
              .ref(uploadTask.ref.fullPath)
              .getDownloadURL()
              .then(function (url) {
                resolve(url)
              })
          })
      } catch (error) {
        console.error(error)
      }
    })
  },
  // NOTE:指定したIDの投稿情報を取得
  getPostData({ commit }, payload) {
    return new Promise((resolve) => {
      try {
        firestore
          .collection('posts')
          .doc(payload.id)
          .get()
          .then((doc) => {
            // success
            if (doc) {
              commit('setPost', doc.data())
              resolve(doc.data())
            }
          })
      } catch (error) {
        console.error(error)
      }
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
  getPost(state) {
    return state.post
  },
}
