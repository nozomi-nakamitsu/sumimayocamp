<template>
  <div class="root-container">
    <Loading v-if="store.getters.getIsLoading && showSidebar" />

    <Sidebar v-if="showSidebar" />
    <transition name="page">
      <Nuxt />
    </transition>
    <TheErrorAlert />
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
import Sidebar from '../components/organisms/TheSidebar.vue'
import Loading from '~/components/loadings/Loading.vue'
import TheErrorAlert from '@/components/organisms/TheErrorAlert.vue'

export default defineComponent({
  components: {
    Sidebar,
    Loading,
    TheErrorAlert,
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

    return {
      store,
      currentUser,
      showSidebar,
    }
  },
})
</script>
