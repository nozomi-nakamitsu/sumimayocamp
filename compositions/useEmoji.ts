import { ref } from '@nuxtjs/composition-api'
import { EmojiType } from '../types/props-types'
export const useEmoji = () => {
  const selectedItem = ref<EmojiType[]>([])
  const isFormVisible = ref<Boolean>(false)
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
    selectedItem,
    isFormVisible,
    onFocus,
    onRemoveFocus,
    selectEmoji,
    switchVisible,
  }
}
