<template>
  <div class="user-menu-container" v-if="isMenstionWriting">
    <div v-for="(user, index) in users" :key="index" class="container">
      <div class="item" @click="onSelected(user)">
        <div class="image">
          <img class="img" alt="" :src="user.photoURL" />
        </div>
        <div>{{ user.nickName }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  onBeforeUnmount,
} from '@nuxtjs/composition-api'
import { firestore } from '@/plugins/firebase'
import { CurrentUser } from '@/types/props-types'

// バリデーション周り

export default defineComponent({
  emits: ['on-selected'],
  props: {
    isMenstionWriting: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, ctx) {
    const offset = ref(true)
    let unsubscribe = null as any
    const users = ref<CurrentUser[]>([])
    // 投稿一覧データを取得する
    onMounted(() => {
      unsubscribe = firestore.collection('users').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(
          (change) => {
            const user = change.doc.data() as CurrentUser
            users.value = [...users.value, user]
          },
          (error: any) => {
            console.error(error)
          }
        )
      })
    })

    // ページ遷移後にsnapshotでの監視をstopする
    onBeforeUnmount(() => {
      unsubscribe()
    })
    const onSelected = (user: CurrentUser) => {
      ctx.emit('on-selected', user)
    }
    return {
      users,
      offset,
      onSelected,
    }
  },
})
</script>
