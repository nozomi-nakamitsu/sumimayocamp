<template>
  <div class="background-conatiner">
    <div class="container">
      <div class="circle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {},
  setup() {},
})
</script>
<style scoped>
.background-conatiner {
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 1;
  top: -100px;
  right: -100px;
}

.container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.circle {
  width: 650px;
  height: 420px;
  background: linear-gradient(90deg,#E3E3FF, #E3E3FF);

  border-radius: 28% 29% 56% 63% / 57% 73% 43% 39%;
  animation: move 10s linear infinite;
}
@keyframes move {
  25% {
    border-radius: 46% 88% 66% 30% / 39% 47% 18% 60%;
  }
  50% {
    border-radius: 30% 50% 59% 41% / 72% 21% 79% 28%;
  }

  75% {
    border-radius: 100% 69% 100% 83% / 68% 99% 93% 43%;
  }
}
</style>
