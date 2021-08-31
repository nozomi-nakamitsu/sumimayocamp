import { ref } from '@nuxtjs/composition-api'
import { CurrentUser } from '@/types/props-types'
import { firestore } from '@/plugins/firebase'
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
  const selectEmoji = async (item: any) => {
    try {
      const displayselectedItemIsd = JSON.parse(
        JSON.stringify(selectedItem.value)
      ).map((v: any) => v.item.id)

      const displayPropsItems = JSON.parse(
        JSON.stringify(props.post.emojiItems)
      ).map((v: any) => v.id)
      const displayPropsMyItems = JSON.parse(
        JSON.stringify(props.post.emojiItems)
      ).map((v: any) => {
        const uids = v.users.map((user: CurrentUser) => user.uid)
        if (uids.includes(currentUser.uid)) {
          return v.id
        }
      })
      if (!selectedItem.value) {
        selectedItem.value = item.unified
        return
      } else if (displayselectedItemIsd.includes(item.id)) {
        // NOTE:同じものを二回目に押した時は、絵文字を削除
        selectedItem.value = selectedItem.value.filter(
          (v) => v.item.id !== item.id
        )
        await firestore
          .collection('posts')
          .doc(props.post.id)
          .collection('emojiItems')
          .doc(item.id)
          .collection('users')
          .doc(currentUser.uid)
          .delete()
        return
      } else if (displayPropsMyItems.includes(item.id)) {
        // NOTE:同じものを二回目に押した時は、絵文字を削除
        const targetEmoji = props.post.emojiItems.find(
          (emojiItem: any) => emojiItem.id === item.id
        )
        if (targetEmoji.users.length === 1) {
          await firestore
            .collection('posts')
            .doc(props.post.id)
            .collection('emojiItems')
            .doc(item.id)
            .delete()
        }
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
        if (!displayPropsItems.includes(item.id)) {
          selectedItem.value = [
            ...selectedItem.value,
            {
              item,
              users: [
                { ...currentUser, item_id: item.id, post_id: props.post.id },
              ],
            },
          ]
        }
        // NOTE: 絵文字データをサブコレクションとしてfirestoreに追加
        await firestore
          .collection('posts')
          .doc(props.post.id)
          .collection('emojiItems')
          .doc(item.id)
          .set({ ...item })
        // NOTE: 絵文字のユーザーデータをサブサブコレクションとしてfirestoreに追加
        await firestore
          .collection('posts')
          .doc(props.post.id)
          .collection('emojiItems')
          .doc(item.id)
          .collection('users')
          .doc(currentUser.uid)
          .set({ ...currentUser, item_id: item.id, post_id: props.post.id })
      }
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
