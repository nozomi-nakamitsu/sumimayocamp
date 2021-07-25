<template>
  <div>
    <div v-if="store.getters.getIsLogined">
      <p>{{ store.getters.getUserName }}さんようこそ</p>
    </div>
    <button @click="login" v-else>ログイン</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const store = useStore()
    const login = async () => {
      console.log('login')
      await store.dispatch('login')
    }

    // todo追加
    // const addTodo = async () => {
    //   await store.dispatch('addTodo', form.value)
    //   await console.log('aaa')
    // }
    return {
      login,
      store,
    }
  },
})
</script>
