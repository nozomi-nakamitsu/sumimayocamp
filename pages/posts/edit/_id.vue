<template>
  <ThePostForm :propsform="form" :title="'編集'" @on-submit="onSubmit" />
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  useRouter,
  useAsync,
  useRoute,
} from '@nuxtjs/composition-api'
// import * as uuidv4 from 'uuid'
import { PostForm } from '../../../types/props-types'
import ThePostForm from '../../../components/common/ThePostForm.vue'
import { firestore } from '../../../plugins/firebase'

export default defineComponent({
  components: {
    ThePostForm,
  },
  setup() {
    // compositionAPI
    const store = useStore()
    const Router = useRouter()
    const Route = useRoute()

    // ref系
    const currentUser = store.getters.getCurrentUser
    const post = store.getters.getPost
    const form = ref<PostForm>({
      id: post.id,
      user_id: post.user_id,
      title: post.title,
      content: post.content,
      created_at: post.created_at,
      updated_at: post.updated_at,
    })

    useAsync(() => {
      const id = Route.value.params.id
      try {
        store
          .dispatch('getPostData', {
            id,
          })
          .then(() => {
            form.value = {
              id: post.id,
              user_id: post.user_id,
              title: post.title,
              content: post.content,
              created_at: post.created_at,
              updated_at: post.updated_at,
            }
          })
      } catch (error) {
        console.error('投稿内容を取得できませんでした', error)
      }
    })
    // const fileChanged = (e: any, id: string) => {
    //   const target = e.target as HTMLInputElement
    //   const fileList = target.files as FileList
    //   const file = fileList[0]
    //   if (file) {
    //     const fileName = uuidv4
    //     try {
    //       return store.dispatch('uploadFile', {
    //         fileName,
    //         file,
    //         id,
    //       })
    //     } catch (error) {
    //       console.error('file upload', error)
    //     }
    //   }
    // }
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
        // if (data.file !== null) {
        //   // @ts-ignore
        //   //TODO: 解消方法がわからないのでts-ignoreで対応
        //   await fileChanged(data.file, form.value.id).then((path) => {
        //     form.value.movieUrl = path
        //   })
        // }
        await firestore
          .collection('posts')
          .doc(form.value.id)
          .update(form.value)
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
