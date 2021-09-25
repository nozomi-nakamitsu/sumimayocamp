<template>


  <div id="fv_wap" class="fv_wap">
    <div class="fv_slide fv_slide_bottom"></div>
  </div>
</template>

<script lang="ts">
// TODO: 後でデザイン変更する！元デザインは仮である。
import {
  defineComponent,
  onMounted,
  useStore,
} from '@nuxtjs/composition-api'
import { Power4, gsap } from 'gsap'

export default defineComponent({
  name: 'Loading',
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
        gsap.to('.fv_slide_bottom', 1.0, {
          height: '100%',
          top: 0,

          ease: Power4.easeOut,
        })

        gsap.to('.fv_slide_bottom', 1.0, {
          height: '100%',
          top: 0,
          ease: Power4.easeOut,
        })
        gsap.to('.fv_slide_bottom', 0.4, {
          opacity: 0,
          delay: 1.6,
          onLeave: () => finishLoading(),
        })
      }
    }
    const finishLoading = () => {
      document.querySelector('.common-container')?.classList.remove('-load')
      store.commit('setIsLoading', false)
    }

  },
})
</script>
<style scoped>
#fv_wap {
  position: absolute;
  width: 100%;
  height: 100vh;
  /* margin-left: 300px; */
  /* overflow: hidden;
  margin: 0 auto; */
}
.fv_slide {
  position: absolute;
  width: calc(100% - 300px);
  /* height: 0.1vw; */
  /* top: 50%;
  bottom: 50%; */
  bottom: 0;
  left: 300px;
  background-color: pink;
  z-index: 3;
}
</style>
