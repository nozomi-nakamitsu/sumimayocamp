<template>
  <div class="emoji-container">
    <div class="items">
      <div
        v-for="(emojiItem, index) in emojiItems"
        :key="index"
        class="wrapper"
      >
        <div v-if="isHoverd === emojiItem.id">
          <EmojiBalloonBox :users="emojiItem.users" />
        </div>
        <div
          class="box"
          :class="[
            { '-active': isMyEmoji(emojiItem.users) },
            { '-pr': isHoverd === emojiItem.id },
          ]"
          @mouseover="mouseOverAction(emojiItem.id)"
          @click="onClick(emojiItem)"
        >
          <Emoji :emoji="emojiItem" :size="20" class="emoji-image" />
          <p class="count">{{ emojiItem.users.length }}</p>
        </div>
      </div>
      <div v-for="item in selectedItem" :key="item.id" class="wrapper -active">
        <div v-if="isHoverd === item.item.id">
          <EmojiBalloonBox :users="item.users" />
        </div>
        <div
          class="box"
          @mouseover="mouseOverAction(item.item.id)"
          @click="DeleteSelectEmojiItem(item.item)"
        >
          <Emoji :emoji="item.item" :size="20" class="emoji-image" />
          <p class="count">{{ item.users.length }}</p>
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
  computed,
  ref,
  SetupContext,
} from '@nuxtjs/composition-api'

import { Emoji } from 'emoji-mart-vue'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import Icon from './Icon.vue'
import EmojiBalloonBox from './EmojiBalloonBox.vue'
import { EmojiType, Post, EmojiUser } from '@/types/props-types'
import { isCurrentUser } from '@/compositions/useAuth'
import { firestore } from '@/plugins/firebase'

export default defineComponent({
  components: {
    Emoji,
    Icon,
    EmojiBalloonBox,
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
  emits: ['on-focus', 'on-clicked', 'delete-select-emoji-item'],
  setup(props, context: SetupContext) {
    // compositionAPI
    const store = useStore()
    // ref系
    const currentUser = store.getters.getCurrentUser
    const isHoverd = ref<string>('')
    const emojiItems = computed(() => {
      const target = JSON.parse(JSON.stringify(props.post.emojiItems))
      return target.filter((v: any) => v.users.length !== 0)
    })

    // 自分の絵文字かどうかを判定する
    const isMyEmoji = computed(() => (users: EmojiUser[]): boolean => {
      if (users.length === 0) {
        return false
      }
      const usersIds = users.map((user: EmojiUser) => user.uid)
      return usersIds.includes(currentUser.uid)
    })
    // 絵文字ホバー時に絵文字を押したユーザーを表示する吹き出しを表示する
    const mouseOverAction = (itemId: string) => {
      isHoverd.value = itemId
      setTimeout(() => {
        isHoverd.value = ''
      }, 1000)
    }
    // 自分が押した絵文字(selectedItem以外の絵文字)をクリックすると、絵文字を削除する
    const DeleteEmojiItem = async (emojiItem: any, userIds: string[]) => {
      if (userIds.length === 1) {
        await firestore
          .collection('posts')
          .doc(props.post.id)
          .collection('emojiItems')
          .doc(emojiItem.id)
          .delete()
      }
      await firestore
        .collection('posts')
        .doc(props.post.id)
        .collection('emojiItems')
        .doc(emojiItem.id)
        .collection('users')
        .doc(currentUser.uid)
        .delete()
    }
    // selectedItemの絵文字をクリックすると、絵文字を削除する
    const DeleteSelectEmojiItem = async (emojiItem: any) => {
      await firestore
        .collection('posts')
        .doc(props.post.id)
        .collection('emojiItems')
        .doc(emojiItem.id)
        .collection('users')
        .doc(currentUser.uid)
        .delete()
      context.emit('delete-select-emoji-item', emojiItem)
    }
    const onClick = (emojiItem: any) => {
      // NOTE:ログインユーザーがすでに押している絵文字であれば、絵文字を削除する
      const userIds = emojiItem.users.map((user: EmojiUser) => user.uid)
      if (userIds.includes(currentUser.uid)) {
        DeleteEmojiItem(emojiItem, userIds)
      } else {
        // NOTE:ログインユーザーが押していない絵文字であれば、絵文字を追加する
        AddEmoji(emojiItem)
      }
    }

    // // NOTE: 絵文字のユーザーデータをサブサブコレクションとしてfirestoreに追加
    const AddEmoji = async (emojiItem: any) => {
      await firestore
        .collection('posts')
        .doc(props.post.id)
        .collection('emojiItems')
        .doc(emojiItem.id)
        .collection('users')
        .doc(currentUser.uid)
        .set({ ...currentUser, item_id: emojiItem.id, post_id: props.post.id })
    }

    return {
      // 認証系
      isCurrentUser,
      currentUser,
      // アイコン
      faSmile,
      // 絵文字
      emojiItems,
      isMyEmoji,
      onClick,
      AddEmoji,
      // ref
      isHoverd,
      // だしわけ系メソッド
      mouseOverAction,
      // 絵文字削除
      DeleteEmojiItem,
      DeleteSelectEmojiItem,
    }
  },
})
</script>
