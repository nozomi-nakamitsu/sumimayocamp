<template>
  <div class="user-edit-container">
    <input type="text" v-model="form.name" class="input" />
    <button @click="submit">変更する</button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'
import firebase from '../../plugins/firebase'
import { firestore } from '../../plugins/firebase'
export default defineComponent({
  setup() {
    // vuex
    const store = useStore()
    // ref系
    const form = ref({
      name: '',
    })
    onMounted(async () => {
      await firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          firestore.collection('users')
            .doc(user.uid)
            .get()
            .then((doc) => {
              store.commit('setIsLogined', true)
              store.commit('setCurrentUser', doc.data())
              form.value.name = store.getters.getCurrentUser.nickName
            })
        } else {
          console.log('ログインしてないよ')
        }
      })
    })

    const submit = async () => {
      try {
        await store.dispatch('editNickName', form.value.name)
      } catch (error) {
        store.dispatch('onRejectted', error)
      }
    }
    return {
      submit,
      store,
      form,
    }
  },
})
</script>
