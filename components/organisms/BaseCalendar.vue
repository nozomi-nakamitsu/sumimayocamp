<template>
  <div class="calendar-container">
    <v-calendar :attributes="attributes">
      <!-- TODO: v-slotで投稿詳細に飛ぶようにしたい -->
      <!-- <div slot="todo-row" slot-scope="{ customData }" class="todo-row">
        <a @click="addTodo(customData)"> + Add Todo </a>
      </div> -->
    </v-calendar>
    <div class="calendar-sidebar">
      <div v-for="(user, index) in allUsers" :key="index" class="items">
        <div class="item">
          <Icon :icon="faCircle" types="calendar" :color="user.color" />
          <div class="image">
            <img class="img" alt="" :src="user.photoURL" />
          </div>
          <p class="text">{{ user.nickName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  useRouter,
  useStore,
  ref,
  watch,
  onBeforeMount,
} from '@nuxtjs/composition-api'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { Post, CalendarData, UserWithColor } from '@/types/props-types'
import { firestore } from '@/plugins/firebase.js'
import Icon from '@/components/molecules/Icon.vue'
export default defineComponent({
  components: {
    Icon,
  },
  props: {
    posts: {
      type: Array as () => Array<Post>,
      required: true,
    },
  },

  setup(props) {
    // compositionAPI
    const store = useStore()
    // ref系
    const currentUser = store.getters.getCurrentUser
    const calenderDatas = ref<CalendarData[]>([])
    const allUsers = ref<UserWithColor[]>([])
    let colors = [
      'blue',
      'yellow',
      'green',
      'orange',
      'purple',
      'indigo',
      'brown',
    ]
    // ユーザー一覧データを取得する
    onBeforeMount(() => {
      firestore
        .collection('users')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // ログインユーザーであれば赤、それ以外であればランダムで重複しないように色を決めている
            // WARNING:利用ユーザーが9人以上になれば、このメソッドやと動かなくなる
            const targetUser = doc.data()
            if (targetUser.uid === currentUser.uid) {
              targetUser.color = 'red'
            } else if (allUsers.value.length > 9) {
              colors = [
                'blue',
                'yellow',
                'green',
                'orange',
                'purple',
                'indigo',
                'brown',
              ]
              var rand = Math.floor(Math.random() * colors.length)
              targetUser.color = colors[rand]
              colors.splice(rand, 1)
            } else {
              var rand = Math.floor(Math.random() * colors.length)
              targetUser.color = colors[rand]
              colors.splice(rand, 1)
            }
            if (targetUser.uid === currentUser.uid) {
              allUsers.value = [
                targetUser,
                ...allUsers.value,
              ] as UserWithColor[]
            } else {
              allUsers.value = [
                ...allUsers.value,
                targetUser,
              ] as UserWithColor[]
            }
          })
        })
    })
    watch(
      () => props.posts,
      () => {
        const target = props.posts.map((post: Post) => {
          const postUser = _.find(
            allUsers.value,
            function (user: UserWithColor) {
              return user.uid === post.user_id
            }
          ) as UserWithColor

          return {
            post,
            color: postUser.color,
            user: post.user,
          }
        })
        calenderDatas.value = [...target]
      }
    )

    const attributes = computed(() => {
      return [
        // Attributes for calenderDatas
        {
          key: 'today',
          highlight: true,
          dates: new Date(),
        },
        ...calenderDatas.value.map((calenderData) => ({
          dates: calenderData.post.updated_at.toDate(),
          dot: {
            color: calenderData.color,
          },
          customData: calenderData,
          popover: {
            label: calenderData.post.title,
            visibility: 'click',
            slot: 'todo-row',
          },
        })),
      ]
    })

    return {
      calenderDatas,
      attributes,
      allUsers,
      // icon
      faCircle,
    }
  },
})
</script>
