<template>
  <div class="emoji-container">
    <div class="items">
      <div
        v-for="(emojiItem, index) in emojiItems"
        :key="index"
        class="wrapper"
      >
        <div class="box" :class="{ '-active': isMyEmoji(emojiItem.users) }">
          <Emoji :emoji="emojiItem" :size="20" class="emoji-image" />
          <p class="count">{{ emojiItem.users.length }}</p>
        </div>
      </div>
      <div v-for="item in selectedItem" :key="item.id" class="wrapper -active">
        <div class="box">
          <Emoji :emoji="item.item" :size="20" class="emoji-image" />
          <p class="count">{{ item.users.length }}</p>
        </div>
      </div>
      <div class="wrapper">
        <div
          class="box"
          @mouseover="$emit('on-focus', true)"
          @click="$emit('on-clicked', true)"
        >
          <Icon :icon="faSmile" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  useStore,
  PropType,
  watchEffect,
  computed,
  ref,
} from '@nuxtjs/composition-api'
import { EmojiType, Post, EmojiUser } from '@/types/props-types'

import { isCurrentUser } from '@/compositions/useAuth'
import { Emoji } from 'emoji-mart-vue'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import Icon from './Icon.vue'

export default defineComponent({
  components: {
    Emoji,
    Icon,
  },
  props: {
    selectedItem: {
      type: Array as () => PropType<EmojiType>,
      default: [],
    },
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  emits: ['on-focus', 'on-clicked'],
  setup(props) {
    // compositionAPI
    const store = useStore()
    // ref系
    const currentUser = store.getters.getCurrentUser

    const emojiItems = computed(() => {
      const target = JSON.parse(JSON.stringify(props.post.emojiItems))
      return target.filter((v: any) => v.users.length !== 0)
    })
    // 自分の絵文字かどうかを判定する
    const isMyEmoji = computed(() => (users: EmojiUser[]): boolean => {
      if (users.length === 0) {
        return false
      }
      const usersIds = users.map((user: EmojiUser) => user.uid)
      return usersIds.includes(currentUser.uid)
    })
    return {
      // 認証系
      isCurrentUser,
      currentUser,
      // アイコン
      faSmile,
      //絵文字
      emojiItems,
      isMyEmoji,
    }
  },
})
</script>
