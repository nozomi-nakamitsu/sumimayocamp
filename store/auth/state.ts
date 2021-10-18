// import { loginUser } from '../types'

const state = (): any => ({
  isLogined: false,
  isLoading: false,
  currentUser: {
    token: '',
    uid: '',
    photoURL: '',
    displayName: '',
    nickName: '',
    fcmToken: '',
  },
  post: {
    id: '',
    user_id: '',
    title: '',
    content: '',
    files: [],
    created_at: '',
    updated_at: '',
  },
  error: '',
})

export default state
