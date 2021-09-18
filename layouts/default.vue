<template>
  <div>
    <Header v-if="showHeader" />
    <Nuxt />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  useRoute,
  computed,
} from '@nuxtjs/composition-api'
import Header from '../components/organisms/Header.vue'
export default defineComponent({
  components: {
    Header,
  },
  setup() {
    // vuex
    const store = useStore()
    const Route = useRoute()

    // ref
    const isLoading = ref<boolean>(true)
    const currentUser = ref<any>({})
    /**
     *headerを表示するか判断
     */
    const showHeader = computed(
      (): Boolean =>
        Route.value.path !== '/login' && Route.value.path !== '/login/'
    )

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
