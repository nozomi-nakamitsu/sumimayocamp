<template>
  <div>
    <div v-if="!isLoading">
      <p>{{ store.getters.getCurrentUser.nickName }}さんようこそ</p>
      <img :src="store.getters.getCurrentUser.photoURL" alt="" />
      <button @click="logout">ログアウト</button>
      <a href="/users/edit">ニックネームを変更する</a>
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
import { firestore } from '../plugins/firebase'
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
    const currentUser = ref<any>({})
    /**
     * ログインしてるかチェックする
     *TODO: 後でmiddlewareに書いて共通化する!
     */
    onMounted(async () => {
      await firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          firestore
            .collection('users')
            .doc(user.uid)
            .get()
            .then((doc) => {
              console.log(doc.data())
              store.commit('setIsLogined', true)
              store.commit('setCurrentUser', doc.data())
              console.log(
                'store.getters.getCurrentUser',
                store.getters.getCurrentUser
              )
            })
          // ログイン中の場合の処理
        } else {
          console.log('ログインしてないよ')
        }
        isLoading.value = false
      })
    })
    const logout = async () => {
      try {
        await store.dispatch('logout')
      } catch (error) {
        store.dispatch('onRejectted', error)
      }
    }

    return {
      // vuex
      store,
      // loarding
      isLoading,
      // 認証
      logout,
      currentUser,
    }
  },
})
</script>
