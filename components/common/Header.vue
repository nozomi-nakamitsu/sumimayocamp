<template>
  <v-toolbar v-if="currentUser" dense class="header-container">
    <div class="image">
      <img :src="currentUser.photoURL" alt="" class="img" />
    </div>
    <v-toolbar-title @click="Router.push('/')"
      >{{
        currentUser.nickName ? currentUser.nickName : currentUser.displayName
      }}さんようこそ</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-toolbar-title>
      <button @click="logout">ログアウト</button></v-toolbar-title
    >
    <v-toolbar-title>
      <p @click="Router.push('/users/edit')">ニックネーム変更</p>
    </v-toolbar-title>
    <v-toolbar-title>
      <p @click="Router.push('/posts/create')">新規作成</p>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent, useStore, ref,useRouter } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    // compositionAPI
    const store = useStore()
    const  Router= useRouter()

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
      // compositionAPI
      store,
      Router,
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
