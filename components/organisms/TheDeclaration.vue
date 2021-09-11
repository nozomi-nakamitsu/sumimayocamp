<template>
  <div>
    <div class="declaration-container">
      <h1>今週のキャンプ</h1>
      <p>すみまよキャンプを完成させる！！！！</p>
      <v-btn depressed @click="openModal"> 宣言する </v-btn>
    </div>
    <ModalCreateDeclaration
      :control-flag="isOpened"
      title="宣言する"
      types="new"
      @click="closeModal"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useModal } from '@/compositions/useModal'
import ModalCreateDeclaration from '@/components/organisms/ModalCreateDeclaration.vue'

export default defineComponent({
  components: {
    ModalCreateDeclaration,
  },
  props: {},

  setup() {
    const { isOpened, openModal, closeModal } = useModal()

    return {
      isOpened,
      openModal,
      closeModal,
    }
  },
})
</script>
