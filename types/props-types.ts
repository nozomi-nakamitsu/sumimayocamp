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
// マークダウンエディター用にファイル情報保有用の配列の型
export interface FileArray {
  id: string
  url: string
}
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

  created_at: Date
  updated_at: Date
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
