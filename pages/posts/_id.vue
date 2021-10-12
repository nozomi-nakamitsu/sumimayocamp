<template>
  <div v-if="post.user" class="common-container -flex">
    <div class="index-container -mt">
      <div class="container -start">
        <div class="detail-card">
          <div class="title">
            <p class="text">{{ post.title }}</p>
          </div>
          <div class="member">
            <div class="image">
              <img :src="post.user.photoURL" alt="" class="img" />
            </div>
            <p class="text">{{ post.user.nickName }}</p>
            <p class="text -ml8">{{ updated_at }}</p>

            <v-menu
              :close-on-content-click="true"
              :nudge-width="200"
              offset-y
              style="display: block"
            >
              <template #activator="{ on, attrs }">
                <div v-bind="attrs" class="button -ml8" v-on="on">
                  <Icon :icon="faEllipsisH" types="button" />
                </div>
              </template>

              <v-card class="card">
                <div
                  class="menu-item"
                  @click="Router.push(`/posts/edit/${post.id}`)"
                >
                  <Icon :icon="faCode" types="menu" />
                  <p class="text">Edit</p>
                </div>
                <div class="menu-item" @click="DeletePost(post.id, post.files)">
                  <Icon :icon="faTrash" types="menu" />
                  <p class="text">Delete</p>
                </div>
              </v-card>
            </v-menu>
          </div>
          <div class="content">
            <MarkdownViewCard :content="post.content" types="detail" />
          </div>
        </div>
      </div>
      <div class="container -start -right">
        <BaseComment :post-id="id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  useRoute,
  useRouter,
  computed,
  onBeforeMount,
  onMounted,
} from '@nuxtjs/composition-api'
import _ from 'lodash'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import MarkdownViewCard from '@/components/organisms/MarkdownViewCard.vue'
import Icon from '@/components/molecules/Icon.vue'

import { formatDateToSlashWithTime } from '@/compositions/useFormatData'
import { isCurrentUser } from '@/compositions/useAuth'
import { firestore } from '@/plugins/firebase.js'
import BaseComment from '~/components/molecules/comment/BaseComment.vue'
import { CurrentUser } from '@/types/props-types'
import { usePost } from '~/compositions/usePost'

export default defineComponent({
  components: {
    MarkdownViewCard,
    BaseComment,
    Icon,
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
        store.dispatch('onRejected', error)
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
    const { DeletePost } = usePost()
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
      faEllipsisH,
    }
  },
})
</script>
