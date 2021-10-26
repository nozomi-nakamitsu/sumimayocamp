<template>
  <div class="root-container">
    <Loading v-if="store.getters['auth/getIsLoading'] && showSidebar" />

    <Sidebar v-if="showSidebar" />
    <transition name="page">
      <div class="wrapper-container">
        <BaseBackground
          v-if="!store.getters['auth/getIsLoading']"
          :path="path"
        />
        <Nuxt />
      </div>
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
import BaseBackground from '~/components/atoms/BaseBackground.vue'

export default defineComponent({
  components: {
    Sidebar,
    Loading,
    TheErrorAlert,
    BaseBackground,
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

    const path = computed((): string => Route.value.path)

    return {
      store,
      currentUser,
      showSidebar,
      path,
    }
  },
})
</script>
