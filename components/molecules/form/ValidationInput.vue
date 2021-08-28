<template>
  <div class="validation-wrap">
    <label v-if="!!label" :for="inputName" class="label">{{ label }} </label>
    <span v-if="required" class="required-asterisk">*</span>
    <ValidationProvider
      v-slot="{ failed, errors }"
      tag="div"
      class="provider"
      :rules="rules"
    >
      <input
        :id="inputName"
        :value="form.inputValue"
        type="text"
        class="app-input"
        :disabled="disabled"
        :placeholder="placeholder"
        :class="doneOrError(failed)"
        :name="inputName"
        @input="inputFunc"
      />
      <p v-if="errors.length > 0" class="error">
        {{ errors[0] }}
      </p>
    </ValidationProvider>
  </div>
</template>

<script lang="ts">
/**
 * NOTE:
 * setValue 親componentで使用するdata変数をセット
 * label 渡さないとlabelタグも非表示になる
 * placeholder 渡さない場合は非表示になる
 * inputName labelを使用する場合に指定する必要がある
 * required 必須入力を示す*を表示させるか？
 * disabled 非活性にする場合にtrueを渡す
 * rules vee validateと同じ規則でバリデーションルールを指定
 */
import { defineComponent, computed } from '@nuxtjs/composition-api'
// バリデーション周り
import { ValidationProvider } from 'vee-validate'
import { doneOrError } from '../../../compositions/validation-styles'
export default defineComponent({
  components: {
    ValidationProvider,
  },
  props: {
    setValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: false,
      default: undefined,
    },
    placeholder: {
      type: String,
      required: false,
      default: undefined,
    },
    inputName: {
      type: String,
      required: false,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    rules: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    const form = computed(() => ({
      inputValue: props.setValue,
    }))
    const inputFunc = (e: Event) => {
      if (!(e.target instanceof HTMLInputElement)) {
        return
      }
      form.value.inputValue = e.target.value
      ctx.emit('input', form.value.inputValue)
    }

    return {
      doneOrError,
      form,
      inputFunc,
    }
  },
})
</script>
