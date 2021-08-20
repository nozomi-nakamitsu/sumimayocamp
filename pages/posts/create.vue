<template>
  <ThePostForm :propsform="form" :title="'新規作成'" @on-submit="onSubmit" />
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'
import { PostForm } from '../../types/props-types'
import ThePostForm from '../../components/common/ThePostForm.vue'

import { firestore } from '../../plugins/firebase'
import * as uuidv4 from 'uuid'
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
      url: '',
      movieUrl: '',
      learn: '',
      created_at: new Date(),
      updated_at: new Date(),
    })
    const fileChanged = (e: any, id: string) => {
      debugger
      const target = e.target as HTMLInputElement
      const fileList = target.files as FileList
      const file = fileList[0]
      if (file) {
        const fileName = uuidv4
        try {
          return store.dispatch('uploadFile', {
            fileName,
            file,
            id,
          })
        } catch (error) {
          console.error('file upload', error)
        }
      }
    }
    /**
     * NOTE:fireStoreに投稿する
     * 先にidのみPOSTし、そのIDを使ってfireStorageに画像を入れる。fireStorageのパスを含んだデータをfireStoreにPOSTしている
     */
    const onSubmit = (data: {
      formData: PostForm
      file: string
      types: string
    }) => {
      try {
        form.value = data.formData
        const id = firestore.collection('posts').doc().id
        if (data.file !== null) {
          // @ts-ignore
          //TODO: 解消方法がわからないのでts-ignoreで対応
          fileChanged(data.file, id).then((path) => {
            form.value.movieUrl = path
          })
        }
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
      // Post
      onSubmit,
    }
  },
})
</script>
