<template>
  <div class="emoji-container">
    <div class="items">
      <div v-for="(item, index) in selectedItem" :key="index" class="wrapper">
        <div class="box">
          <Emoji :emoji="item" :size="20" class="emoji-image" />
        </div>
      </div>
    </div>

    <div>
      <Picker @select="selectEmoji" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, useStore, ref } from '@nuxtjs/composition-api'
import { EmojiType } from '../../../types/props-types'

import { isCurrentUser } from '../../../compositions/useAuth'
import { Emoji, Picker } from 'emoji-mart-vue'
export default defineComponent({
  components: {
    Picker,
    Emoji,
  },
  props: {},

  setup(props) {
    // compositionAPI
    const store = useStore()
    // ref系
    const currentUser = store.getters.getCurrentUser
    const selectedItem = ref<EmojiType[]>([])
    // 絵文字を選択する
    const selectEmoji = (item: any) => {
      if (!selectedItem.value) {
        selectedItem.value = item.unified
      } else if (selectedItem.value.includes(item)) {
        return (selectedItem.value = selectedItem.value.filter(
          (v) => v.id !== item.id
        ))
      } else {
        selectedItem.value = [...selectedItem.value, item]
      }
    }

    return {
      isCurrentUser,
      currentUser,
      // 絵文字選択
      selectEmoji,
      selectedItem,
    }
  },
})
</script>
