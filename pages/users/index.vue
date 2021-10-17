<template>
  <div class="common-container">
    <div class="title">
      <p class="text">Members List</p>
      <div class="line"></div>
    </div>
    <div class="member-list-container">
      <div v-for="user in allUsers" :key="user.uid">
        <MemberCard
          :user="user"
          :declaration="declaration(user.uid)"
          @open-modal="openFunc"
        />
      </div>
    </div>
    <UserModal
      :control-flag="isOpened"
      :posts="posts"
      :user="targetUser"
      @click="closeFunc"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  ref,
  onBeforeUnmount,
  useStore,
  computed,
} from '@nuxtjs/composition-api'
import MemberCard from '@/components/organisms/MemberCard.vue'
import { UsersRef, DeclarationRef, PostRef } from '@/utilities/useFirestore'
import { User, Declaration, Post } from '@/utilities/useConverter'
import { useModal } from '@/compositions/useModal'
import UserModal from '@/components/organisms/UserModal.vue'

export default defineComponent({
  components: {
    MemberCard,
    UserModal,
  },
  setup() {
    const { isOpened, openModal, closeModal } = useModal()
    const allUsers = ref<User[]>([])
    const targetUser = ref<User | null>(null)
    const store = useStore()
    const declarations = ref<Declaration[]>([])

    const posts = ref<Post[]>([])
    let unsubscribeDeclaration = null as any

    // ユーザー一覧データを取得する
    onBeforeMount(() => {
      UsersRef()
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            allUsers.value = [...allUsers.value, doc.data()]
          })
        })
      getDeclaration()
    })
    const getDeclaration = () => {
      unsubscribeDeclaration = DeclarationRef().onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(
          (change) => {
            declarations.value = [...declarations.value, change.doc.data()]
          },
          (error: any) => {
            store.dispatch('onRejected', error)
          }
        )
      })
    }
    const declaration = computed(() => (uid: string) => {
      const target = declarations.value.find(
        (declaration: Declaration) => declaration.uid === uid
      )
      if (target) {
        return target.declaration
      }
      return ''
    })

    // ページ遷移後にsnapshotでの監視をstopする
    onBeforeUnmount(() => {
      unsubscribeDeclaration()
    })
    // ユーザーに紐づいた投稿情報を取得し、モーダルに表示する
    const openFunc = async (user: User) => {
      targetUser.value = user
      const querySnapshot = await PostRef()
        .where('user_id', '==', user.uid)
        .orderBy('updated_at', 'desc')
        .get()
      posts.value = await querySnapshot.docs.map((doc) => doc.data())
      openModal()
    }
    // postsを初期化し、モーダルに非表示にする
    const closeFunc = () => {
      posts.value = []
      targetUser.value = null
      closeModal()
    }
    return {
      allUsers,
      declaration,
      openFunc,
      closeFunc,
      isOpened,
      posts,
      targetUser,
    }
  },
})
</script>
