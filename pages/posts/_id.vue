<template>
  <div v-if="post.user" class="common-container -flex">
    <div class="index-container -mt">
      <div class="container -start">
        <div class="title -mt20">
          <p class="text">{{ post.title }}</p>
        </div>
        <div class="body">
          <div class="detail-card">
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
                  <div
                    v-if="isMyPost(post.user_id)"
                    v-bind="attrs"
                    class="button -ml8"
                    v-on="on"
                  >
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
                  <div
                    class="menu-item"
                    @click="DeletePost(post.id, post.files)"
                  >
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
} from '@nuxtjs/composition-api'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import MarkdownViewCard from '@/components/organisms/MarkdownViewCard.vue'
import Icon from '@/components/molecules/Icon.vue'
import { formatDateToSlashWithTime } from '@/compositions/useFormatData'
import { isCurrentUser } from '@/compositions/useAuth'
import BaseComment from '~/components/molecules/comment/BaseComment.vue'
import { usePost } from '~/compositions/usePost'
import { OnePostRef } from '@/utilities/useFirestore'

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
    onBeforeMount(() => {
      try {
        OnePostRef(id)
          .get()
          .then((result) => {
            post.value = { ...result.data() }
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
    const { DeletePost, isMyPost } = usePost()
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
      isMyPost,
    }
  },
})
</script>
