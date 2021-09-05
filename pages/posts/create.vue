<template>
  <div>
    <ThePostForm
      :propsform="form"
      :title="'新規作成'"
      @on-submit="onSubmit"
      @img-add="fileChanged"
    />
    <p></p>
  </div>
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
    const targetUrl = ref<string>('')
    const fileChanged = async (file: any) => {
      if (file) {
        const id = uuidv4()
        try {
          const url = await store.dispatch('uploadFile', {
            file,
            id,
          })
          targetUrl.value = url
          const deleteText = file.content.substr(0, file.content.indexOf('!'))
          form.value.content = deleteText.concat(
            `![${file.fileName}](${targetUrl.value})`
          )
          console.log(' form.value.content', form.value.content)
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
        // if (data.file !== null) {
        //   // @ts-ignore
        //   //TODO: 解消方法がわからないのでts-ignoreで対応
        //   fileChanged(data.file, id).then((path) => {
        //     form.value.movieUrl = path
        //   })
        // }
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
      // ファイル処理系
      fileChanged,
      targetUrl,
    }
  },
})
</script>
