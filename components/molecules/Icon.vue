<template>
  <fa
    :icon="path"
    class="icon-container"
    :class="[
      { '-calendar': types === 'calendar' },
      { '-button': types === 'button' },
      { '-menu': types === 'menu' },
      labelColor,
    ]"
  />
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    icon: {
      types: String,
      required: true,
    },
    types: {
      types: String as () => string | null,
      default: null,
    },
    color: {
      types: String as () => string | null,
      default: null,
    },
  },

  setup(props) {
    // アイコン
    const path = computed(() => props.icon)
    const labelColor = computed(() => ({
      '-red': props.color === 'red',
      '-blue': props.color === 'blue',
      '-yellow': props.color === 'yellow',
      '-green': props.color === 'green',
      '-orange': props.color === 'orange',
      '-purple': props.color === 'purple',
      '-indigo': props.color === 'indigo',
      '-brown': props.color === 'brown',
    }))

    return {
      path,
      labelColor,
    }
  },
})
</script>
