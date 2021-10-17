<template>
  <div class="common-container">
    <div class="title">
      <p class="text">New Posts</p>
      <div class="line"></div>
    </div>
    <ThePostForm
      :propsform="form"
      :title="'新規作成'"
      :prop-loading="isLoading"
      @on-submit="onSubmit"
      @img-add="fileChanged"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, useRouter } from '@nuxtjs/composition-api'
import { v4 as uuidv4 } from 'uuid'
import { PostForm, FileArray } from '@/types/props-types'
import ThePostForm from '@/components/organisms/ThePostForm.vue'
import { useUploadFile } from '@/compositions/useUploadFile'
import { OnePostRef } from '~/utilities/useFirestore'

export default defineComponent({
  components: {
    ThePostForm,
  },
  setup() {
    // compositionAPI
    const store = useStore()

    const currentUser = store.getters.getCurrentUser
    const Router = useRouter()
    const { fileChanged, deleteUnNecessaryFiles, isLoading, files, form } =
      useUploadFile(currentUser)

    /**
     * NOTE:fireStoreに投稿する
     *
     */
    const onSubmit = async (data: {
      formData: PostForm
      file: string
      types: string
    }) => {
      try {
        form.value = data.formData
        const deleteFiles = JSON.parse(JSON.stringify(files.value)).filter(
          (v: FileArray) => !form.value.content.includes(v.url)
        )
        // NOTE:一度アップロードしたが、削除てしまったファイルがあればstorageから削除
        if (deleteFiles.length) {
          await deleteFiles.map((file: FileArray) => {
            const id = file.id
            store.dispatch('deleteFile', {
              id,
            })
          })
        }
        form.value.files = files.value.filter((file: FileArray) =>
          form.value.content.includes(file.url)
        )
        const id = uuidv4()
        form.value.id = id
        OnePostRef(id).set(form.value)
        Router.push('/')
      } catch (error) {
        store.dispatch('onRejected', error)
      }
    }

    /**
     * リロード時に投稿しれないファイルがあれば削除
     */
    window.onbeforeunload = () => {
      if (files.value.length) {
        deleteUnNecessaryFiles()
      }
    }

    return {
      // 認証系
      currentUser,
      // ref系
      form,
      isLoading,
      // Post
      onSubmit,
      // ファイル処理系
      fileChanged,
      useUploadFile,
    }
  },
})
</script>
