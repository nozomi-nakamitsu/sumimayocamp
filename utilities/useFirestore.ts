import { firestore } from '@/plugins/firebase'
import {
  userConverter,
  postConverter,
  messageConverter,
  DeclarationConverter,
  MissionConverter,
  PositionConverter,
} from '@/utilities/useConverter'

export const UsersRef = () => {
  return firestore.collection('users').withConverter(userConverter)
}
export const OneUserRef = (uid: string) => {
  return firestore.collection('users').withConverter(userConverter).doc(uid)
}
export const PostRef = () => {
  return firestore.collection('posts').withConverter(postConverter)
}
export const OnePostRef = (id: string) => {
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
export const OneMissionRef = (id: string) => {
  return firestore
    .collection('missions')
    .withConverter(MissionConverter)
    .doc(id)
}
export const MissionRef = () => {
  return firestore.collection('missions').withConverter(MissionConverter)
}
export const PositionRef = (messageId: string, uid: string) => {
  return firestore
    .collection('missions')
    .withConverter(MissionConverter)
    .doc(messageId)
    .collection('positions')
    .withConverter(PositionConverter)
    .doc(uid)
}
