<template>
  <div class="form-container -modal">
    <!-- TODO: style実装時にフォームのコンポーネントに分ける -->
    <ValidationObserver ref="obs" v-slot="{ handleSubmit, invalid }">
      <form class="form-area" @submit.prevent="handleSubmit(onSubmit)">
        <ValidationInput
          label="Title"
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
            <label class="label">Content </label>
            <div class="drop_area" @dragover.prevent>
              <div class="markdown-editor">
                <no-ssr>
                  <mavon-editor
                    v-model="form.content"
                    :toolbars="markdownOption"
                    language="ja"
                    @imgAdd="imgAdd"
                  />
                </no-ssr>
              </div>
            </div>
          </ValidationProvider>
        </template>
        <div class="submit">
          <input
            type="submit"
            class="common-button -submit"
            title="投稿する"
            :disabled="invalid"
            :class="invalid"
            value="Submit!"
          />
        </div>
      </form>
    </ValidationObserver>
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      color="amber"
      style="position: absolute; top: 40%; left: 25%; z-index: 5"
    ></v-progress-circular>
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      color="amber"
      style="position: absolute; top: 40%; left: 75%; z-index: 5"
    ></v-progress-circular>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  SetupContext,
  computed,
  watch,
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
    propLoading: {
      types: Boolean,
      default: false,
    },
  },
  emits: ['on-submit', 'img-add'],
  setup(props, context: SetupContext) {
    // compositionAPI
    const store = useStore()
    // ref系
    const currentUser = store.getters.getCurrentUser
    const form = computed(() => ({
      id: props.propsform.id,
      title: props.propsform.title,
      content: props.propsform.content,
      created_at:
        props.title === '新規作成' ? new Date() : props.propsform.created_at,
      updated_at: new Date(),
      sendUser: props.propsform.sendUser,
      receiveUser: props.propsform.receiveUser,
      status: props.propsform.status,
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
    // 画像読み込み時のローディングしてるかのフラグを監視
    const isLoading = ref<boolean>(false)
    watch(
      () => props.propLoading,
      () => {
        isLoading.value = props.propLoading
      }
    )
    // 画像選択時の処理
    const imgAdd = (filename: string, imgfile: File) => {
      document.querySelector('.auto-textarea-input')?.classList.add('-hidden')
      document.querySelector('.v-note-show')?.classList.add('-hidden')
      isLoading.value = true
      form.value.content = context.emit('img-add', {
        file: imgfile,
        fileName: imgfile.name,
        content: form.value.content,
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
      // フォームの値取得
      change,
      // ファイルアップロード処理
      imgAdd,
      isLoading,
    }
  },
})
</script>
