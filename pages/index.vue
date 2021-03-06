<template>
  <div class="common-container -scrollx">
    <div class="title">
      <p class="text">My DashBoard</p>
      <div class="line"></div>
    </div>
    <div class="index-container">
      <div class="container -start">
        <p class="title">ポスト</p>
        <div v-for="post in posts" :key="post.id" class="items">
          <Card :post="post" />
        </div>
      </div>
      <div class="container -start">
        <div class="wrapper">
          <div class="title">今週のキャンプ</div>
          <div>
            <TheDeclaration :declaration="declaration" />
          </div>
          <p class="title">カレンダー</p>
          <div class="calendar">
            <BaseCalendar :posts="posts" :current-user="currentUser" />
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
  ref,
  useStore,
} from '@nuxtjs/composition-api'
import _ from 'lodash'
import { CurrentUser, Post } from '@/types/props-types'
import Card from '@/components/organisms/Card.vue'
import { UsersRef, DeclarationRef } from '~/utilities/useFirestore'
import { Declaration } from '~/utilities/useConverter'

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
    const currentUser = store.getters['auth/getCurrentUser']
    const posts = ref<Post[]>([])
    const declaration = ref<Declaration | null>(null)
    let unsubscribe = null as any
    let unsubscribeDeclaration = null as any

    const allUsers = ref<CurrentUser[]>([])
    // ユーザー一覧データを取得する
    const getAllUsers = () => {
      UsersRef()
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            allUsers.value = [...allUsers.value, doc.data()] as CurrentUser[]
          })
        })
    }
    // 投稿一覧データを取得する
    onBeforeMount(async () => {
      await getAllUsers()
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
                removePost(change.doc.data() as Post)
              }
            },
            (error: any) => {
              store.dispatch('auth/onRejected', error)
            }
          )
        })
      getDeclaration()
    })
    // ページ遷移後にsnapshotでの監視をstopする
    onBeforeUnmount(() => {
      unsubscribe()
      unsubscribeDeclaration()
    })

    const getDeclaration = () => {
      unsubscribeDeclaration = DeclarationRef()
        .where('uid', '==', store.getters['auth/getCurrentUser'].uid)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach(
            (change) => {
              declaration.value = change.doc.data()
            },
            (error: any) => {
              store.dispatch('auth/onRejected', error)
            }
          )
        })
    }

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

    // 投稿が削除された時、表示配列から削除アイテムを取り除く
    const removePost = (data: Post) => {
      posts.value = posts.value.filter((v: Post) => v.id !== data.id)
    }
    return {
      // 全投稿データ
      posts,
      currentUser,
      declaration,
    }
  },
})
</script>
