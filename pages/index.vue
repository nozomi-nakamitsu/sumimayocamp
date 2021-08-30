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
  ref,
  useAsync,
} from '@nuxtjs/composition-api'
import Card from '../components/organisms/Card.vue'
import { firestore } from '../plugins/firebase'
export default defineComponent({
  components: {
    Card,
  },
  setup() {
    const posts = ref<any>([])
    useAsync(() => {
      firestore
        .collection('posts')
        .orderBy('updated_at', 'desc')
        .get()
        .then((docs) => {
          // success
          if (docs) {
            docs.forEach((doc) => {
              firestore
                .collection('users')
                .doc(doc.data().user_id)
                .get()
                .then((userdocs) => {
                  const postsObj: any = {
                    id: doc.data().id,
                    user_id: doc.data().user_id,
                    title: doc.data().title,
                    content: doc.data().content,
                    url: doc.data().url,
                    movieUrl: doc.data().movieUrl,
                    learn: doc.data().learn,
                    created_at: doc.data().created_at,
                    updated_at: doc.data().updated_at,
                    user: userdocs.data(),
                  }
                  posts.value = [...posts.value, postsObj]
                })
            })
          }
        })
        .catch(function (error) {
          console.error('Error : ', error)
        })
    })
    return {
      // 全投稿データ
      posts,
    }
  },
})
</script>
