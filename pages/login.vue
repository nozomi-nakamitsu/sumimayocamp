<template>
  <div class="login-container">
    <div class="left">
      <div class="image">
        <img src="@/assets/images/login.svg" alt="" class="img" />
      </div>
    </div>
    <div class="right">
      <p class="title -mb0">Welcome to #sumimayocamp</p>
      <p class="title -mt0">Get Started!!</p>
      <p class="text">
        すみまよキャンプへようこそ！ GoogleアカウントでLoginしてねっ
      </p>
      <div class="button">
        <button class="common-button -login" @click="login">
          Sign In with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, onMounted } from '@nuxtjs/composition-api'
import firebase from '@/plugins/firebase'
export default defineComponent({
  setup() {
    onMounted(async () => {
      await firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          store.commit('setIsLogined', true)
          store.commit('setCurrentUser', user)
        } else {
          console.log('ログインしてないよ')
        }
      })
    })

    const store = useStore()
    const login = async () => {
      try {
        await store.dispatch('setPersistence')
        await store.dispatch('auth')
      } catch (error) {
        store.dispatch('onRejected', error)
      }
    }
    return {
      login,
      store,
    }
  },
})
</script>
