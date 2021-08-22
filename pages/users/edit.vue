<template>
  <ValidationObserver ref="obs" v-slot="{ handleSubmit, invalid }">
    <form @submit.prevent="handleSubmit(submit)">
      <ValidationInput
        label="ニックネーム"
        input-name="nickName"
        rules="required"
        class="nameinput"
        :set-value="form.nickName"
        @input="change($event, 'nickName')"
      ></ValidationInput>
      <input
        type="submit"
        class="common-button"
        title="変更する"
        :disabled="invalid"
        :class="invalid"
      />
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'
import ValidationInput from '../../components/common/form/ValidationInput.vue'
export default defineComponent({
  components: {
    ValidationInput,
  },
  setup() {
    // vuex
    const store = useStore()
    const Router = useRouter()
    // ref系
    const currentUser = store.getters.getCurrentUser
    const form = ref({
      token: currentUser.token,
      uid: currentUser.uid,
      photoURL: currentUser.photoURL,
      displayName: currentUser.displayName,
      nickName: currentUser.nickName,
    })
    const submit = async () => {
      try {
        await store.dispatch('editNickName', form.value)
        Router.push('/')
      } catch (error) {
        store.dispatch('onRejectted', error)
      }
    }

    // NOTE: 入力した値を親コンポーネントに渡す
    const change = (event: InputEvent) => {
      form.value.nickName = event
    }
    return {
      submit,
      store,
      form,
      currentUser,
      change,
    }
  },
})
</script>
