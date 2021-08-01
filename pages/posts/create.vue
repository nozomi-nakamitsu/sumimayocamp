<template>
  <div class="form-container">
    <div>新規作成</div>
    <!-- TODO: style実装時にフォームのコンポーネントに分ける -->

    <div class="box">
      <p class="title">タイトル</p>
      <input type="text" class="input" v-model="form.title" />
    </div>
    <div class="box">
      <p class="title">学習言語(後で実装)</p>
      <input type="text" class="input" />
    </div>
    <div class="box">
      <p class="title">内容</p>
      <textarea type="text" class="input" v-model="form.content" />
    </div>
    <div class="box">
      <p class="title">参考URL</p>
      <input type="text" class="input" v-model="form.url" />
    </div>
    <div class="box">
      <p class="title">添付動画URL</p>
      <input
        type="file"
        class="input"
        accept="video/*"
        @change="selectFile($event)"
      />
    </div>
    <div class="box">
      <p class="title">学んだこと</p>
      <textarea type="text" class="input" v-model="form.learn" />
    </div>
    <div class="box">
      <v-btn elevation="2" raised @click="onSubmit">投稿する</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, ref } from '@nuxtjs/composition-api'
import { PostForm } from '../../types/props-types'
import { firestore } from '../../plugins/firebase'
import * as uuidv4 from 'uuid'
export default defineComponent({
  setup() {
    // compositionAPI
    const store = useStore()
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
    const fileUploadEvent = ref<any | null>(null)

    const selectFile = (event: any | null) => {
      fileUploadEvent.value = event
    }

    const fileChanged = (e: any | null, id: string) => {
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
     */
    const onSubmit = () => {
      try {
        const id = firestore.collection('posts').doc().id
        // @ts-ignore
        const url = fileChanged(fileUploadEvent.value, id).then((path) => {
          form.value.movieUrl = path
        })
        form.value.id = id
        firestore.collection('posts').doc(id).set(form.value)
      } catch (error) {
        console.error(error)
      }
    }
    return {
      // 認証系
      currentUser,
      // ref系
      form,
      fileUploadEvent,
      // Post
      onSubmit,
      // fileアップロード
      selectFile,
    }
  },
})
</script>
