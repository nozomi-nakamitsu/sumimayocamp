<template>
  <div id="fv_wap" class="fv_wap">
    <!-- <vue-wavify
        fill="#e3e3ff"
        class="fv_slide fv_slide_bottom"
        :points="6"
        :speed="0.3"
        :amplitude="40"
        :height="0"
        styles="height:0"
      /> -->
    <div class="fv_slide fv_slide_bottom"></div>
  </div>
</template>

<script lang="ts">
// TODO: 後でデザイン変更する！元デザインは仮である。
import { defineComponent, onMounted, useStore } from '@nuxtjs/composition-api'
import { Power4, gsap } from 'gsap'
import VueWavify from 'vue-wavify'

export default defineComponent({
  name: 'Loading',
  components: {
    VueWavify,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore()
    onMounted(() => {
      gsapFunc()
    })
    const gsapFunc = () => {
      gsap.to('.fv_slide', 0.1, {
        left: 300,

        onComplete: endstart,
      })
      function endstart() {
        gsap.to('.fv_slide_bottom', 0.8, {
          height: '100%',
          top: 0,

          ease: Power4.easeOut,
        })

        gsap.to('.fv_slide_bottom', 0.8, {
          height: '100%',
          top: 0,
          ease: Power4.easeOut,
        })
        gsap.to('.fv_slide_bottom', 0.4, {
          opacity: 0,
          delay: 1.2,
          onLeave: () => finishLoading(),
        })
      }
    }
    const finishLoading = () => {
      store.commit('setIsLoading', false)
    }
  },
})
</script>
<style scoped>
#fv_wap {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  /* margin-left: 300px; */
  /* overflow: hidden;
  margin: 0 auto; */
}
.fv_slide {
  position: fixed;
  width: calc(100% - 300px);
  /* height: 0.1vw; */
  /* top: 50%;
  bottom: 50%; */
  bottom: 0;
  left: 300px;
  background: #e3e3ff;
  z-index: 3;
}
</style>
