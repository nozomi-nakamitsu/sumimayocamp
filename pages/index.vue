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
                      const item = v.data() 
                      var emojiUser = <CurrentUser[]>[]
                      v.ref.collection('users').onSnapshot((usersSnapshot) => {
                        usersSnapshot.docChanges().forEach((changeUser) => {
                          if (changeUser.type === 'added') {
                            usersSnapshot.docs.map((user: any) => {
                              const emojiUserids = emojiUser.map(
                                (user) => user.uid
                              )
                              if (emojiUserids.includes(user.data().uid)) {
                                return
                              } else {
                                emojiUser.push(user.data())
                              }
                            })
                          } else if (changeUser.type === 'removed') {
                           if(usersSnapshot.docs.length===0){
                       
                

                            var targetEmoji= postData.emojiItems.find((emojiItem:any)=>emojiItem.id ===item.id)
                            const targetEmojiIds=postData.emojiItems.map((item:any)=>item.id)
                            if(targetEmojiIds&&targetEmoji){
                            
                            targetEmoji.users=  targetEmoji.users.filter((user:any)=>user.uid !==currentUser.uid)
                              const emojiIndex=targetEmojiIds.indexOf(item.id)
                
                          
                            postData.emojiItems.splice(emojiIndex, 1, targetEmoji)
            
                           return
                            }

                           }
                            usersSnapshot.docs.forEach((user: any) => {
                           
                            const targetPost=posts.value.find((post)=>post.id===user.data().post_id)
                            var targetEmoji= targetPost?.emojiItems.find((item:any)=>item.id===user.data().item_id)
                           
                            const targetEmojiIds=targetPost?.emojiItems.map((item:any)=>item.id)
                            const postIds=posts.value.map((post:Post)=>post.id)

                            if(targetPost&&targetEmojiIds&&targetEmoji){
                            
                               targetEmoji.users=[{...user.data()}]
                       
                              const emojiIndex=targetEmojiIds.indexOf(user.data().item_id)
                      
                              const postiIndex=postIds.indexOf(user.data().post_id)
                          
                              posts.value[postiIndex].emojiItems.splice(emojiIndex, 1, targetEmoji)
            
                           
                            }
                             
                          


                            })
                          }
                        })
                      })

                      return { ...item, users: emojiUser as CurrentUser[] }
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
    return {
      // 全投稿データ
      posts,
    }
  },
})
</script>
