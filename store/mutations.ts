import { MutationTree } from 'vuex'
import { RootState } from './types'

const mutations: MutationTree<RootState> = {
  initialize: (state, initState) => {
    state = initState
  },
}
export default mutations
