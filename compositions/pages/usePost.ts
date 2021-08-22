import { firestore } from '../../plugins/firebase'

export const DeletePost = (id: string) => {
  try {
    firestore
      .collection('posts')
      .doc(id)
      .delete()
      .then((res) => {
        // TODO: リロード以外でいい方法あれば変更したい、Router.push("/")だとエラーでる
        location.href = '/'
      })
  } catch (error) {
    console.error(error)
  }
}
