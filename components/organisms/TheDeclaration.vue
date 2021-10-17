<template>
  <div>
    <div class="declaration-container">
      <div class="container">
        <p class="text">
          {{ declaration ? declaration.declaration : '宣言しよう！' }}
        </p>
        <button depressed class="common-button -declaration" @click="openModal">
          宣言する{{ currentUser.uid }}
        </button>
      </div>
      <ModalCreateDeclaration
        :control-flag="isOpened"
        title="宣言する"
        types="new"
        @click="closeModal"
        @on-submit="onSubmit"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'
import { useModal } from '@/compositions/useModal'
import ModalCreateDeclaration from '@/components/organisms/ModalCreateDeclaration.vue'
import { OneDeclarationRef } from '@/utilities/useFirestore'

export default defineComponent({
  components: {
    ModalCreateDeclaration,
  },
  props: {
    declaration: {
      type: Object,
      default: null,
    },
  },

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
      try {
        closeModal()
        await OneDeclarationRef(currentUser.uid).set(data.formData)
      } catch (error) {
        store.dispatch('onRejected', error)
      }
    }

    return {
      isOpened,
      openModal,
      closeModal,
      onSubmit,
      // declaration,
      currentUser,
    }
  },
})
</script>
