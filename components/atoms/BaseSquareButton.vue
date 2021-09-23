<template>
  <div class="square-button" @class="$emit('click')">
    <div>
      <Icon :icon="faAngleRight" types="button" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Icon from '@/components/molecules/Icon.vue'
export default defineComponent({
  components: {
    Icon,
  },
  props: {},
  emits: ['click'],
  setup() {
    return {
      faAngleRight,
    }
  },
})
</script>
