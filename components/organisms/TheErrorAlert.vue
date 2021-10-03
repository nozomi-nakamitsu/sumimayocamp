<template>
  <div v-if="errorMeesage" class="error-alert">
    <v-alert
      border="left"
      color="red"
      dense
      dismissible
      elevation="4"
      prominent
      type="error"
      class="alert"
      transition="scale-transition"
      @input="onClose"
      >{{ errorMeesage }}</v-alert
    >
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  useStore,
  useRouter,
  ref,
  computed,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    // compositionAPI
    const store = useStore()
    const Router = useRouter()
    // ref
    const errorMeesage = computed(() => store.getters.getError)

    const alert = ref(true)

    const onClose = () => {
      store.dispatch('resetError')
    }

    return {
      // compositionAPI
      store,
      Router,
      // ref
      errorMeesage,
      alert,
      onClose,
    }
  },
})
</script>
