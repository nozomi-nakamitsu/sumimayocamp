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
export class Message {
  constructor(
    readonly createdAt: Timestamp,
    readonly id: string,
    readonly mentions: CurrentUser[],
    readonly nickName: string,
    readonly photoURL: string,
    readonly postId: string,
    readonly text: string,
    readonly uid: string
  ) {}
}

export class Status {
  constructor(
    readonly nickName: string,
    readonly photoURL: string,
    readonly status: boolean,
    readonly uid: string
  ) {}
}
export class Mission {
  constructor(
    readonly content: string,
    readonly created_at: Timestamp,
    readonly files: Files[],
    readonly id: string,
    readonly position: number | null,
    readonly receiveUser: [],
    readonly sendUser: CurrentUser,
    readonly status: Status[],
    readonly title: string,
    readonly updated_at: Timestamp
  ) {}
}

export class Position {
  constructor(readonly position: number | null) {}
}

export class Declaration {
  constructor(
    readonly declaration: string,
    readonly mission: Mission[],
    readonly uid: string
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

export const messageConverter = {
  toFirestore(message: Message): firebase.firestore.DocumentData {
    return {
      createdAt: message.createdAt,
      id: message.id,
      mentions: message.mentions,
      nickName: message.nickName,
      photoURL: message.photoURL,
      postId: message.postId,
      text: message.text,
      uid: message.uid,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Message {
    const data = snapshot.data(options)!
    return new Message(
      data.createdAt,
      data.id,
      data.mentions,
      data.nickName,
      data.photoURL,
      data.postId,
      data.text,
      data.uid
    )
  },
}

export const DeclarationConverter = {
  toFirestore(declaration: Declaration): firebase.firestore.DocumentData {
    return {
      declaration: declaration.declaration,
      mission: declaration.mission,
      uid: declaration.uid,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Declaration {
    const data = snapshot.data(options)!
    return new Declaration(data.declaration, data.mission, data.uid)
  },
}

export const MissionConverter = {
  toFirestore(mission: Mission): firebase.firestore.DocumentData {
    return {
      content: mission.content,
      created_at: mission.created_at,
      files: mission.files,
      id: mission.id,
      position: mission.position,
      receiveUser: mission.receiveUser,
      sendUser: mission.sendUser,
      status: mission.status,
      title: mission.title,
      updated_at: mission.updated_at,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Mission {
    const data = snapshot.data(options)!
    return new Mission(
      data.content,
      data.created_at,
      data.files,
      data.id,
      data.position,
      data.receiveUser,
      data.sendUser,
      data.status,
      data.title,
      data.updated_at
    )
  },
}
export const PositionConverter = {
  toFirestore(position: Position): firebase.firestore.DocumentData {
    return {
      position: position.position,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Position {
    const data = snapshot.data(options)!
    return new Position(data.position)
  },
}

// 絵文字、絵文字ユーザー、ミッション、ポジション、
