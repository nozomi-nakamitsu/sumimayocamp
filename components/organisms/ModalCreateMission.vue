<template>
  <BaseModal :control-flag="controlFlag" :title="title" @click="$emit('click')">
    <TheMissionForm
      :propsform="missionForm"
      :title="types === 'new' ? '新規作成' : '編集'"
      :prop-loading="isLoading"
      @on-submit="onSubmit"
      @img-add="fileChanged"
    />
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, useStore, PropType } from '@nuxtjs/composition-api'
import TheMissionForm from '@/components/organisms/TheMissionForm.vue'
import { FileArray, MissionPost, CurrentUser } from '@/types/props-types'
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
    defaultData: {
      type: Object as PropType<MissionPost> | null,
      default: null,
    },
    types: {
      type: String,
      required: true,
    },
  },
  emits: ['click', 'created'],

  setup(props, ctx) {
    // compositionAPI
    const store = useStore()
    const {
      fileChanged,
      deleteUnNecessaryFiles,
      isLoading,
      files,
      missionForm,
      currentUser,
    } = useMissions(props)

    /**
     * NOTE:ミッションを新規投稿する
     *
     */
    const onSubmit = async (data: {
      formData: MissionPost
      file: string
      types: string
    }) => {
      if (props.types === 'edit') {
        onUpdate(data)
        return
      }
      try {
        missionForm.value = data.formData
        const deleteFiles = JSON.parse(JSON.stringify(files.value)).filter(
          (v: FileArray) => !missionForm.value.content.includes(v.url)
        )
        // NOTE:一度アップロードしたが、削除てしまったファイルがあればstorageから削除
        if (deleteFiles.length) {
          await deleteFiles.map((file: FileArray) => {
            const id = file.id
            return store.dispatch('deleteFile', {
              id,
            })
          })
        }
        missionForm.value.files = files.value.filter((file: FileArray) =>
          missionForm.value.content.includes(file.url)
        )
        const id = await firestore.collection('missions').doc().id
        missionForm.value.id = id
        let allUsers = <any>[]
        await firestore
          .collection('users')
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              allUsers = [...allUsers, doc.data()] as CurrentUser[]
            })
          })
        await firestore.collection('missions').doc(id).set(missionForm.value)
        allUsers.map(async (user: CurrentUser) => {
          firestore
            .collection('missions')
            .doc(id)
            .collection('positions')
            .doc(user.uid)
            .set({ position: null })
        })
        ctx.emit('click')
      } catch (error) {
        store.dispatch('onRejected', error)
      }
    }
    /**
     * NOTE:ミッションを編集する
     *
     */
    const onUpdate = async (data: {
      formData: MissionPost
      file: string
      types: string
    }) => {
      try {
        missionForm.value = data.formData
        const deleteFiles = JSON.parse(JSON.stringify(files.value)).filter(
          (v: FileArray) => !missionForm.value.content.includes(v.url)
        )
        // NOTE:一度アップロードしたが、削除てしまったファイルがあればstorageから削除
        if (deleteFiles.length) {
          await deleteFiles.map((file: FileArray) => {
            const id = file.id
            return store.dispatch('deleteFile', {
              id,
            })
          })
        }
        missionForm.value.files = files.value.filter((file: FileArray) =>
          missionForm.value.content.includes(file.url)
        )

        await firestore
          .collection('missions')
          .doc(missionForm.value.id)
          .update(missionForm.value)
        ctx.emit('click')
      } catch (error) {
        store.dispatch('onRejected', error)
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
      onUpdate,
    }
  },
})
</script>
