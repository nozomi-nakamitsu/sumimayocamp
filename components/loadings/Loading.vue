<template>
  <div v-if="isLoading" class="loading-container">
    <img src="@/assets/images/loading.gif" />
    <h2 class="text">Loading...</h2>
  </div>
</template>

<script lang="ts">
// TODO: 後でデザイン変更する！元デザインは仮である。
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Loading',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
