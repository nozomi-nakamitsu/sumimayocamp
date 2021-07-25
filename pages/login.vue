<template>
  <div>
    <button @click="login">ログイン</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, onMounted } from '@nuxtjs/composition-api'
import firebase from '../plugins/firebase'
export default defineComponent({
  setup() {
    onMounted(async () => {
      await firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log('user.displayName', user.displayName)
          store.commit('setIsLogined', true)
          store.commit('setCurrentUser', user)
          console.log(store.getters)
          // ログイン中の場合の処理
        } else {
          console.log('ログインしてないよ')
        }
      })
    })

    const store = useStore()
    const login = async () => {
      console.log('login')
      try {
        await store.dispatch('setPersistence')
        await store.dispatch('auth')
      } catch (error) {
        store.dispatch('onRejectted', error)
      }
    }
    return {
      login,
      store,
    }
  },
})
</script>
