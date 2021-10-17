<template>
  <div class="flip-card" @click="$emit('open-modal', user)">
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
                  <div class="login">
                    <p v-if="user.isLogined">ログイン中</p>
                    <div v-else>
                      <p>離席中</p>
                      <p>
                        最終ログイン日{{
                          user.updated_at
                            ? formatDateToSlashWithTime(user.updated_at)
                            : null
                        }}
                      </p>
                    </div>
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
import { formatDateToSlashWithTime } from '@/compositions/useFormatData'

export default defineComponent({
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
  emits: ['open-modal'],
  setup() {
    return {
      formatDateToSlashWithTime,
    }
  },
})
</script>
