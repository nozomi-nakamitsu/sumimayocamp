import { useRouter, useStore, computed } from '@nuxtjs/composition-api'
import { OnePostRef } from '~/utilities/useFirestore'
import { FileArray } from '@/types/props-types'

import { firestore } from '@/plugins/firebase.js'

export const usePost = () => {
  const store = useStore()
  const Router = useRouter()
  const currentUser = store.getters['auth/getCurrentUser']

  const DeletePost = async (id: string, files: FileArray[]) => {
    try {
      // NOTE:ファイルがあれば削除
      if (files.length !== 0) {
        await files.map((file) => {
          const id = file.id
          store.dispatch('auth/deleteFile', {
            id,
          })
        })
      }
      // NOTE:サブコレクションusersを削除
      await firestore
        .collection('posts')
        .doc(id)
        .collection('emojiItems')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach((doc) => {
            doc.ref
              .collection('users')
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(async (doc) => {
                  await doc.ref.delete()
                })
              })
          })
        })
      // NOTE:サブコレクションemojiItemsを削除
      await firestore
        .collection('posts')
        .doc(id)
        .collection('emojiItems')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(async (doc) => {
            await doc.ref.delete()
          })
        })
      // NOTE:サブコレクションmessagesを削除
      await firestore
        .collection('posts')
        .doc(id)
        .collection('messages')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(async (doc) => {
            await doc.ref.delete()
          })
        })
      // NOTE:postsを削除
      await OnePostRef(id).delete()
      Router.push('/')
    } catch (error) {
      store.dispatch('auth/onRejected', error)
    }
  }
  // ログインユーザーが作成した投稿かを判断する
  const isMyPost = computed(
    () =>
      (uid: string): boolean =>
        uid === currentUser.uid
  )
  return {
    DeletePost,
    isMyPost,
  }
}
