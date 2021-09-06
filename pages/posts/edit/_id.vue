<template>
  <ThePostForm
    :propsform="form"
    :title="'編集'"
    @on-submit="onSubmit"
    @img-add="fileChanged"
    :propLoading="isLoading"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  useRouter,
  useAsync,
  useRoute,
  watchEffect,
  onBeforeMount,
} from '@nuxtjs/composition-api'
// import { v4 as uuidv4 } from 'uuid'

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
    const Route = useRoute()
    onBeforeMount(() => {
      const id = Route.value.params.id
      try {
        store
          .dispatch('getPostData', {
            id,
          })
          .then((result) => {
            form.value = { ...result }
          })
      } catch (error) {
        console.error('投稿内容を取得できませんでした', error)
      }
    })

    const {
      fileChanged,
      deleteUnNecessaryFiles,
      isLoading,
      files,
      form,
      currentUser,
    } = useUploadFile()

    watchEffect(() => {
      console.log('files', JSON.parse(JSON.stringify(files.value)))
    })
    /**
     * NOTE:更新処理
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
        form.value.files = files.value.filter((file: FileArray) =>
          form.value.content.includes(file.url)
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
        await firestore
          .collection('posts')
          .doc(form.value.id)
          .update(form.value)
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
      files,
      // Post
      onSubmit,
      // ファイルアップロード
      fileChanged,
      useUploadFile,
    }
  },
})
</script>
