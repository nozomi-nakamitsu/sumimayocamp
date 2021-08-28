import { ref } from '@nuxtjs/composition-api'
import { EmojiType } from '@/types/props-types'
import firebase, { firestore, } from '@/plugins/firebase'
export const useEmoji = (props: any, currentUser: any) => {
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
  const selectEmoji = async (item: any, id: string) => {
    try {
      const displayselectedItemIsd = JSON.parse(
        JSON.stringify(selectedItem.value)
      ).map((v: EmojiType) => v.id)
      if (!selectedItem.value) {
        selectedItem.value = item.unified
        return
      } else if (displayselectedItemIsd.includes(item.id)) {
        selectedItem.value = selectedItem.value.filter((v) => v.id !== item.id)
        await firestore
        .collection('posts')
        .doc(props.post.id).update({
          "emojiItems.users": firebase.firestore.FieldValue.arrayRemove(currentUser.uid )
        })
        return
      } else {
        selectedItem.value = [...selectedItem.value, item]
      }
     await firestore
        .collection('posts')
        .doc(props.post.id).update({
          "emojiItems.item": item,
          "emojiItems.users": firebase.firestore.FieldValue.arrayUnion(currentUser.uid )
        })
    } catch (e) {
      // エラー時は選択した絵文字を画面から削除する
      selectedItem.value = selectedItem.value.filter((v) => v.id !== item.id)
      console.error(e)
    } finally {
      switchVisible()
    }
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
