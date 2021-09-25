<template>
  <div class="root-container">
    <Loading v-if="store.getters.getIsLoading && showSidebar" />
    <Sidebar v-if="showSidebar" />
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
  onMounted,
} from '@nuxtjs/composition-api'
import Loading from '~/components/loadings/Loading.vue'
import Sidebar from '../components/organisms/TheSidebar.vue'
export default defineComponent({
  components: {
    Sidebar,
    Loading,
  },
  setup() {
    // vuex
    const store = useStore()
    const Route = useRoute()

    // ref
    const currentUser = ref<any>({})
    /**
     *Sidebarを表示するか判断
     */
    const showSidebar = computed(
      (): Boolean =>
        Route.value.path !== '/login' && Route.value.path !== '/login/'
    )
    onMounted(() => {
      // document.querySelector('common-container')?.classList.add('-load')
    })

    return {
      // vuex
      store,

      // 認証
      currentUser,
      // Sidebarを表示するか判断
      showSidebar,
    }
  },
})
</script>
