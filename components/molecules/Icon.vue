<template>
  <fa :icon="path" class="icon-container" />
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    icon: {
      types: String,
      required: true,
    },
  },

  setup(props) {
    // アイコン
    const path = computed(() => props.icon)

    return {
      // アイコン
      path,
    }
  },
})
</script>
