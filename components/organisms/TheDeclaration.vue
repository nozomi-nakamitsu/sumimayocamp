<template>
  <div>
    <div class="declaration-container">
      <h1>今週のキャンプ</h1>
      <p>{{}}</p>
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
import { defineComponent, useStore } from '@nuxtjs/composition-api'
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








    /**
     * NOTE:fireStoreに投稿する
     *
     */
    const onSubmit = async (data: { formData: any; types: string }) => {
      console.log('data.formData', data.formData)
      try {
        firestore
          .collection('declaration')
          .doc(currentUser.uid)
          .set(data.formData)
        closeModal()
      } catch (error) {
        console.error(error)
      }
    }

    return {
      isOpened,
      openModal,
      closeModal,
      onSubmit,
    }
  },
})
</script>
