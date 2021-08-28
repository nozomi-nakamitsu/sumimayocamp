import { ref } from '@nuxtjs/composition-api'
import { EmojiType } from '@/types/props-types'
import firebase, { firestore } from '@/plugins/firebase'
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
        // NOTE:同じものを二回目に押した時は、絵文字を削除
        selectedItem.value = selectedItem.value.filter((v) => v.id !== item.id)
        await firestore
          .collection('posts')
          .doc(props.post.id)
          .collection('emojiItems')
          .doc(item.id)
          .collection('users')
          .doc(currentUser.uid)
          .delete()
        return
      } else {
        selectedItem.value = [...selectedItem.value, item]
      }
      //NOTE: 絵文字データをサブコレクションとしてfirestoreに追加
      await firestore
        .collection('posts')
        .doc(props.post.id)
        .collection('emojiItems')
        .doc(item.id)
        .set({
          item: item,
        })
      // NOTE: 絵文字のユーザーデータをサブサブコレクションとしてfirestoreに追加
      await firestore
        .collection('posts')
        .doc(props.post.id)
        .collection('emojiItems')
        .doc(item.id)
        .collection('users')
        .doc(currentUser.uid)
        .set({ ...currentUser })
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
