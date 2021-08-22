<template>
  <ValidationObserver ref="obs" v-slot="{ handleSubmit, invalid }">
    <form @submit.prevent="handleSubmit(submit)">
      <ValidationProvider v-slot="{ errors }" rules="required">
        <div class="user-edit-container">
          <input
            v-model="form.nickName"
            type="text"
            class="input"
            name="nickName"
          />
          <div class="error">{{ errors[0] }}</div>
          <input
            type="submit"
            class="button"
            title="変更する"
            :disabled="invalid"
          />
        </div>
      </ValidationProvider>
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
export default defineComponent({
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
    return {
      submit,
      store,
      form,
      currentUser,
    }
  },
})
</script>
