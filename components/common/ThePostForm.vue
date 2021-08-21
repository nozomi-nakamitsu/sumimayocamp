<template>
  <div class="form-container">
    <div>{{ title }}</div>
    <!-- TODO: style実装時にフォームのコンポーネントに分ける -->

    <div class="box">
      <p class="title">タイトル</p>
      <input type="text" class="input" v-model="form.title" />
    </div>
    <template>
      <div class="markdown-editor">
        <no-ssr>
          <mavon-editor
            :toolbars="markdownOption"
            language="ja"
            v-model="form.content"
          />
        </no-ssr>
      </div>
    </template>
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
import { markdownOption } from '../../compositions/useMarkdown'
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
      title: props.propsform.title,
      user_id: currentUser.uid,
      content: props.propsform.content,
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
      console.log(form.value.content)
      context.emit('on-submit', {
        formData: form.value,
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
      // マークダウン
      markdownOption,
    }
  },
})
</script>
