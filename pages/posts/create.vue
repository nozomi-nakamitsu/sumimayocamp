<template>
  <ThePostForm
    :propsform="form"
    :title="'新規作成'"
    @on-submit="onSubmit"
    @img-add="fileChanged"
    :propLoading="isLoading"
  />
</template>

<script lang="ts">
import { defineComponent, useStore, useRouter } from '@nuxtjs/composition-api'
import { PostForm, FileArray } from '@/types/props-types'
import ThePostForm from '@/components/organisms/ThePostForm.vue'

import { firestore } from '@/plugins/firebase'
import { useUploadFile } from '@/compositions/useUploadFile'

export default defineComponent({
  components: {
    ThePostForm,
  },
  setup() {
    // compositionAPI
    const store = useStore()
    const Router = useRouter()
    const {
      fileChanged,
      deleteUnNecessaryFiles,
      isLoading,
      files,
      form,
      currentUser,
    } = useUploadFile()
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
          (v: FileArray) => form.value.content.indexOf(v.url) === -1
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
        form.value.files = files.value.filter((file: FileArray) =>
          form.value.content.includes(file.url)
        )
        const id = firestore.collection('posts').doc().id
        form.value.id = id
        firestore.collection('posts').doc(id).set(form.value)
        Router.push('/')
      } catch (error) {
        console.error(error)
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
