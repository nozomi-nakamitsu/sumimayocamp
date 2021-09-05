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
import {
  defineComponent,
  useStore,
  ref,
  useRouter,
  onBeforeUnmount,
} from '@nuxtjs/composition-api'
import { v4 as uuidv4 } from 'uuid'
import { PostForm, FileArray } from '@/types/props-types'
import ThePostForm from '@/components/organisms/ThePostForm.vue'

import { firestore } from '@/plugins/firebase'

export default defineComponent({
  components: {
    ThePostForm,
  },
  setup() {
    // compositionAPI
    const store = useStore()
    const Router = useRouter()
    // ref系
    const currentUser = store.getters.getCurrentUser
    const form = ref<PostForm>({
      id: '',
      user_id: currentUser.uid,
      title: '',
      content: '',
      created_at: new Date(),
      updated_at: new Date(),
      user: { ...currentUser },
    })
    const isLoading = ref<boolean>(false)
    const files = ref<FileArray[]>([])
    // ファイル選択時の処理
    const fileChanged = async (file: any) => {
      isLoading.value = true
      const id = uuidv4()
      try {
        const url = await store.dispatch('uploadFile', {
          file,
          id,
        })
        var reg = new RegExp('\\([\.\\d]+?\\)', 'g')
        form.value.content = file.content.replace(reg, `(${url}})`)
        document
          .querySelector('.auto-textarea-input')
          ?.classList.remove('-hidden')
        document.querySelector('.v-note-show')?.classList.remove('-hidden')
        files.value = [...files.value, { id: id, url: url }]
      } catch (error) {
        console.error('file upload', error)
      } finally {
        isLoading.value = false
      }
    }
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
        const deleteFiles = files.value.filter(
          (file: FileArray) => form.value.content.indexOf(file.url) === -1
        )
        //NOTE:一度アップロードしたが、削除てしまったファイルがあればstorageから削除
        if (deleteFiles.length) {
          await deleteFiles.map((file) => {
            const id = file.id
            store.dispatch('deleteFile', {
              id,
            })
          })
        }
        const id = firestore.collection('posts').doc().id
        form.value.id = id
        firestore.collection('posts').doc(id).set(form.value)
        Router.push('/')
      } catch (error) {
        console.error(error)
      }
    }

    /**
     * 投稿してないファイルがあればstorageから削除
     */
    const deleteUnNecessaryFiles = () => {
      files.value.map((file) => {
        const id = file.id
        store.dispatch('deleteFile', {
          id,
        })
      })
    }
    /**
     * ページ遷移時に投稿してないファイルがあればstorageから削除
     */
    onBeforeUnmount(() => {
      if (files.value.length) {
        deleteUnNecessaryFiles()
      }
    })

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
    }
  },
})
</script>
