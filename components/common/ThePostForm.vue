<template>
  <div class="form-container">
    <div>{{ title }}</div>
    <!-- TODO: style実装時にフォームのコンポーネントに分ける -->

    <div class="box">
      <p class="title">タイトル</p>
      <input type="text" class="input" v-model="form.title" />
    </div>
    {{form.title}}
    <!-- <div class="box">
      <p class="title">学習言語(後で実装)</p>
      <input type="text" class="input" />
    </div> -->
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
      <input type="file" class="input" @change="selectFile($event)" />
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
import {
  defineComponent,
  useStore,
  ref,
  SetupContext,
  computed,
} from '@nuxtjs/composition-api'
// import { PostForm } from '../../types/props-types'
export default defineComponent({
  props: {
    propsform: {
      type: Object,
      required: true,
    },
    title: {
      types: String,
      default: '',
    },
  },
  emits: ['on-submit'],
  setup(props, context: SetupContext) {
    // compositionAPI
    const store = useStore()
    // ref系
    const currentUser = store.getters.getCurrentUser
    const form = computed(() => ({
      id: props.propsform.id,
      user_id: currentUser.uid,
      title: props.propsform.title,
      content: props.propsform.content,
      url: props.propsform.url,
      movieUrl: props.propsform.movieUrl,
      learn: props.propsform.learn,
      created_at:
        props.title === '新規作成' ? new Date() : props.propsform.created_at,
      updated_at: new Date(),
    }))
    const fileUploadEvent = ref<any>(null)

    const selectFile = (event: any) => {
      fileUploadEvent.value = event
    }
    /**
     * NOTE:fireStoreに投稿する
     */
    const onSubmit = () => {
      context.emit('on-submit', {
        formData: form.value,
        file: fileUploadEvent.value,
        types: props.title,
      })
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
