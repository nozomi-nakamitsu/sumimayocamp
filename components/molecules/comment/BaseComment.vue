<template>
  <div class="base-comment-container">
    <h1>チャット</h1>
    <section>
      <main>
        <div
          v-for="(msg, index) in messages"
          :key="'index-' + index"
          class="message"
          :class="[
            { '-sent': sentOrReceived(msg.uid) === 'sent' },
            { '-received': sentOrReceived(msg.uid) === 'received' },
          ]"
        >
          <img :src="msg.photoURL" :alt="msg.nickName" />
          <p>
            {{ msg.text }}
          </p>
          <div @click="onDelete(msg)">
            <Icon :icon="faEllipsisH" />
          </div>
        </div>

        <div ref="scrollable"></div>
      </main>

      <form @submit.prevent="sendMessage">
        <input
          v-model="message"
          type="text"
          placeholder="Enter your message!"
        />
        <button :disabled="!message" type="submit">📩</button>
      </form>
    </section>
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
import { firestore } from '@/plugins/firebase.js'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import Icon from '@/components/molecules/Icon.vue'

export default defineComponent({
  components: {
    Icon,
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
    const currentUser = store.getters.getCurrentUser
    let unsubscribe = null as any

    // ページ遷移後にsnapshotでの監視をstartする
    onMounted(() => {
      unsubscribe = firestore
        .collection('posts')
        .doc(props.postId)
        .collection('messages')
        .orderBy('createdAt')
        .onSnapshot((snapshot) => {
          messages.value = snapshot.docs.map((doc) => doc.data())
        })
    })
    // メッセージを送信する
    const sendMessage = async () => {
      const id = await firestore.collection('posts').doc().id
      const messageInfo = {
        uid: currentUser.uid,
        nickName: currentUser.nickName,
        photoURL: currentUser.photoURL,
        text: message.value,
        postId: props.postId,
        createdAt: Date.now(),
        id: id,
      }
      await firestore
        .collection('posts')
        .doc(props.postId)
        .collection('messages')
        .doc(id)
        .set(messageInfo)
      message.value = ''
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
    const onDelete = async (msg: any) => {
      if (msg.uid !== currentUser.uid) {
        return
      }
      try {
        await firestore
          .collection('posts')
          .doc(props.postId)
          .collection('messages')
          .doc(msg.id)
          .delete()
      } catch (e) {
        console.error(e)
      }
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
      // アイコン
      faEllipsisH,
    }
  },
})
</script>
