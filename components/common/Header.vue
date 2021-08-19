<template>
  <v-toolbar v-if="currentUser" dense class="header-container">
    <div class="image">
      <img :src="currentUser.photoURL" alt="" class="img" />
    </div>
    <v-toolbar-title
      >{{
        currentUser.nickName ? currentUser.nickName : currentUser.displayName
      }}さんようこそ</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-toolbar-title>
      <button @click="logout">ログアウト</button></v-toolbar-title
    >
    <v-toolbar-title>
      <a href="/users/edit">ニックネーム変更</a>
    </v-toolbar-title>
    <v-toolbar-title>
      <a href="/">ホーム</a>
    </v-toolbar-title>
    <v-toolbar-title>
      <a href="/posts/create">新規作成</a>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent, useStore, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    // vuex
    const store = useStore()
    // ref
    const currentUser = store.getters.getCurrentUser
    const drawer = ref<boolean>(false)

    // ログアウト
    const logout = async () => {
      try {
        await store.dispatch('logout')
      } catch (error) {
        store.dispatch('onRejectted', error)
      }
    }
    // ヘッダー開け閉め
    const switchDrawer = () => {
      drawer.value = !drawer.value
    }

    return {
      // vuex
      store,
      // ref系
      drawer,
      // ヘッダー開け閉め
      switchDrawer,
      // 認証
      logout,
      currentUser,
    }
  },
})
</script>
