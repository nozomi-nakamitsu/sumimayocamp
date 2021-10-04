<template>
  <div class="common-container">
    <div class="flex">
      <p
        v-if="[400, 403, 404, 500, 503, 504].includes(error.statusCode)"
        class="title"
      >
        {{ error.statusCode }}
      </p>
      <div class="image">
        <img src="@/assets/images/404.png" alt="" class="img" />
      </div>
      <p v-if="[404].includes(error.statusCode)">
        よくこのページまで辿り着けましたね！<br />すみまよキャンプアプリを使い倒してくれてるおかげかな?笑
      </p>
      <p v-else-if="[503, 504, 500].includes(error.statusCode)">
        ごめんなさいね！みっつ頑張って調査するから、今回は許して~~~
      </p>
      <p v-else>アクセスしようとしたページが表示できないよ〜</p>
      <p>気を取り直して、とりあえずさっきのページ戻ろか。</p>
      <button class="common-button -error" @click="$router.go(-1)">Back</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  setup() {
    return {}
  },
})
</script>
