<template>
  <div class="sidebar-container">
    <div class="container">
      <div class="top">
        <div class="image">
          <img :src="currentUser.photoURL" alt="" class="img" />
        </div>
        <div class="head">
          <p class="name">
            {{
              currentUser.nickName
                ? currentUser.nickName
                : currentUser.displayName
            }}
          </p>
          <div @click="openModal"><Icon :icon="faCode" types="sidebar" /></div>
        </div>

        <!-- TODO: 後で正しい値を表示できるように実装する -->
        <p class="date">Last Logined : 2021/08/31 23:00(仮)</p>
      </div>
      <div class="middle">
        <div
          class="sidebar-item"
          :class="whereUrl('/')"
          @click="Router.push('/')"
        >
          <div class="container" :class="whereUrl('/')">
            <div class="circle -red" :class="whereUrl('/')"></div>
            <p class="title">DashBoard</p>
            <div class="button"><BaseSquareButton /></div>
          </div>
        </div>
        <div
          class="sidebar-item"
          :class="whereUrl('/posts/create')"
          @click="Router.push('/posts/create')"
        >
          <div class="container" :class="whereUrl('/posts/create')">
            <div class="circle -yellow"></div>
            <p class="title">New Post</p>
            <div class="button"><BaseSquareButton /></div>
          </div>
        </div>
        <div
          class="sidebar-item"
          :class="whereUrl('/missions')"
          @click="Router.push('/missions')"
        >
          <div class="container" :class="whereUrl('/missions')">
            <div class="circle -green"></div>
            <p class="title">Missions</p>
            <div class="button"><BaseSquareButton /></div>
          </div>
        </div>
        <div
          class="sidebar-item"
          :class="whereUrl('/users/edit')"
          @click="Router.push('/users/edit')"
        >
          <div class="container" :class="whereUrl('/users/edit')">
            <div class="circle -blue"></div>
            <p class="title">Members List</p>
            <div class="button">
              <BaseSquareButton />
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <button class="common-button -logout" @click="logout">Sigin Out</button>
      </div>
    </div>
    <ModalUserEdit
      :control-flag="isOpened"
      title="プロフィール編集"
      @click="closeModal"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRouter,
  computed,
  useRoute,
} from '@nuxtjs/composition-api'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import BaseSquareButton from '@/components/atoms/BaseSquareButton.vue'
import Icon from '@/components/molecules/Icon.vue'
import ModalUserEdit from '@/components/organisms/ModalUserEdit.vue'

import { useModal } from '@/compositions/useModal'

export default defineComponent({
  components: {
    BaseSquareButton,
    Icon,
    ModalUserEdit,
  },
  setup() {
    // compositionAPI
    const store = useStore()
    const Router = useRouter()
    const Route = useRoute()

    // ref
    const currentUser = store.getters.getCurrentUser
    const { isOpened, openModal, closeModal } = useModal()

    // ログアウト
    const logout = async () => {
      try {
        await store.dispatch('logout')
      } catch (error) {
        store.dispatch('onRejectted', error)
      }
    }
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
      // アイコン
      faCode,
      // モーダル
      isOpened,
      openModal,
      closeModal,
    }
  },
})
</script>
