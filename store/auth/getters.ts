import { GetterTree } from 'vuex'
import { RootState, AuthType } from '../types'

const getters: GetterTree<AuthType, RootState> = {
  getIsLogined: (state) => {
    return state.isLogined
  },
  getIsLoading: (state) => {
    return state.isLoading
  },
  getCurrentUser: (state) => {
    return state.currentUser
  },
  getPost: (state) => {
    return state.post
  },
  getError: (state) => {
    return state.error
  },
}

export default getters
