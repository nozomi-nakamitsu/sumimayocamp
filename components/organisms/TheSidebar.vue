<template>
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
        <div
          class="sidebar-item"
          @click="Router.push('/posts/create')"
          :class="whereUrl('/posts/create')"
        >
          <div class="container" :class="whereUrl('/posts/create')">
            <div class="circle -red"></div>
            <p class="title">New Post</p>
            <div class="button"><BaseSquareButton /></div>
          </div>
        </div>
        <div
          class="sidebar-item"
          @click="Router.push('/missions')"
          :class="whereUrl('/missions')"
        >
          <div class="container" :class="whereUrl('/missions')">
            <div class="circle -yellow"></div>
            <p class="title">Missions</p>
            <div class="button"><BaseSquareButton /></div>
          </div>
        </div>
        <div
          class="sidebar-item"
          @click="Router.push('/users/edit')"
          :class="whereUrl('/users/edit')"
        >
          <div class="container" :class="whereUrl('/users/edit')">
            <div class="circle -green"></div>
            <p class="title">Mypage</p>
            <div class="button">
              <BaseSquareButton />
            </div>
          </div>
        </div>
        <div class="sidebar-item" @click="logout">
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
  computed,
  useRoute,
  watchEffect,
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
    const Route = useRoute()

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
    watchEffect(() => {
      console.log(Route.value.path)
    })

    const whereUrl = computed(() => (routeName: string) => {
      const pathName = Route.value.path
      return {
        active: pathName === routeName,
      }
    })

    return {
      // compositionAPI
      store,
      Router,
      // 認証
      logout,
      currentUser,
      whereUrl,
    }
  },
})
</script>
