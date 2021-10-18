import { AuthType } from '../types'

const state = (): AuthType => ({
  isLogined: false,
  isLoading: false,
  currentUser: {
    token: '',
    uid: '',
    photoURL: '',
    displayName: '',
    nickName: '',
    fcmToken: '',
    isLogined: false,
    updated_at: null,
  },
  post: {
    id: '',
    user_id: '',
    title: '',
    content: '',
    files: [],
    created_at: null,
    updated_at: null,
  },
  error: '',
})

export default state
