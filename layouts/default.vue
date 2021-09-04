<template>
  <div>
    <div v-if="!isLoading">
      <Header v-if="showHeader" />
      <Nuxt />
    </div>
    <Loading v-if="isLoading" :is-loading="isLoading" />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  useStore,
  onMounted,
  ref,
  useRoute,
  useRouter,
  computed,
} from '@nuxtjs/composition-api'
import firebase, { firestore } from '../plugins/firebase'
import Loading from '../components/loadings/Loading.vue'
import Header from '../components/organisms/Header.vue'
export default defineComponent({
  components: {
    Loading,
    Header,
  },
  setup() {
    // vuex
    const store = useStore()
    const Route = useRoute()
    const Router = useRouter()

    // ref
    const isLoading = ref<boolean>(true)
    const currentUser = ref<any>({})
    /**
     * ログインしてるかチェックする
     *TODO: 後でmiddlewareに書いて共通化する!
     */
    onMounted(async () => {
      isLoading.value = true
      await firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          firestore
            .collection('users')
            .doc(user.uid)
            .get()
            .then((doc) => {
              store.commit('setIsLogined', true)
              store.commit('setCurrentUser', doc.data())
              isLoading.value = false
            })
          // ログイン中の場合の処理
        } else {
          if (Route.value.path !== '/login') {
            Router.push('/login')
          }
          isLoading.value = false
        }
      })
    })
    /**
     *headerを表示するか判断
     */
    const showHeader = computed((): Boolean => Route.value.path !== '/login')

    return {
      // vuex
      store,
      // loarding
      isLoading,
      // 認証
      currentUser,
      // headerを表示するか判断
      showHeader,
    }
  },
})
</script>
