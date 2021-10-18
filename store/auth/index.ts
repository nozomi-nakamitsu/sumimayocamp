import { Module } from 'vuex'
import { RootState, AuthType } from '../types'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export const Auth: Module<AuthType, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
