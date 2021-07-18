<template>
  <div>
    <div class="test" @click="func">あああ</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const test = ref<boolean>(false)
    const func = () => {
      console.log(test.value)
    }
    return {
      func,
    }
  },
})
</script>
