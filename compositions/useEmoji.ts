import { ref, useRouter } from '@nuxtjs/composition-api'
import { CurrentUser, EmojiType, Post } from '@/types/props-types'
import firebase, { firestore } from '@/plugins/firebase'
export const useEmoji = (props: any, currentUser: any) => {
  const router = useRouter()
  const selectedItem = ref<any[]>([])
  const displayPost = ref<any>(props.post)
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
      const displayPropsItems = JSON.parse(
        JSON.stringify(props.post.emojiItems)
      ).map((v: any) => v.item.item.id)

      const displayPropsMyItems = JSON.parse(
        JSON.stringify(props.post.emojiItems)
      ).map((v: any) => {
        const uids = v.users.map((user: CurrentUser) => user.uid)
        if (uids.includes(currentUser.uid)) {
          return v.item.item.id
        }
      })

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
      } else if (displayPropsMyItems.includes(item.id)) {
        // NOTE:同じものを二回目に押した時は、絵文字を削除
        await firestore
          .collection('posts')
          .doc(props.post.id)
          .collection('emojiItems')
          .doc(item.id)
          .collection('users')
          .doc(currentUser.uid)
          .delete()
       router.go(0)
        return
      } else {
        if (displayPropsItems.indexOf(item.id) === -1) {
          selectedItem.value = [...selectedItem.value, item]
        } else {
          router.go(0)

          // const target = displayPost.value.emojiItems.find(
          //   (v: any) => v.item.item.id === item.id
          // )
          // console.log('target', target)
          // displayPost.value = {
          //   ...displayPost.value,
          //   emojiItems: {
          //     users: [...target.users, currentUser],
          //     item: { ...target.item },
          //   },
          // }
          console.log(' displayPost.value ', displayPost.value)
          // displayPost.value. = [
          //   ...displayPost.value.emojiItems.users,
          //   currentUser,
          // ]
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
    displayPost,

    isFormVisible,
    onFocus,
    onRemoveFocus,
    selectEmoji,
    switchVisible,
  }
}
