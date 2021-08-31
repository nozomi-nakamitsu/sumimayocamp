<template>
  <div class="form-container">
    <div>{{ title }}</div>
    <!-- TODO: style実装時にフォームのコンポーネントに分ける -->
    <ValidationObserver ref="obs" v-slot="{ handleSubmit, invalid }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <ValidationInput
          label="タイトル"
          input-name="title"
          rules="required"
          class="nameinput"
          :set-value="form.title"
          @input="change($event, 'nickName')"
        ></ValidationInput>
        <template>
          <ValidationProvider
            tag="div"
            class="provider"
            rules="required"
            name="内容"
          >
            <div class="markdown-editor">
              <no-ssr>
                <mavon-editor
                  v-model="form.content"
                  :toolbars="markdownOption"
                  language="ja"
                />
              </no-ssr>
            </div>
          </ValidationProvider>
        </template>
        <input
          type="submit"
          class="common-button"
          title="投稿する"
          :disabled="invalid"
          :class="invalid"
        />
      </form>
    </ValidationObserver>
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
import ValidationInput from '../molecules/form/ValidationInput.vue'
import { markdownOption } from '@/compositions/useMarkdown'

export default defineComponent({
  components: {
    ValidationInput,
  },
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
      user: props.propsform.user
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
        types: props.title,
      })
    }
    // NOTE: 入力した値を親コンポーネントに渡す
    const change = (event: InputEvent) => {
      form.value.title = event
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
      // フォームの値取得
      change,
    }
  },
})
</script>
