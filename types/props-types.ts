/**
 * NOTE:
 * 学習内容の新規投稿用の型
 */
export interface PostForm {
  id: String
  user_id: String
  title: String
  content: String
  url: String
  movieUrl: String
  learn: String
  created_at: Date
  updated_at: Date
}

/**
 * NOTE:
 * 学習内容の表示用の型
 */
export interface Post {
  id: String
  user_id: String
  title: String
  content: String
  url: String
  movieUrl: String
  learn: String
  created_at: Date
  updated_at: Date
}
