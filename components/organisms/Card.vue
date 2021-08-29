<template>
  <div class="card-container">
    <v-card class="mx-auto" width="500">
      <v-card-title>
        <span class="text-h6 font-weight-light">
          タイトル: {{ displayPost.title }}</span
        >
      </v-card-title>
      <v-card-text class="text-h5 font-weight-bold">
        {{ formatDateToSlashWithTime(displayPost.updated_at) }}
      </v-card-text>
      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              alt=""
              :src="displayPost.user.photoURL"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{
              displayPost.user.nickName
                ? displayPost.user.nickName
                : displayPost.user.displayName
            }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content
            v-if="isCurrentUser(displayPost.user_id, currentUser)"
          >
            <v-list-item-title
              style="cursor: pointer"
              @click="Router.push(`/posts/edit/${displayPost.id}`)"
              >編集</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-content
            v-if="isCurrentUser(displayPost.user_id, currentUser)"
          >
            <v-list-item-title
              style="cursor: pointer"
              @click="DeletePost(displayPost.id)"
              >削除</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title
              style="cursor: pointer"
              @click="Router.push(`/posts/${displayPost.id}`)"
              >詳細</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-card-actions>
      <Emojifrom
        :selectedItem="selectedItem"
        :post="displayPost"
        @on-focus="onFocus"
        @on-clicked="switchVisible"
      />
    </v-card>
    <div v-if="isFormVisible" @mouseleave="onRemoveFocus" class="form">
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
import { Post } from '@/types/props-types'
import { formatDateToSlashWithTime } from '@/compositions/useFormatData'
import { useEmoji } from '@/compositions/useEmoji'

import { firestore } from '@/plugins/firebase.js'
import { isCurrentUser } from '@/compositions/useAuth'
import Emojifrom from '../molecules/EmojiItems.vue'
import { Picker } from 'emoji-mart-vue'

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
      displayPost,
      selectedItem,
      isFormVisible,
      onFocus,
      onRemoveFocus,
      selectEmoji,
      switchVisible,
    } = useEmoji(props, currentUser)

    const DeletePost = async (id: string) => {
      try {
        await firestore.collection('posts').doc(id).delete()
        Router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
    return {
      displayPost,
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
