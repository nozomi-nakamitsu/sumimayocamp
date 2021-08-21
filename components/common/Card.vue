<template>
  <v-card class="mx-auto" width="500">
    <v-card-title>
      <span class="text-h6 font-weight-light"> タイトル: {{ post.title }}</span>
    </v-card-title>
    <!-- <template>
      <div class="markdown-editor">
        <no-ssr>
          <mavon-editor
            language="ja"
            v-model="post.content"
            :subfield="false"
            :editable="false"
            :toolbarsFlag="false"
            :boxShadow="false"
            defaultOpen="preview"
            previewBackground="#fff"
          />
        </no-ssr>
      </div>
    </template> -->
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
        <v-list-item-content v-if="isCurrentUser">
          <v-list-item-title
            style="cursor: pointer"
            @click="Router.push(`/posts/edit/${post.id}`)"
            >編集</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-content v-if="isCurrentUser">
          <v-list-item-title style="cursor: pointer" @click="DeletePost()"
            >削除</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title style="cursor: pointer">詳細</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'
import { Post } from '../../types/props-types'
import { firestore } from '../../plugins/firebase'
import { formatDateToSlashWithTime } from '../../compositions/useFormatData'
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
    // 投稿を削除する
    const DeletePost = () => {
      try {
        firestore
          .collection('posts')
          .doc(props.post.id)
          .delete()
          .then((res) => {
            // TODO: リロード以外でいい方法あれば変更したい、Router.push("/")だと変更データが反映されなかった。
            location.reload()
          })
      } catch (error) {
        console.error(error)
      }
    }
    // ログインユーザーの投稿か判断する
    const isCurrentUser = computed((): Boolean => {
      return currentUser.uid === props.post.user_id
    })
    return {
      DeletePost,
      isCurrentUser,
      // フォーマット
      formatDateToSlashWithTime,
      // compositionAPI
      Router,
    }
  },
})
</script>
