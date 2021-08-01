<template>
  <div>
    <p>メイン</p>
    <div><Card /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import Card from '../components/common/Card.vue'
import { firestore } from '../plugins/firebase'
export default defineComponent({
  components: {
    Card,
  },
  setup() {
    onMounted(() => {
      /* 全てのドキュメントを配列に代入 */
      const posts = []
      firestore
        .collection('posts')
        .get()
        .then((docs) => {
          // success
          if (docs) {
            docs.forEach((doc) => {
              posts.push(doc.data())
            })
          }
          console.log(posts)
        })
        .catch((error) => {
          console.error(error)
        })
    })
    return {}
  },
})
</script>
