<template>
  <div class="container">
    <div>
      <Mentionable
        :keys="['@']"
        :items="items"
        offset="6"
        insert-space
        @open="onOpen"
      >
        <textarea v-model="text" @input="onSelected(text)" />
        <template #no-result>
          <div class="dim">No result</div>
        </template>

        <template #item-@="{ item }">
          <div class="user">
            {{ item.user.nickName }}
            <span class="dim"> ({{ item.user.nickName }}) </span>
          </div>
        </template>
      </Mentionable>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  onBeforeUnmount,
  watch,
  watchEffect,
} from '@nuxtjs/composition-api'
import { firestore } from '@/plugins/firebase'
import { CurrentUser } from '@/types/props-types'
import _ from 'lodash'
// バリデーション周り

export default defineComponent({
  emits: ['on-selected'],
  props: {
    setValue: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    const offset = ref(true)
    let unsubscribe = null as any
    const users = ref<any[]>([])
    const text = ref<string>(props.setValue)
    const items = ref<any[]>([])
    watch(
      () => props.setValue,
      () => {
        text.value = props.setValue
      }
    )
    const usersNames = ref<string[]>([])
    // 投稿一覧データを取得する
    onMounted(async () => {
      unsubscribe = firestore.collection('users').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(
          (change) => {
            const user = change.doc.data() as CurrentUser
            users.value = [...users.value, { user: user, value: user.nickName }]
            usersNames.value = [...usersNames.value, user.nickName]
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
    const onOpen = () => {
      items.value = users.value
    }
    const selectedUser = ref<CurrentUser[]>([])
    const onSelected = (text: string) => {
      usersNames.value.map((name) => {
        if (
          text.indexOf(name) != -1 &&
          _.every(selectedUser.value, function (item) {
            return item.nickName !== name
          })
        ) {
          const target = users.value.find((user) => user.user.nickName === name)
          selectedUser.value = [...selectedUser.value, target.user]
          console.log('selectedUser.value', selectedUser.value)
        }
      })
      ctx.emit('on-selected', selectedUser.value)
    }

    return {
      users,
      offset,
      text,
      items,
      onOpen,
      onSelected,
    }
  },
})
</script>

<style>
mention-item {
  padding: 4px 10px;
  border-radius: 4px;
}

.mention-selected {
  background: rgb(192, 250, 153);
}
</style>
