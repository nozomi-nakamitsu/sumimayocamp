import { ref } from '@nuxtjs/composition-api'
import { EmojiType } from '../types/props-types'
export const useEmoji = () => {
  const selectedItem = ref<any[]>([])
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
    const displayselectedItemIsd = JSON.parse(
      JSON.stringify(selectedItem.value)
    ).map((v: EmojiType) => v.id)
    if (!selectedItem.value) {
      selectedItem.value = item.unified
    } else if (displayselectedItemIsd.includes(item.id)) {
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
