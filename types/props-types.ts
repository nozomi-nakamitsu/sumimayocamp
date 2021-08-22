/**
 * NOTE:
 * 学習内容の新規投稿用の型
 */
export interface PostForm {
  id: string
  user_id: string
  title: string
  content: string
  created_at: Date
  updated_at: Date
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
  url: string
  movieUrl: string
  learn: string
  created_at: Date
  updated_at: Date
  users: {
    displayName: string
    isNewUser: Boolean
    nickName: string
    photoURL: string
    providerId: string
    token: string
    uid: string
  }
}

/**
 * NOTE:storeのログインユーザーの型
 */
export interface CurrentUser {
  token: string
  uid: string
  photoURL: string
  displayName: string
  nickName: string
}
export interface EmojiType {
  colons: string
  emoticons: Array<any>
  id: string
  name: string
  native: string
  skin: Number
}
