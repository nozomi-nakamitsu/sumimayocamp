import { Module } from 'vuex'
import { RootState } from '../types'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export const Auth: Module<any, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
