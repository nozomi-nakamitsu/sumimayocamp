<template>
  <div>
    <div v-if="store.getters.getCurrentUser.displayName">
      <p>{{ store.getters.getCurrentUser.displayName }}さんようこそ</p>
      <img :src="store.getters.getCurrentUser.photoURL" alt="" />
    </div>
    <Loading :is-loading="isLoading" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'
import firebase from '../plugins/firebase'
import Loading from '../components/common/Loading.vue'
export default defineComponent({
  components: {
    Loading,
  },
  setup() {
    // vuex
    const store = useStore()
    // ref
    const isLoading = ref<boolean>(true)
    /**
     * ログインしてるかチェックする
     *TODO: 後でmiddlewareに書いて共通化する!
     */
    onMounted(async () => {
      await firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          store.commit('setIsLogined', true)
          store.commit('setCurrentUser', user)
          // ログイン中の場合の処理
        } else {
          console.log('ログインしてないよ')
        }
        isLoading.value = false
      })
    })

    return {
      // vuex
      store,
      // loarding
      isLoading,
    }
  },
})
</script>
