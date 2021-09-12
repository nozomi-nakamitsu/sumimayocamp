<template>
  <div>
    <div class="declaration-container">
      <h1>今週のキャンプ</h1>
      <p>
        {{ declaration ? declaration.declaration : '宣言しよう！' }}
      </p>
      <v-btn depressed @click="openModal"> 宣言する </v-btn>
    </div>
    <ModalCreateDeclaration
      :control-flag="isOpened"
      title="宣言する"
      types="new"
      @click="closeModal"
      @on-submit="onSubmit"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  useStore,
  onMounted,
  ref,
  onBeforeUnmount,
} from '@nuxtjs/composition-api'
import { Declaration } from '@/types/props-types'

import { useModal } from '@/compositions/useModal'
import ModalCreateDeclaration from '@/components/organisms/ModalCreateDeclaration.vue'
import { firestore } from '@/plugins/firebase.js'
export default defineComponent({
  components: {
    ModalCreateDeclaration,
  },
  props: {},

  setup() {
    const { isOpened, openModal, closeModal } = useModal()
    // compositionAPI
    const store = useStore()
    const currentUser = store.getters.getCurrentUser
    let unsubscribe = null as any
    const declaration = ref<Declaration | undefined>(undefined)
    // snapshotでdeclarationの監視をstartする
    onMounted(() => {
      unsubscribe = firestore
        .collection('declaration')
        .where('uid', '==', currentUser.uid)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach(
            (change) => {
              declaration.value = change.doc.data() as Declaration
            },
            (error: any) => {
              console.error(error)
            }
          )
        })
    })
    // ページ遷移後にsnapshotでの監視をstopする
    onBeforeUnmount(() => {
      unsubscribe()
    })

    /**
     * NOTE:fireStoreに投稿する
     *
     */
    const onSubmit = async (data: { formData: any; types: string }) => {
      try {
        closeModal()
        await firestore
          .collection('declaration')
          .doc(currentUser.uid)
          .set(data.formData)
      } catch (error) {
        console.error(error)
      }
    }

    return {
      isOpened,
      openModal,
      closeModal,
      onSubmit,
      declaration,
    }
  },
})
</script>
