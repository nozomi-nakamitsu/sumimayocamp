<template>
  <div class="base-comment-container">
    <div class="header">Comment</div>
    <div class="main">
      <div
        v-for="(msg, index) in messages"
        :key="'index-' + index"
        class="message"
      >
        <BaseCommentItem :message="msg" :types="sentOrReceived(msg.uid)" />
      </div>
    </div>

    <form class="form" @submit.prevent="sendMessage">
      <TheMentionable :set-value="message" @on-selected="changeMessage" />
      <button :disabled="!message" type="submit" class="btn">
        <div class="common-button -comment">
          <Icon :icon="faPaperPlane" types="coment" />
        </div>
      </button>
    </form>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
} from '@nuxtjs/composition-api'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import Icon from '@/components/molecules/Icon.vue'
import TheMentionable from '~/components/molecules/form/TheMentionable.vue'
import BaseCommentItem from '~/components/molecules/comment/BaseCommentItem.vue'
import { MessageRef, OneMessageRef } from '~/utilities/useFirestore'
import { timestamp } from '@/compositions/useFormatData'

import { CurrentUser } from '~/types/props-types'

export default defineComponent({
  components: {
    Icon,
    TheMentionable,
    BaseCommentItem,
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // compositionAPI
    const store = useStore()
    const message = ref<string>('')
    const messages = ref<any[]>([])

    // ref系
    const currentUser = store.getters['auth/getCurrentUser']
    let unsubscribe = null as any

    // ページ遷移後にsnapshotでの監視をstartする
    onMounted(() => {
      unsubscribe = MessageRef(props.postId)
        .orderBy('createdAt')
        .onSnapshot((snapshot) => {
          messages.value = snapshot.docs.map((doc) => doc.data())
          const element = document.querySelector('.main')
          if (element) {
            element.scrollTop = element.scrollHeight
          }
        })
    })
    // メッセージを送信する
    const sendMessage = async () => {
      mentions.value = _.filter(mentions.value, function (item) {
        return message.value.includes(item.nickName)
      })
      const id = uuidv4()
      const messageInfo = {
        uid: currentUser.uid,
        nickName: currentUser.nickName,
        photoURL: currentUser.photoURL,
        text: message.value,
        postId: props.postId,
        createdAt: timestamp(new Date()),
        id,
        mentions: mentions.value,
      }
      await OneMessageRef(props.postId, id).set(messageInfo)
      message.value = ''
      const element = document.querySelector('.main')
      if (element) {
        element.scrollTop = element.scrollHeight
      }
    }
    // ページ遷移後にsnapshotでの監視をstopする
    onBeforeUnmount(() => {
      unsubscribe()
    })

    const sentOrReceived = computed(
      () =>
        (uid: string): string =>
          uid === currentUser.uid ? 'sent' : 'received'
    )
    // コメント削除処理
    const onDelete = async (msg: any) => {
      if (msg.uid !== currentUser.uid) {
        return
      }
      try {
        await OneMessageRef(props.postId, msg.id).delete()
      } catch (error) {
        store.dispatch('auth/onRejected', error)
      }
    }

    const mentions = ref<any[]>([])
    // quillEditerに入力された時に発火
    const changeMessage = (data: {
      selectedUser: CurrentUser[]
      text: string
    }) => {
      mentions.value = [...data.selectedUser]
      message.value = data.text
    }

    return {
      // 認証系
      currentUser,
      //  ref
      message,
      messages,
      // メソッド
      sendMessage,
      sentOrReceived,
      onDelete,
      changeMessage,
      // アイコン
      faPaperPlane,
      // メンション機能
      mentions,
    }
  },
})
</script>
