import { Timestamp } from '@google-cloud/firestore'
import firebase from '@/plugins/firebase'

// クラス
export class User {
  constructor(
    readonly displayName: string,
    readonly email: string,
    readonly fcmToken: string | null,
    readonly isNewUser: boolean,
    readonly nickName: string,
    readonly photoURL: string,
    readonly providerId: string,
    readonly refreshToken: string,
    readonly token: string,
    readonly uid: string
  ) {}
}

export class CurrentUser {
  constructor(
    readonly displayName: string,
    readonly fcmToken: string | null,
    readonly nickName: string,
    readonly photoURL: string,
    readonly token: string,
    readonly uid: string
  ) {}
}
export class Files {
  constructor(readonly id: string, readonly url: string) {}
}

export class Post {
  constructor(
    readonly id: string,
    readonly user_id: string,
    readonly title: string,
    readonly content: string,
    readonly created_at: Timestamp,
    readonly updated_at: Timestamp,
    readonly user: CurrentUser,
    readonly files: Files[]
  ) {}
}

// Converter
export const userConverter = {
  toFirestore(user: User): firebase.firestore.DocumentData {
    return {
      displayName: user.displayName,
      email: user.email,
      fcmToken: user.fcmToken,
      isNewUser: user.isNewUser,
      nickName: user.nickName,
      photoURL: user.photoURL,
      providerId: user.providerId,
      refreshToken: user.refreshToken,
      token: user.token,
      uid: user.uid,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): User {
    const data = snapshot.data(options)!
    return new User(
      data.displayName,
      data.email,
      data.fcmToken,
      data.isNewUser,
      data.nickName,
      data.photoURL,
      data.providerId,
      data.refreshToken,
      data.token,
      data.uid
    )
  },
}

export const postConverter = {
  toFirestore(post: Post): firebase.firestore.DocumentData {
    return {
      id: post.id,
      user_id: post.user_id,
      title: post.title,
      content: post.content,
      created_at: post.created_at,
      updated_at: post.updated_at,
      user: post.user,
      files: post.files,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Post {
    const data = snapshot.data(options)!
    return new Post(
      data.id,
      data.user_id,
      data.title,
      data.content,
      data.created_at,
      data.updated_at,
      data.user,
      data.files
    )
  },
}
