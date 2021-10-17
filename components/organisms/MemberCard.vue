<template>
  <div class="flip-card">
    <div class="wrapper">
      <div class="cols">
        <div class="col" ontouchstart="this.classList.toggle('hover');">
          <div class="container">
            <div class="front">
              <div class="inner -front">
                <div class="image">
                  <img :src="user.photoURL" alt="" class="img" />
                </div>
                <div class="body">
                  <p class="name">{{ user.nickName }}</p>
                  <div>
                    <div><Icon /></div>
                    <p>ログイン中</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="back">
              <div class="inner">
                <div class="body">
                  <p class="text">
                    <span class="name">{{ user.nickName }}</span
                    >さんの
                  </p>
                  <p class="text">今週の宣言</p>
                  <p class="text -mt20">
                    {{ declaration ? declaration : '宣言してないようです...' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Icon from '../molecules/Icon.vue'

export default defineComponent({
  components: { Icon },
  props: {
    user: {
      type: Object,
      required: true,
    },
    declaration: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {}
  },
})
</script>
