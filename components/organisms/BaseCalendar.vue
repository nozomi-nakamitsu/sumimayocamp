<template>
  <div class="calendar-container">
    <v-calendar :attributes="attributes" />
    <div class="calendar-sidebar">
      <div class="items" v-for="(user, index) in allUsers" :key="index">
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
import { Post, CalendarData, UserWithColor } from '@/types/props-types'
import { firestore } from '@/plugins/firebase.js'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import Icon from '@/components/molecules/Icon.vue'
import _ from 'lodash'
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
    var colors = [
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
            post: post,
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
        ...calenderDatas.value.map((calenderData) => ({
          dates: calenderData.post.updated_at.toDate(),
          dot: {
            color: calenderData.color,
          },
          popover: {
            label: calenderData.post.title,
            visibility: 'click',
          },
          customData: calenderData,
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
