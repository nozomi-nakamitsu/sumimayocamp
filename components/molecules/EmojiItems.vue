<template>
  <div class="emoji-container">
    <div class="items">
      <div
        v-for="(emojiItem, index) in emojiItems"
        :key="index"
        class="wrapper"
      >
        <div class="box">
          <Emoji :emoji="emojiItem.item.item" :size="20" class="emoji-image" />
          <p class="count">{{ emojiItem.users.length }}</p>
        </div>
      </div>
      <div v-for="item in selectedItem" :key="item.id" class="wrapper">
        <div class="box">
          <Emoji :emoji="item" :size="20" class="emoji-image" />
          <p class="count">1</p>
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
import { EmojiType, Post } from '@/types/props-types'

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
      console.log('target', target)
      return target.filter((v: any) => v.users.length !== 0)
    })
    // watchEffect(() => {
    //   console.log('emojiItems', emojiItems.value)
    //   // const aaa = emojiItems.value.map((v: any) => v)
    //   // console.log('aaa', aaa)
    // })
    return {
      // 認証系
      isCurrentUser,
      currentUser,
      // アイコン
      faSmile,
      //絵文字
      emojiItems,
    }
  },
})
</script>
