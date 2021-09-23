<template>
  <div class="common-container">
    <div class="title">
      <p class="text">My DashBoard</p>
      <div class="line"></div>
    </div>
    <div class="index-container">
      <div class="container">
        <p class="title">ポスト</p>
        <div v-for="post in posts" :key="post.id" class="items">
          <Card :post="post" />
        </div>
      </div>
      <div class="container -start">
        <div class="wraper">
          <p class="title">今週のキャンプ</p>
          <div>
            <TheDeclaration />
          </div>
          <p class="title">カレンダー</p>
          <div class="calendar">
            <BaseCalendar :posts="posts" />
          </div>
        </div>
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
  useStore,
} from '@nuxtjs/composition-api'
import _ from 'lodash'
import { CurrentUser, Post } from '@/types/props-types'
import Card from '@/components/organisms/Card.vue'
import { firestore } from '@/plugins/firebase'
import TheDeclaration from '~/components/organisms/TheDeclaration.vue'
import BaseCalendar from '~/components/organisms/BaseCalendar.vue'

export default defineComponent({
  components: {
    Card,
    TheDeclaration,
    BaseCalendar,
  },
  setup() {
    // compositionAPI
    const store = useStore()
    const currentUser = store.getters.getCurrentUser
    const posts = ref<Post[]>([])
    let unsubscribe = null as any
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
                      const emojiUser = [] as CurrentUser[]
                      v.ref.collection('users').onSnapshot((usersSnapshot) => {
                        usersSnapshot.docChanges().forEach((changeUser) => {
                          if (changeUser.type === 'added') {
                            usersSnapshot.docs.map((user: any) => {
                              const emojiUserids = emojiUser.map(
                                (user) => user.uid
                              )
                              if (emojiUserids.includes(user.data().uid)) {
                                return addEmojiMember(
                                  item,
                                  emojiUser,
                                  postData as Post
                                )
                              } else {
                                emojiUser.push(user.data())
                                return addEmojiMember(
                                  item,
                                  emojiUser,
                                  postData as Post
                                )
                              }
                            })
                          } else if (changeUser.type === 'removed') {
                            if (usersSnapshot.docs.length === 0) {
                              const targetEmoji = postData.emojiItems.find(
                                (emojiItem: any) => emojiItem.id === item.id
                              )
                              const targetEmojiIds = postData.emojiItems.map(
                                (item: any) => item.id
                              )
                              if (targetEmojiIds && targetEmoji) {
                                targetEmoji.users = targetEmoji.users.filter(
                                  (user: any) => user.uid !== currentUser.uid
                                )
                                const emojiIndex = targetEmojiIds.indexOf(
                                  item.id
                                )
                                postData.emojiItems.splice(
                                  emojiIndex,
                                  1,
                                  targetEmoji
                                )
                                return
                              }
                            }
                            usersSnapshot.docs.forEach((user: any) => {
                              const targetPost = posts.value.find(
                                (post: Post) => post.id === user.data().post_id
                              )
                              const targetEmoji = targetPost?.emojiItems.find(
                                (item: any) => item.id === user.data().item_id
                              )

                              const targetEmojiIds = targetPost?.emojiItems.map(
                                (item: any) => item.id
                              )
                              const postIds = posts.value.map(
                                (post: Post) => post.id
                              )

                              if (targetPost && targetEmojiIds && targetEmoji) {
                                targetEmoji.users = targetEmoji.users.filter(
                                  (user: any) => user.uid !== currentUser.uid
                                )

                                const emojiIndex = targetEmojiIds.indexOf(
                                  user.data().item_id
                                )

                                const postiIndex = postIds.indexOf(
                                  user.data().post_id
                                )

                                posts.value[postiIndex].emojiItems.splice(
                                  emojiIndex,
                                  1,
                                  targetEmoji
                                )
                              }
                            })
                          }
                        })
                      })
                      return { ...item, users: emojiUser as CurrentUser[] }
                    })
                    postData.emojiItems = getEmojiData
                    const targetUser = _.find(
                      allUsers.value,
                      function (user: CurrentUser) {
                        return user.uid === postData.user_id
                      }
                    )
                    postData.user = { ...targetUser }
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

    // 絵文字押されたときに、user情報EmojiItemに追加する
    const addEmojiMember = (item: any, emojiUser: any, postData: Post) => {
      const targetEmojiIds = postData.emojiItems.map((item: any) => item.id)
      const postIds = posts.value.map((post: Post) => post.id)
      const emojiIndex = targetEmojiIds.indexOf(item.id)
      const postiIndex = postIds.indexOf(postData.id)
      posts.value[postiIndex].emojiItems.splice(emojiIndex, 1, {
        ...item,
        users: [...emojiUser],
      })
    }
    return {
      // 全投稿データ
      posts,
    }
  },
})
</script>
