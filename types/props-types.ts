import { Timestamp } from '@google-cloud/firestore'

/**
 * NOTE:storeのログインユーザーの型
 */
export interface CurrentUser {
  token: string
  uid: string
  photoURL: string
  displayName: string
  nickName: string
  fcmToken: string
}
// マークダウンエディター用にファイル情報保有用の配列の型
export interface FileArray {
  id: string
  url: string
}
/**
 * NOTE:
 * 学習内容のステータス用の型
 */
export interface MissionStatus {
  uid: string
  nickName: string
  status: boolean
  photoURL: string
}
/**
 * NOTE:
 * 挑戦状の新規投稿用の型
 */
export interface MissionPost {
  id: string
  title: string
  content: string
  created_at: any
  updated_at: any
  sendUser: CurrentUser
  receiveUser: []
  files: FileArray[]
  status: MissionStatus[]
  position: number | null
}
/**
 * NOTE:
 * 学習の内容の新規投稿用の型
 */
export interface PostForm {
  id: string
  user_id: string
  title: string
  content: string
  created_at: Timestamp
  updated_at: Timestamp
  user: CurrentUser
  files: FileArray[]
}
export interface EmojiType {
  colons: string
  emoticons: Array<any>
  id: string
  name: string
  native: string
  skin: Number
}

/**
 * NOTE:
 * 学習内容の表示用の型
 */
export interface Post {
  id: string
  user_id: string
  title: string
  content: string

  created_at: Timestamp
  updated_at: Timestamp
  user: CurrentUser
  emojiItems: {
    item: EmojiType | undefined
    users: CurrentUser[]
  }[]
}

// 絵文字ユーザーの型
export interface EmojiUser {
  token: string
  uid: string
  photoURL: string
  displayName: string
  nickName: string
  post_id: string
  item_id: string
}

/**
 * NOTE:
 * ミッションの表示用の型
 */
export interface Mission {
  id: string
  title: string
  content: string
  created_at: Date
  updated_at: Date
  sendUser: CurrentUser
  receiveUser: CurrentUser[] | null
  files: FileArray[]
  status: MissionStatus[]
  position: number | null
}
/**
 * NOTE:
 * ミッションのフォーム表示用の型
 */
export interface MissionForm {
  id: string
  title: string
  content: string
  created_at: Date
  updated_at: Date
  sendUser: CurrentUser
  receiveUser: CurrentUser[] | null
  files: FileArray[]
  status: MissionStatus[]
  position: number | null
}
/**
 * NOTE:
 * 宣言の表示用の型
 */
export interface Declaration {
  declaration: string
  Mission: Mission
  uid: string
}
/**
 * NOTE:
 * カレンダーの表示用の型
 */

export interface CalendarData {
  color: string
  post: Post
  user: CurrentUser
}

/**
 * NOTE:
 * カレンダーのユーザーの型
 */

export interface UserWithColor {
  color: string
  token: string
  uid: string
  photoURL: string
  displayName: string
  nickName: string
  fcmToken: string
}

/**
 * NOTE:
 * カレンダー表示するイベントの型
 */

export interface CalendarEvent {
  title: String
  details: String
  date: String
  open: Boolean
}

/**
 * NOTE:
 * Commentの型
 */

export interface Comment {
  photoURL: String
  id: String
  nickName: String
  postId: String
  createdAt: Date
  text: String
  uid: String
  mentions: []
}
