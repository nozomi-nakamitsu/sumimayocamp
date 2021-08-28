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
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  useAsync,
} from '@nuxtjs/composition-api'
import Card from '../components/organisms/Card.vue'
import { firestore } from '../plugins/firebase'
import { Post } from '@/types/props-types'

export default defineComponent({
  components: {
    Card,
  },
  setup() {
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
                posts.value = [...posts.value, change.doc.data() as Post]
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

    return {
      // 全投稿データ
      posts,
    }
  },
})
</script>
