<template>
  <div class="common-container">
    <div class="title">
      <p class="text">Members List</p>
      <div class="line"></div>
    </div>
    <div class="member-list-container">
      <div v-for="user in allUsers" :key="user.uid">
        <MemberCard :user="user" :declaration="declaration(user.uid)" />
      </div>
    </div>
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
import { UsersRef, DeclarationRef } from '@/utilities/useFirestore'
import { User, Declaration } from '@/utilities/useConverter'

export default defineComponent({
  components: {
    MemberCard,
  },
  setup() {
    const allUsers = ref<User[]>([])
    const store = useStore()
    const declarations = ref<Declaration[]>([])
    let unsubscribeDeclaration = null as any

    // ユーザー一覧データを取得する
    onBeforeMount(() => {
      UsersRef()
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(function (doc) {
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

    return {
      allUsers,
      declaration,
    }
  },
})
</script>
