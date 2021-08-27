<template>
  <div class="emoji-container">
    <div class="items">
      <div v-for="(item, index) in selectedItem" :key="index" class="wrapper">
        <div class="box">
          <Emoji :emoji="item" :size="20" class="emoji-image" />
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
import { defineComponent, useStore, PropType } from '@nuxtjs/composition-api'
import { EmojiType } from '../../types/props-types'

import { isCurrentUser } from '../../compositions/useAuth'
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
  },
  emits: ['on-focus', 'on-clicked'],
  setup(props) {
    // compositionAPI
    const store = useStore()
    // ref系
    const currentUser = store.getters.getCurrentUser
    return {
      // 認証系
      isCurrentUser,
      currentUser,
      // アイコン
      faSmile,
    }
  },
})
</script>
