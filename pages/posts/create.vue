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
} from '@nuxtjs/composition-api'
import { v4 as uuidv4 } from 'uuid'
import { PostForm } from '@/types/props-types'
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
    const onSubmit = (data: {
      formData: PostForm
      file: string
      types: string
    }) => {
      try {
        form.value = data.formData
        const id = firestore.collection('posts').doc().id
        form.value.id = id
        firestore.collection('posts').doc(id).set(form.value)
        Router.push('/')
      } catch (error) {
        console.error(error)
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
