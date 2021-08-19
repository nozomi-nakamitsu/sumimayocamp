<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title>
      <span class="text-h6 font-weight-light"> タイトル: {{ post.title }}</span>
    </v-card-title>
    <v-card-text class="text-h5 font-weight-bold">
      内容: {{ post.content }}
    </v-card-text>
    <v-card-text class="text-h5 font-weight-bold">
      url: {{ post.url }}
    </v-card-text>
    <v-card-text class="text-h5 font-weight-bold">
      movieurl: {{ post.movieUrl }}
      <video
        controls="controls"
        width="200px"
        height="133px"
        v-if="post.movieUrl"
      >
        <source :src="post.movieUrl" />
      </video>
    </v-card-text>
    <v-card-text class="text-h5 font-weight-bold">
      id: {{ post.id }}
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
          <v-list-item-title style="cursor: pointer">編集</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content v-if="isCurrentUser">
          <v-list-item-title
            style="cursor: pointer;"
            @click="DeletePost()"
            >削除</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title style="cursor: pointer;">詳細</v-list-item-title>
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
        firestore.collection('posts').doc(props.post.id).delete()
        Router.push('/')
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
    }
  },
})
</script>
