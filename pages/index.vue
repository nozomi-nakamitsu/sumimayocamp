<template>
  <div>
    <p>メイン</p>
    <div v-for="post in posts" :key="post.id"><Card :post="post" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted,ref } from '@nuxtjs/composition-api'
import Card from '../components/common/Card.vue'
import { firestore } from '../plugins/firebase'
export default defineComponent({
  components: {
    Card,
  },
  setup() {
    const posts = ref([])
    onMounted(() => {
      /* 全てのドキュメントを配列に代入 */
      firestore
        .collection('posts')
        .get()
        .then((docs) => {
          // success
          if (docs) {
            docs.forEach((doc) => {
              posts.value=[...posts.value,doc.data()]
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
    })
    return {
      //全投稿データ
      posts,
    }
  },
})
</script>
