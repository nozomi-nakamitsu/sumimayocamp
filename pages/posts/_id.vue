<template>
  <div v-if="post.user">
    <v-card class="mx-auto" width="100%">
      <v-card-title>
        <span class="text-h6 font-weight-light">
          タイトル: {{ post.title }}</span
        >
      </v-card-title>
      <MarkdownViewCard :content="post.content" />
      <v-card-text class="text-h5 font-weight-bold">
        {{ updated_at }}
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
        </v-list-item>
      </v-card-actions>
    </v-card>
    <BaseComment :post-id="id" />
    <p style="cursor: pointer; font-size: 12px" @click="Router.push('/')">
      ホームに戻る
    </p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  useAsync,
  useRoute,
  useRouter,
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
} from '@nuxtjs/composition-api'
import MarkdownViewCard from '@/components/organisms/MarkdownViewCard.vue'
import { formatDateToSlashWithTime } from '@/compositions/useFormatData'
import { isCurrentUser } from '@/compositions/useAuth'
import { firestore } from '@/plugins/firebase.js'
import BaseComment from '~/components/molecules/comment/BaseComment.vue'
import _ from 'lodash'
import { CurrentUser } from '@/types/props-types'

export default defineComponent({
  components: {
    MarkdownViewCard,
    BaseComment,
  },
  setup() {
    // compositionAPI
    const store = useStore()
    const Route = useRoute()
    const Router = useRouter()

    // ref系
    const currentUser = store.getters.getCurrentUser
    const post = ref(store.getters.getPost)
    // 投稿者情報を取得
    const id = Route.value.params.id
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
    onMounted(async () => {
      try {
        await store
          .dispatch('getPostData', {
            id,
          })
          .then((result) => {
            const targetUser = _.find(
              allUsers.value,
              function (user: CurrentUser) {
                return user.uid === result.user_id
              }
            )
            result.user = { ...targetUser }
            post.value = { ...result }
          })
      } catch (error) {
        console.error('投稿内容を取得できませんでした', error)
      }
    })
    // 日付をフォーマットに変換する
    // NOTE:NOTE:初期ロード時にエラーが出るので、computedで値を監視しています
    const updated_at = computed(() => {
      if (!post.value.updated_at) {
        return
      }
      return formatDateToSlashWithTime(post.value.updated_at)
    })
    // 削除メソッド
    const DeletePost = async (id: string) => {
      try {
        await firestore.collection('posts').doc(id).delete()
        Router.push('/')
      } catch (error) {
        console.error(error)
      }
    }

    return {
      // 認証系
      currentUser,
      isCurrentUser,
      // ref系
      post,
      updated_at,
      id,
      // フォーマット
      formatDateToSlashWithTime,
      // compositionAPI
      Router,
      // 投稿削除
      DeletePost,
    }
  },
})
</script>
