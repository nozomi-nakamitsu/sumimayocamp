<template>
  <!-- <div v-if="isLoading" class="loading-container">
    <img src="@/assets/images/loading.gif" />
    <h2 class="text">Loading...</h2>
  </div> -->

  <div id="fv_wap" class="fv_wap">
    <div class="fv_slide fv_slide_bottom"></div>
  </div>
</template>

<script lang="ts">
// TODO: 後でデザイン変更する！元デザインは仮である。
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { TimelineMax, Power4, Expo, gsap } from 'gsap'

export default defineComponent({
  name: 'Loading',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    onMounted(() => {
      gsapFunc()
    })
    const gsapFunc = () => {
      gsap.to('.fv_slide', 0.1, {
        left: 300,
        // delay: 1.2,
        onComplete: endstart,
      })
      function endstart() {
        gsap.to('.fv_slide_bottom', 1.8, {
          height: '100%',
          top: 0,
          // delay: 0.4,
          ease: Power4.easeOut,
        })

        gsap.to('.fv_slide_bottom', 1.8, {
          height: '100%',
          top: 0,
          // delay: 0.4,
          ease: Power4.easeOut,
        })
        gsap.to('.common-container', 0.4, {
          opacity: 1,
          delay: 1.8,
        })
        gsap.to('.fv_slide_bottom', 0.4, {
          opacity: 0,
          delay: 1.8,
        })
      }
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
/* .fv_slide_inner {
  display: block;
  height: 100%;
}
.fv_slide_fig {
  height: 100%;
}
.fv_slide_inner:hover img {
  filter: grayscale(0%);
}
.fv_slide_item_wap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.6s ease 0s;
  z-index: 2;
} */
/* .fv_slide_item {
  padding: 2% 5%;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  color: #000;
  text-align: center;
  transition: all 0.6s ease 0s;
  font-size: 2vw;
}
.fv_slide_inner:hover .fv_slide_item {
  background-color: rgba(255, 255, 255, 1);
  transform: scale(1.1, 1.1);
} */
</style>
