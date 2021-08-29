<template>
  <div class="index-container">
    <div class="container">
      <div v-for="post in posts" :key="post.id" style="margin: 20px">
        <Card :post="post" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  useStore,
  onActivated,
} from '@nuxtjs/composition-api'
import { CurrentUser, EmojiType, Post } from '@/types/props-types'
import Card from '@/components/organisms/Card.vue'
import { firestore } from '@/plugins/firebase'
import EmojiItemsVue from '~/components/molecules/EmojiItems.vue'
export default defineComponent({
  components: {
    Card,
  },
  setup() {
    // compositionAPI
    const store = useStore()
    const currentUser = store.getters.getCurrentUser
    const posts = ref<Post[]>([])
    var unsubscribe = null as any

    // 投稿一覧データを取得する
    onMounted(() => {
      unsubscribe = firestore
        .collection('posts')
        .orderBy('updated_at', 'desc')
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach(
            (change) => {
              // 変更後のデータが取得できる
              if (change.type === 'added') {
                const postData = change.doc.data()
                change.doc.ref
                  .collection('emojiItems')

                  .get()
                  .then((res) => {
                    // サブコレクションの絵文字データとサブサブコレクションの絵文字ユーザーデータを取得
                    const getEmojiData = res.docs.map((v) => {
                      const item = v.data() as EmojiType
                      const emojiUser = <CurrentUser[]>[]
                      v.ref
                        .collection('users')
                        .get()
                        .then((users: any) => {
                          users.docs.map((user: any) => {
                            emojiUser.push(user.data())
                          })
                        })
                      return { item, users: emojiUser as CurrentUser[] }
                    })
                    postData.emojiItems = getEmojiData
                    posts.value = [...posts.value, postData as Post]
                  })
              } else if (change.type === 'removed') {
                posts.value = posts.value.filter(
                  (v: Post) => v.id !== change.doc.data().id
                )
              }
            },
            (error: any) => {
              console.error(error)
            }
          )
        })
    })
    // ページ遷移後にsnapshotでの監視をstopする
    onBeforeUnmount(() => {
      unsubscribe()
    })

    onActivated(() => {
      console.log(' アップデート')
    })

    return {
      // 全投稿データ
      posts,
    }
  },
})
</script>
