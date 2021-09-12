<template>
  <BaseModal :control-flag="controlFlag" :title="title" @click="$emit('click')">
    <div class="form-container">
      <!-- TODO: style実装時にフォームのコンポーネントに分ける -->
      <ValidationObserver ref="obs" v-slot="{ handleSubmit, invalid }">
        <form class="form-area" @submit.prevent="handleSubmit(onSubmit)">
          <ValidationTextArea
            label="今週やることを宣言しよう"
            input-name="declaration"
            rules="required"
            class="nameinput"
            :set-value="form.declaration"
            @input="change"
          ></ValidationTextArea>

          <p></p>
          <BaseSelectBox @on-selected="onSelected" />
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
import { FileArray, Mission, MissionPost } from '@/types/props-types'
import { firestore } from '@/plugins/firebase'
import BaseModal from '@/components/atoms/BaseModal.vue'
import BaseSelectBox from '../molecules/form/BaseSelectBox.vue'
import ValidationTextArea from '../molecules/form/ValidationTextArea.vue'
export default defineComponent({
  components: {
    BaseModal,
    BaseSelectBox,
    ValidationTextArea,
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
    const store = useStore()
    const currentUser = store.getters.getCurrentUser
    const form = ref<any>({
      declaration: '',
      mission: '',
      uid: currentUser.uid,
    })
    const prev = ref('')
    const onSelected = (selectedMissions: Mission[]) => {
      const titles = selectedMissions.map((mission) => {
        return `${mission.title}に挑戦する!`
      })
      if (prev.value === '') {
        form.value.declaration = form.value.declaration.concat(titles.join(''))
      } else {
        form.value.declaration = form.value.declaration.replace(
          prev.value,
          titles.join('')
        )
      }
      form.value.mission = selectedMissions
      prev.value = titles.join('')
    }
    // NOTE: 入力した値を親コンポーネントに渡す
    const change = (event: InputEvent) => {
      form.value.declaration = event
    }

    /**
     * NOTE:fireStoreに投稿する
     */
    const onSubmit = () => {
      ctx.emit('on-submit', {
        formData: form.value,
        types: props.title,
      })
      form.value = {
        declaration: '',
        mission: '',
        uid: currentUser.uid,
      }
    }

    return {
      form,
      onSelected,
      onSubmit,
      change,
    }
  },
})
</script>
