<template>
  <div class="emoji-container">
    <div class="items">
      <div v-for="(item, index) in selectedItem" :key="index" class="wrapper">
        <div class="box">
          <Emoji :emoji="item" :size="20" class="emoji-image" />
        </div>
      </div>
      <div class="wrapper">
        <div class="box" @mouseover="onFocus" @click="switchVisible">
          <Icon :icon="faSmile" />
        </div>
      </div>
    </div>
    <div v-if="isFormVisible" @mouseleave="onRemoveFocus" class="form">
      <Picker @select="selectEmoji" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, useStore, ref } from '@nuxtjs/composition-api'
import { EmojiType } from '../../../types/props-types'

import { isCurrentUser } from '../../../compositions/useAuth'
import { Emoji, Picker } from 'emoji-mart-vue'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import Icon from '../Icon.vue'

export default defineComponent({
  components: {
    Picker,
    Emoji,
    Icon,
  },
  props: {},

  setup(props) {
    // compositionAPI
    const store = useStore()
    // ref系
    const currentUser = store.getters.getCurrentUser
    const selectedItem = ref<EmojiType[]>([])
    const isFormVisible = ref<Boolean>(false)
    // フォーカスされた時に、絵文字選択フォームを表示
    const onFocus = () => {
      isFormVisible.value = true
    }
    const onRemoveFocus = () => {
      isFormVisible.value = false
    }
    const switchVisible = () => {
      isFormVisible.value = !isFormVisible.value
    }
    // 絵文字を選択する
    const selectEmoji = (item: any) => {
      if (!selectedItem.value) {
        selectedItem.value = item.unified
      } else if (selectedItem.value.includes(item)) {
        selectedItem.value = selectedItem.value.filter((v) => v.id !== item.id)
      } else {
        selectedItem.value = [...selectedItem.value, item]
      }
      switchVisible()
    }

    return {
      // 認証系
      isCurrentUser,
      currentUser,
      // ref
      isFormVisible,
      // 絵文字選択
      selectEmoji,
      selectedItem,
      // アイコン
      faSmile,
      // 表示非表示の切り替え
      onFocus,
      onRemoveFocus,
      switchVisible,
    }
  },
})
</script>
