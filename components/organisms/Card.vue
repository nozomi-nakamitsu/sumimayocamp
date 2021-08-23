<template>
  <div>
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
      <Emojifrom
        :selectedItem="selectedItem"
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
  ref,
} from '@nuxtjs/composition-api'
import { Post, EmojiType } from '../../types/props-types'
import { DeletePost } from '../../compositions/pages/usePost'
import { formatDateToSlashWithTime } from '../../compositions/useFormatData'
import { isCurrentUser } from '../../compositions/useAuth'
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

    const selectedItem = ref<EmojiType[]>([])
    const isFormVisible = ref<Boolean>(false)
    const onFocus = () => {
      isFormVisible.value = true
    }
    const onRemoveFocus = () => {
      isFormVisible.value = false
    }
    const switchVisible = () => {
      isFormVisible.value = !isFormVisible.value
    }
    // 絵文字を選択する
    const selectEmoji = (item: any) => {
      if (!selectedItem.value) {
        selectedItem.value = item.unified
      } else if (selectedItem.value.includes(item)) {
        selectedItem.value = selectedItem.value.filter((v) => v.id !== item.id)
      } else {
        selectedItem.value = [...selectedItem.value, item]
      }
      switchVisible()
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
      // 表示非表示の切り替え
      onFocus,
      onRemoveFocus,
      switchVisible,
      isFormVisible,
    }
  },
})
</script>
