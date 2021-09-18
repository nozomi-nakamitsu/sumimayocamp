<template>
  <div class="card-container">
    <v-card class="mx-auto" width="500">
      <v-card-title>
        <span class="text-h6 font-weight-light">
          タイトル: {{ post.title }}</span
        >
      </v-card-title>
      <v-card-text class="text-h5 font-weight-bold">
        {{ formatDateToSlashWithTime(post.updated_at) }}
      </v-card-text>
      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img class="elevation-6" alt="" :src="post.user.photoURL"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{
              post.user.nickName ? post.user.nickName : post.user.displayName
            }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content v-if="isCurrentUser(post.user_id, currentUser)">
            <v-list-item-title
              style="cursor: pointer"
              @click="Router.push(`/posts/edit/${post.id}`)"
              >編集</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-content v-if="isCurrentUser(post.user_id, currentUser)">
            <v-list-item-title
              style="cursor: pointer"
              @click="DeletePost(post.id, post.files)"
              >削除</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title
              style="cursor: pointer"
              @click="Router.push(`/posts/${post.id}`)"
              >詳細</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-card-actions>
      <Emojifrom
        :selected-item="selectedItem"
        :post="post"
        @on-focus="onFocus"
        @on-clicked="switchVisible"
      />
    </v-card>
    <div v-if="isFormVisible" class="form" @mouseleave="onRemoveFocus">
      <Picker @select="selectEmoji" />
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'
import { Picker } from 'emoji-mart-vue'
import Emojifrom from '../molecules/EmojiItems.vue'
import { Post, FileArray } from '@/types/props-types'
import { formatDateToSlashWithTime } from '@/compositions/useFormatData'
import { useEmoji } from '@/compositions/useEmoji'

import { firestore } from '@/plugins/firebase.js'
import { isCurrentUser } from '@/compositions/useAuth'

export default defineComponent({
  components: {
    Emojifrom,
    Picker,
  },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },

  setup(props) {
    // compositionAPI
    const Router = useRouter()
    const store = useStore()
    // ref系
    const currentUser = store.getters.getCurrentUser

    // 絵文字関連の処理
    const {
      selectedItem,
      isFormVisible,
      onFocus,
      onRemoveFocus,
      selectEmoji,
      switchVisible,
    } = useEmoji(props, currentUser)

    const DeletePost = async (id: string, files: FileArray[]) => {
      try {
        if (files.length !== 0) {
          await files.map((file) => {
            const id = file.id
            store.dispatch('deleteFile', {
              id,
            })
          })
        }
        await firestore
          .collection('posts')
          .doc(id)
          .collection('emojiItems')
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(async (doc) => {
              doc.ref
                .collection('users')
                .get()
                .then(function (querySnapshot) {
                  querySnapshot.forEach(async (doc) => {
                    await doc.ref.delete()
                  })
                })
            })
          })
        await firestore
          .collection('posts')
          .doc(id)
          .collection('emojiItems')
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(async (doc) => {
              await doc.ref.delete()
            })
          })
        await firestore
          .collection('posts')
          .doc(id)
          .collection('messages')
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(async (doc) => {
              await doc.ref.delete()
            })
          })

        await firestore.collection('posts').doc(id).delete()
        Router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
    return {
      DeletePost,
      isCurrentUser,
      currentUser,
      useEmoji,
      // フォーマット
      formatDateToSlashWithTime,
      // compositionAPI
      Router,
      // 絵文字選択
      selectEmoji,
      selectedItem,
      // 表示非表示の切り替え
      onFocus,
      onRemoveFocus,
      switchVisible,
      isFormVisible,
    }
  },
})
</script>
