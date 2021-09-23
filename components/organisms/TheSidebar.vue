<template>
  <!-- <v-toolbar v-if="currentUser" dense class="header-container">
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
      <p @click="Router.push('/missions')">ミッション一覧</p>
    </v-toolbar-title>
    <v-toolbar-title>
      <p @click="Router.push('/users/edit')">ニックネーム変更</p>
    </v-toolbar-title>

    <v-toolbar-title>
      <p @click="Router.push('/posts/create')">新規作成</p>
    </v-toolbar-title>
  </v-toolbar> -->
  <div class="sidebar-container">
    <div class="container">
      <div class="top">
        <div class="image">
          <img :src="currentUser.photoURL" alt="" class="img" />
        </div>
        <p class="name">
          {{
            currentUser.nickName
              ? currentUser.nickName
              : currentUser.displayName
          }}
        </p>
        <!-- TODO: 後で正しい値を表示できるように実装する -->
        <p class="date">Last Logined : 2021/08/31 23:00(仮)</p>
      </div>
      <div class="middle">
        <div class="sidebar-item -active">
          <div class="container -active">
            <div class="circle -red"></div>
            <p class="title">New Post</p>
            <div class="button"><BaseSquareButton /></div>
          </div>
        </div>
        <div class="sidebar-item">
          <div class="container">
            <div class="circle -yellow"></div>
            <p class="title">Missions</p>
            <div class="button"><BaseSquareButton /></div>
          </div>
        </div>
        <div class="sidebar-item" @click="Router.push('/users/edit')">
          <div class="container">
            <div class="circle -green"></div>
            <p class="title">Mypage</p>
            <div class="button">
              <BaseSquareButton />
            </div>
          </div>
        </div>
        <div class="sidebar-item">
          <div class="container">
            <div class="circle -blue"></div>
            <p class="title">Logout</p>
            <div class="button"><BaseSquareButton /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'
import BaseSquareButton from '@/components/atoms/BaseSquareButton.vue'
export default defineComponent({
  components: {
    BaseSquareButton,
  },
  setup() {
    // compositionAPI
    const store = useStore()
    const Router = useRouter()

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
