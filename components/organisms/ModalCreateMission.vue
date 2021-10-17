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
import { v4 as uuidv4 } from 'uuid'
import { OneMissionRef, PositionRef, UsersRef } from '@/utilities/useFirestore'

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
        const id = uuidv4()
        missionForm.value.id = id
        let allUsers = <any>[]
        await UsersRef()
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              allUsers = [...allUsers, doc.data()] as CurrentUser[]
            })
          })
        await OneMissionRef(id).set(missionForm.value)
        allUsers.map((user: CurrentUser) => {
          PositionRef(id, user.uid).set({ position: null })
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

        await OneMissionRef(missionForm.value.id).update(missionForm.value)
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
