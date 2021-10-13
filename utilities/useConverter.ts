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

  // toString(): string {
  //   return this.title + ', by ' + this.author
  // }
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
