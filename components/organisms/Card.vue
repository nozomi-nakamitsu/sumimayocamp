<template>
  <div>
    <div :id="post.title" class="card-container -animation">
      <div class="container">
        <div class="card-head" @click.stop="Router.push(`/posts/${post.id}`)">
          <div class="left">
            <div class="image">
              <img class="img" alt="" :src="post.user.photoURL" />
            </div>
          </div>
          <div class="right">
            <p class="name">
              {{
                post.user.nickName ? post.user.nickName : post.user.displayName
              }}
            </p>
            <p class="date">{{ formatDateToSlashWithTime(post.updated_at) }}</p>
          </div>
        </div>
        <div class="body" @click.stop="Router.push(`/posts/${post.id}`)">
          <p>{{ post.title }}</p>
        </div>
        <div class="footer">
          <div class="emoji">
            <Emojifrom
              :selected-item="selectedItem"
              :post="post"
              @on-focus="onFocus"
              @on-clicked="switchVisible"
              @delete-select-emoji-item="DeleteSelectEmojiItem"
            />
          </div>
          <div v-if="isMyPost(post.user_id)" class="button">
            <BaseSquareMenu
              :edit-path="`/posts/edit/${post.id}`"
              @delete="DeletePost(post.id, post.files)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isFormVisible" class="form" @mouseleave="onRemoveFocus">
      <Picker @select="selectEmoji" />
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  useRouter,
  useStore,
  onMounted,
} from '@nuxtjs/composition-api'
import { Power4, gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Picker } from 'emoji-mart-vue'
import Emojifrom from '../molecules/EmojiItems.vue'
import BaseSquareMenu from '@/components/atoms/BaseSquareMenu.vue'

import { Post } from '@/types/props-types'
import { formatDateToSlashWithTime } from '@/compositions/useFormatData'
import { useEmoji } from '@/compositions/useEmoji'
import { usePost } from '~/compositions/usePost'
import { isCurrentUser } from '@/compositions/useAuth'
gsap.registerPlugin(ScrollTrigger)

export default defineComponent({
  components: {
    Emojifrom,
    Picker,
    BaseSquareMenu,
  },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },

  setup(props) {
    // compositionAPI
    const Router = useRouter()
    const store = useStore()
    // ref系
    const currentUser = store.getters['auth/getCurrentUser']

    // 絵文字関連の処理
    const {
      selectedItem,
      isFormVisible,
      onFocus,
      onRemoveFocus,
      selectEmoji,
      switchVisible,
      DeleteSelectEmojiItem,
    } = useEmoji(props, currentUser)

    onMounted(() => {
      console.log(props.post.id)
      gsapFunc()
    })
    const gsapFunc = () => {
      gsap.from(`#${props.post.title}`, {
        // 動かしたい要素は".a"
        x: -20,
        y: 80, // 右方向に500動く
        rotation: -15,
        opacity: 0,
      })
      gsap.to(`#${props.post.title}`, {
        // 動かしたい要素は".a"
        x: 0,
        y: 0, // 右方向に500動く
        opacity: 1,
        // 右方向に500動く
        duration: 0.8, // アニメーションは1秒間
        rotation: 0,
        scrollTrigger: {
          trigger: `#${props.post.title}`, // 要素".a"がビューポートに入ったときにアニメーション開始
          start: 'top bottom', // アニメーション開始位置
          // markers: true, // マーカー表示
          toggleActions: 'play pause resume reset', // スクロールを戻したらもう一度開始させる
        },
      })
    }
    // 投稿削除
    const { DeletePost, isMyPost } = usePost()
    return {
      DeletePost,
      isCurrentUser,
      currentUser,
      isMyPost,
      useEmoji,
      // フォーマット
      formatDateToSlashWithTime,
      // compositionAPI
      Router,
      // 絵文字選択
      selectEmoji,
      selectedItem,
      // 表示非表示の切り替え
      onFocus,
      onRemoveFocus,
      switchVisible,
      isFormVisible,
      // 絵文字削除
      DeleteSelectEmojiItem,
    }
  },
})
</script>
