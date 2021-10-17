import { firestore } from '@/plugins/firebase'
import {
  userConverter,
  postConverter,
  messageConverter,
  DeclarationConverter,
} from '@/utilities/useConverter'

export const UsersRef = () => {
  return firestore.collection('users').withConverter(userConverter)
}
export const OneUserRef = (uid: string) => {
  return firestore.collection('users').withConverter(userConverter).doc(uid)
}
export const PostRef = (id: string) => {
  return firestore.collection('posts').withConverter(postConverter).doc(id)
}
export const MessageRef = (postId: string) => {
  return firestore
    .collection('posts')
    .withConverter(postConverter)
    .doc(postId)
    .collection('messages')
    .withConverter(messageConverter)
}
export const OneMessageRef = (postId: string, messageId: string) => {
  return firestore
    .collection('posts')
    .withConverter(postConverter)
    .doc(postId)
    .collection('messages')
    .withConverter(messageConverter)
    .doc(messageId)
}
export const OneDeclarationRef = (uid: string) => {
  return firestore
    .collection('declaration')
    .withConverter(DeclarationConverter)
    .doc(uid)
}

export const DeclarationRef = () => {
  return firestore.collection('declaration').withConverter(DeclarationConverter)
}
