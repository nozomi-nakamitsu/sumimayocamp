<template>
  <BaseModal :control-flag="controlFlag" :title="title" @click="$emit('click')">
    <div class="form-container">
      <!-- TODO: style実装時にフォームのコンポーネントに分ける -->
      <ValidationObserver ref="obs" v-slot="{ handleSubmit, invalid }">
        <form class="form-area" @submit.prevent="handleSubmit(onSubmit)">
          <ValidationInput
            label="今週やることを宣言しよう"
            input-name="declaration"
            rules="required"
            class="nameinput"
            :set-value="form.declaration"
            @input="change($event)"
          ></ValidationInput>
          <BaseSelectBox />
          <div>
            <input
              type="submit"
              class="common-button"
              title="投稿する"
              :disabled="invalid"
              :class="invalid"
            />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import { FileArray, MissionPost } from '@/types/props-types'
import { firestore } from '@/plugins/firebase'
import BaseModal from '@/components/atoms/BaseModal.vue'
import BaseSelectBox from '../molecules/form/BaseSelectBox.vue'
import ValidationInput from '../molecules/form/ValidationInput.vue'

export default defineComponent({
  components: {
    BaseModal,
    BaseSelectBox,
    ValidationInput,
  },
  props: {
    controlFlag: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    // defaultData: {
    //   type: Object as PropType<MissionPost> | null,
    //   default: null,
    // },
    types: {
      type: String,
      required: true,
    },
  },
  emits: ['click', 'created'],

  setup(props, ctx) {
    // compositionAPI
    const store = useStore()
    const form = ref<any>({
      declaration: '',
      mission: '',
    })
    /**
     * NOTE:
     *
     */
    const change = () => {
      console.log('change')
    }

    return {
      form,
      change,
    }
  },
})
</script>
