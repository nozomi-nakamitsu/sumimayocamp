<template>
  <BaseModal
    :control-flag="controlFlag"
    title="メンバー登録"
    @click="$emit('click')"
  >
    <ThePostForm
      :propsform="form"
      :title="'ミッションを作成'"
      @on-submit="onSubmit"
      @img-add="fileChanged"
      :propLoading="isLoading"
    />
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, useStore, useRouter } from '@nuxtjs/composition-api'
import ThePostForm from '@/components/organisms/ThePostForm.vue'

import BaseModal from '@/components/atoms/BaseModal.vue'
import { useUploadFile } from '~/compositions/useUploadFile'

export default defineComponent({
  components: {
    BaseModal,
    ThePostForm,
  },
  props: {
    controlFlag: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['click', 'created'],

  setup() {
    const {
      fileChanged,
      deleteUnNecessaryFiles,
      isLoading,
      files,
      form,
      currentUser,
    } = useUploadFile()
    const onSubmit = () => {
      console.log('aaa')
    }
    return {
      fileChanged,
      deleteUnNecessaryFiles,
      isLoading,
      files,
      form,
      currentUser,
      onSubmit,
    }
  },
})
</script>
