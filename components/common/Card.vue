<template>
  <v-card class="mx-auto" width="500">
    <v-card-title>
      <span class="text-h6 font-weight-light"> タイトル: {{ post.title }}</span>
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
            @click="DeletePost(post.id)"
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
  </v-card>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'
import { Post } from '../../types/props-types'
import {DeletePost} from '../../compositions/pages/usePost'
import { formatDateToSlashWithTime } from '../../compositions/useFormatData'

import { isCurrentUser } from '../../compositions/useAuth'

export default defineComponent({
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
    return {
      DeletePost,
      isCurrentUser,
      currentUser,
      // フォーマット
      formatDateToSlashWithTime,
      // compositionAPI
      Router,
    }
  },
})
</script>
