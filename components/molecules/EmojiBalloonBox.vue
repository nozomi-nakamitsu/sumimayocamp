<template>
  <div class="emoji-balloon-box">
    <p v-for="user in users" :key="user.uid" class="person">
      {{ isCurrentUser(user) }}さん
    </p>
    <p>がリアクションしました</p>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  useStore,
} from '@nuxtjs/composition-api'
import { EmojiUser } from '~/types/props-types'

export default defineComponent({
  props: {
    users: {
      type: Array as PropType<EmojiUser[]>,
      required: true,
    },
  },

  setup() {
    // compositionAPI
    const store = useStore()
    // ref系
    const currentUser = store.getters['auth/getCurrentUser']
    const isCurrentUser = computed(() => (user: EmojiUser) => {
      if (currentUser.uid === user.uid) {
        return 'あなた'
      } else {
        return user.nickName
      }
    })
    return {
      isCurrentUser,
    }
  },
})
</script>
