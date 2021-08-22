<template>
  <div class="user-edit-container">
    <input v-model="form.nickName" type="text" class="input" />
    <button @click="submit">変更する</button>
  </div>
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
