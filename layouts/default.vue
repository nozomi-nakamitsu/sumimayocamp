<template>
  <div>
    <Header v-if="showHeader" />
    <Nuxt />
    <!-- <Loading v-if="isLoading" :is-loading="isLoading" /> -->
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
