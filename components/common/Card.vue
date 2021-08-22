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
    <Emojifrom />
  </v-card>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  useRouter,
  useStore,
  ref,
} from '@nuxtjs/composition-api'
import { Post, EmojiType } from '../../types/props-types'
import { DeletePost } from '../../compositions/pages/usePost'
import { formatDateToSlashWithTime } from '../../compositions/useFormatData'
import { isCurrentUser } from '../../compositions/useAuth'
import Emojifrom from '../../components/common/form/EmojiForm.vue'

export default defineComponent({
  components: {
    Emojifrom,
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
    const selectedItem = ref<EmojiType[]>([])
    // 絵文字を選択する
    const selectEmoji = (item: EmojiType) => {
      console.log(item)
    }
    return {
      DeletePost,
      isCurrentUser,
      currentUser,

      // フォーマット
      formatDateToSlashWithTime,
      // compositionAPI
      Router,
      // 絵文字選択
      selectEmoji,
      selectedItem,
    }
  },
})
</script>
