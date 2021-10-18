import { ActionTree } from 'vuex'
import { RootState, AuthType } from '../types'
import { TypeUser } from '@/types/props-types'

import firebase, { firestore, storage, messaging } from '~/plugins/firebase.js'
import { OneUserRef } from '~/utilities/useFirestore'

import { timestamp } from '@/compositions/useFormatData'

const storageRef = storage.ref()
const actions: ActionTree<AuthType, RootState> = {
  auth: ({ commit, dispatch }) => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result: any) => {
        const user = result.user
        commit('setIsLogined', true)
        // 認証後のユーザー情報を取得してオブジェクト化
        const userObject = {} as TypeUser
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
        userObject.fcmToken = ''
        userObject.isLogined = true
        userObject.updated_at = timestamp(new Date())

        // NOTE:一度ログインしたことあるユーザーであれば、元のニックネームデータを取得する。初ログインユーザーであれば、displayNameニックネームの初期値にする
        if (!result.additionalUserInfo.isNewUser) {
          const docRef = OneUserRef(user.uid)
          await docRef.get().then((doc) => {
            if (doc.exists) {
              userObject.nickName = doc.data()?.nickName
            }
          })
        }

        dispatch('createPhotoURL', userObject)
        dispatch('setPublicUserData', userObject)
        dispatch('setLocalUserData', userObject)
      })
      .catch((error) => {
        const errorCode = error.code
        console.error('error : ' + errorCode)
        console.error('errorMessage : ' + error)
      })
  },
  // エラーの時
  onRejected: ({ commit }, error) => {
    console.error('errorMessage : ' + error)
    commit(
      'setError',
      '予期せぬエラーが発生しました！みっつが全力で調査するので今回は許して〜'
    )
  },
  // エラーを初期化する
  resetError: ({ commit }) => {
    commit('setError', '')
  },
  // ① 認証状態を明示的にセットする
  setPersistence: () => {
    return new Promise((resolve) => {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then((result) => {
          resolve(result)
        })
    })
  },
  // ④ 公開可能なユーザー情報をFirestoreに登録
  setPublicUserData: ({ commit }, userObject) => {
    return new Promise((resolve) => {
      const publicUser = OneUserRef(userObject.uid)
      publicUser.set(userObject, { merge: true }).then(() => {
        resolve(userObject)
      })
    })
  },
  // ⑤ローカルストレージに保持するユーザー情報を設定
  setLocalUserData: async ({ commit }, userObject) => {
    await messaging
      .requestPermission()
      .then(async () => {
        userObject.fcmToken = await messaging.getToken()
      })
      .catch((error) => {
        console.error(
          'トークンを取得できませんでした。Error getting document:',
          error
        )
      })

    messaging.onTokenRefresh(async () => {
      // トークンがリフレッシュされた場合
      await messaging.requestPermission()
      userObject.fcmToken = await messaging.getToken()
    })

    await OneUserRef(userObject.uid).update(userObject)
    OneUserRef(userObject.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          commit('setCurrentUser', doc.data())
          console.log(`ログインに成功しました`)
        }
      })
      .catch((error) => {
        console.error('ログインに失敗しました。Error getting document:', error)
      })
  },
  // ③ 取得したアイコンのURLをFirestorageに保存して、そのURLをFirestoreに登録する準備
  createPhotoURL: ({ commit }, userObject: TypeUser) => {
    return new Promise((resolve) => {
      const url = userObject.photoURL
      const xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'

      xhr.onload = () => {
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
  logout: async ({ commit }, formData) => {
    await OneUserRef(formData.uid).update(formData)
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
  editNickName: ({ commit, state, dispatch }, formData) => {
    return new Promise((resolve) => {
      try {
        OneUserRef(state.currentUser.uid)
          .update(formData)
          .then(() => {
            commit('setCurrentUser', formData)
            resolve(formData)
          })
      } catch (error) {
        dispatch('onRejected', error)
      }
    })
  },
  uploadFile: ({ commit, dispatch }, payload) => {
    return new Promise((resolve) => {
      try {
        const file = payload.file
        const ref = `public/${payload.id}`
        storage
          .ref(ref)
          .put(file.file)
          .then((uploadTask) => {
            storage
              .ref(uploadTask.ref.fullPath)
              .getDownloadURL()
              .then((url) => {
                resolve(url)
              })
          })
      } catch (error) {
        dispatch('onRejected', error)
      }
    })
  },
  deleteFile: ({ commit, dispatch }, payload) => {
    return new Promise((resolve) => {
      try {
        const ref = `public/${payload.id}`
        storage.ref(ref).delete()
        resolve(null)
      } catch (error) {
        dispatch('onRejected', error)
      }
    })
  },
  // NOTE:指定したIDの投稿情報を取得
  getPostData: ({ commit, dispatch }, payload) => {
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
        dispatch('onRejected', error)
      }
    })
  },
}

export default actions
