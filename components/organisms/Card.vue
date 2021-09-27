<template>
  <div>
    <div class="card-container">
      <div class="container">
        <div class="card-head" @click.stop="Router.push(`/posts/${post.id}`)">
          <div class="left">
            <div class="image">
              <img class="img" alt="" :src="post.user.photoURL" />
            </div>
          </div>
          <div class="right">
            <p class="name">
              {{
                post.user.nickName ? post.user.nickName : post.user.displayName
              }}
            </p>
            <p class="date">{{ formatDateToSlashWithTime(post.updated_at) }}</p>
          </div>
        </div>
        <div class="body" @click.stop="Router.push(`/posts/${post.id}`)">
          <p>{{ post.title }}</p>
        </div>
        <div class="footer">
          <div class="emoji">
            <Emojifrom
              :selected-item="selectedItem"
              :post="post"
              @on-focus="onFocus"
              @on-clicked="switchVisible"
              @delete-select-emoji-item="DeleteSelectEmojiItem"
            />
          </div>
          <div v-if="isMyPost(post.user_id)" class="button">
            <BaseSquareMenu
              :edit-path="`/posts/edit/${post.id}`"
              @delete="DeletePost(post.id, post.files)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isFormVisible" class="form" @mouseleave="onRemoveFocus">
      <Picker @select="selectEmoji" />
    </div>
  </div>

  <!-- <div class="card-container">
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
        @delete-select-emoji-item="DeleteSelectEmojiItem"
      />
    </v-card>
    <div v-if="isFormVisible" class="form" @mouseleave="onRemoveFocus">
      <Picker @select="selectEmoji" />
    </div>
  </div> -->
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
import BaseSquareMenu from '@/components/atoms/BaseSquareMenu.vue'

import { Post } from '@/types/props-types'
import { formatDateToSlashWithTime } from '@/compositions/useFormatData'
import { useEmoji } from '@/compositions/useEmoji'
import { usePost } from '~/compositions/usePost'
import { isCurrentUser } from '@/compositions/useAuth'

export default defineComponent({
  components: {
    Emojifrom,
    Picker,
    BaseSquareMenu,
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
      DeleteSelectEmojiItem,
    } = useEmoji(props, currentUser)
    // 投稿削除
    const { DeletePost, isMyPost } = usePost()
    return {
      DeletePost,
      isCurrentUser,
      currentUser,
      isMyPost,
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
      // 絵文字削除
      DeleteSelectEmojiItem,
    }
  },
})
</script>
