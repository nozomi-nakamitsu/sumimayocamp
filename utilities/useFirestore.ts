import { firestore } from '@/plugins/firebase'
import { userConverter } from '@/utilities/useConverter'

export const UsersRef = () => {
  return firestore.collection('users').withConverter(userConverter)
}
export const OneUserRef = (uid: string) => {
  return firestore.collection('users').withConverter(userConverter).doc(uid)
}
