import { Timestamp } from '@google-cloud/firestore'

export interface RootState {
  version: string
}

// Storeの型
export interface AuthType {
  isLogined: boolean
  isLoading: boolean
  currentUser: {
    token: string
    uid: string
    photoURL: string
    displayName: string
    nickName: string
    fcmToken: string
    isLogined: boolean
    updated_at: Timestamp | null
  }
  post: {
    id: string
    user_id: string
    title: string
    content: string
    files: []
    created_at: Timestamp | null
    updated_at: Timestamp | null
  }
  error: string
}
