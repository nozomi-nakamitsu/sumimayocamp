<template>
  <v-select
    v-model="selectedUser"
    :items="allUsers"
    label="ユーザーを選択！"
    item-text="nickName"
    item-value="uid"
    dense
    outlined
    hide-details
    :menu-props="{ closeOnContentClick: true }"
    class="ma-2 user-select-box-container"
    @change="$emit('on-selected', selectedUser)"
  >
    <template #prepend-item>
      <v-list-item @click="onReset">
        <v-list-item-content>
          <v-list-item-title> Select All </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from '@nuxtjs/composition-api'
import { firestore } from '@/plugins/firebase'
import { CurrentUser } from '@/types/props-types'

// バリデーション周り

export default defineComponent({
  emits: ['on-selected'],
  setup(_, ctx) {
    const selectedUser = ref<CurrentUser | null>(null)
    const allUsers = ref<CurrentUser[]>([])
    // ユーザー一覧データを取得する
    onBeforeMount(() => {
      firestore
        .collection('users')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            allUsers.value = [...allUsers.value, doc.data()] as CurrentUser[]
          })
        })
    })
    const onReset = () => {
      selectedUser.value = null
      ctx.emit('on-reset', selectedUser.value)
    }

    return {
      selectedUser,
      allUsers,
      onReset,
    }
  },
})
</script>
