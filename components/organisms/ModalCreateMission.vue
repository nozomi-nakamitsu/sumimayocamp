<template>
  <BaseModal
    :control-flag="controlFlag"
    title="メンバー登録"
    @click="$emit('click')"
  >
    <TheMissionForm
      :propsform="missionForm"
      :title="'ミッションを作成'"
      @on-submit="onSubmit"
      @img-add="fileChanged"
      :propLoading="isLoading"
    />
  </BaseModal>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRouter,
  watchEffect,
} from '@nuxtjs/composition-api'
import TheMissionForm from '@/components/organisms/TheMissionForm.vue'
import { FileArray, MissionPost } from '@/types/props-types'
import { firestore } from '@/plugins/firebase'
import BaseModal from '@/components/atoms/BaseModal.vue'
import { useMissions } from '~/compositions/useMissions'

export default defineComponent({
  components: {
    BaseModal,
    TheMissionForm,
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

  setup(_, ctx) {
    // compositionAPI
    const store = useStore()
    const Router = useRouter()
    const {
      fileChanged,
      deleteUnNecessaryFiles,
      isLoading,
      files,
      missionForm,
      currentUser,
    } = useMissions()

    watchEffect(() => {
      console.log(missionForm.value)
    })
    /**
     * NOTE:fireStoreに投稿する
     *
     */
    const onSubmit = async (data: {
      formData: MissionPost
      file: string
      types: string
    }) => {
      try {
        missionForm.value = data.formData
        console.log('form.value1', missionForm.value)
        const deleteFiles = JSON.parse(JSON.stringify(files.value)).filter(
          (v: FileArray) => missionForm.value.content.indexOf(v.url) === -1
        )
        //NOTE:一度アップロードしたが、削除てしまったファイルがあればstorageから削除
        if (deleteFiles.length) {
          await deleteFiles.map((file: FileArray) => {
            const id = file.id
            store.dispatch('deleteFile', {
              id,
            })
          })
        }
        missionForm.value.files = files.value.filter((file: FileArray) =>
          missionForm.value.content.includes(file.url)
        )
        const id = firestore.collection('missions').doc().id
        missionForm.value.id = id

        firestore.collection('missions').doc(id).set(missionForm.value)
        ctx.emit('click')
      } catch (error) {
        console.error(error)
      }
    }
    return {
      fileChanged,
      deleteUnNecessaryFiles,
      isLoading,
      files,
      missionForm,
      currentUser,
      onSubmit,
    }
  },
})
</script>
