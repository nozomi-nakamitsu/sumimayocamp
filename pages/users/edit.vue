<template>
  <div class="user-edit-container">
    <input v-model="form.name" type="text" class="input" />
    <button @click="submit">変更する</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    // vuex
    const store = useStore()
    // ref系
    const currentUser = store.getters.getCurrentUser
    const form = ref({
      name: currentUser.nickName,
    })
    const submit = async () => {
      try {
        await store.dispatch('editNickName', form.value.name)
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
