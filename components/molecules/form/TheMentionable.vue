<template>
  <div class="mentionable-container">
    <Mentionable
      :keys="['@']"
      :items="items"
      offset="6"
      insert-space
      :limit="9999"
      @open="onOpen"
    >
      <textarea v-model="text" class="textarea" @input="onSelected(text)" />
      <template #no-result>
        <div class="user" style="display: none">該当するユーザーがいません</div>
      </template>

      <template #item-@="{ item }">
        <div class="image">
          <img :src="item.user.photoURL" alt="" class="img" />
        </div>
        <div class="user">
          {{ item.user.nickName }}
        </div>
      </template>
    </Mentionable>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  onBeforeUnmount,
  watch,
} from '@nuxtjs/composition-api'
import { Mentionable } from 'vue-mention'
import _ from 'lodash'
import { firestore } from '@/plugins/firebase'
import { CurrentUser } from '@/types/props-types'

export default defineComponent({
  components: {
    Mentionable,
  },
  props: {
    setValue: {
      type: String,
      default: '',
    },
  },
  emits: ['on-selected'],
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
    onMounted(() => {
      unsubscribe = firestore.collection('users').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(
          (change) => {
            const user = change.doc.data() as CurrentUser
            users.value = [...users.value, { user, value: user.nickName }]
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
      console.log(items.value)
    }
    const selectedUser = ref<CurrentUser[]>([])
    const onSelected = (text: string) => {
      usersNames.value.map((name) => {
        if (
          text.includes(name) &&
          _.every(selectedUser.value, function (item) {
            return item.nickName !== name
          })
        ) {
          const target = users.value.find((user) => user.user.nickName === name)
          selectedUser.value = [...selectedUser.value, target.user]
        }
        return null
      })

      const data = { selectedUser: selectedUser.value, text }
      ctx.emit('on-selected', data)
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
