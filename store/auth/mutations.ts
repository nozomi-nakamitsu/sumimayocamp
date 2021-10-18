import { MutationTree } from 'vuex'
import { AuthType } from '../types'

const mutations: MutationTree<AuthType> = {
  setIsLogined: (state, isLogined) => {
    state.isLogined = isLogined
  },
  setIsLoading: (state, isLoading) => {
    state.isLoading = isLoading
  },
  setCurrentUser: (state, data) => {
    state.currentUser.uid = data.uid
    state.currentUser.token = data.token
    state.currentUser.photoURL = data.photoURL
    state.currentUser.displayName = data.displayName
    state.currentUser.nickName = data.nickName
    state.currentUser.fcmToken = data.fcmToken
    state.currentUser.isLogined = data.isLogined
    state.currentUser.updated_at = data.updated_at
  },
  setPost: (state, data) => {
    state.post.id = data.id
    state.post.user_id = data.user_id
    state.post.title = data.title
    state.post.content = data.content
    state.post.files = data.files
    state.post.created_at = data.created_at
    state.post.updated_at = data.updated_at
  },
  setError: (state, error) => {
    state.error = error
  },
}

export default mutations
