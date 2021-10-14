import { firestore } from '@/plugins/firebase'
import { userConverter, postConverter } from '@/utilities/useConverter'

export const UsersRef = () => {
  return firestore.collection('users').withConverter(userConverter)
}
export const OneUserRef = (uid: string) => {
  return firestore.collection('users').withConverter(userConverter).doc(uid)
}
export const PostRef = (id: string) => {
  return firestore.collection('posts').withConverter(postConverter).doc(id)
}
