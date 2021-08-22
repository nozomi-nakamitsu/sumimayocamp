// ログインユーザーの投稿か判断する
import { computed } from '@nuxtjs/composition-api'
import { CurrentUser } from '../types/props-types'

export const isCurrentUser = computed(
  () =>
    (user_id: string, currentUser: CurrentUser): Boolean => {
      return currentUser.uid === user_id
    }
)
