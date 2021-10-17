<template>
  <div class="member-card-container">
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
  },
  setup() {
    return {}
  },
})
</script>
