<template>
  <div v-if="controlFlag" class="modal-background">
    <div class="base-modal">
      <div v-if="controlFlag" class="inner">
        <div class="header">
          <p class="text">{{ title }}</p>
          <div class="icon" @click="$emit('click')">
            <Icon :icon="faTimes" types="modal" />
          </div>
        </div>
        <div class="main">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * NOTE: モーダルのベースとして使用するコンポーネント
 * - controlFlag 表示/非表示を制御する boolteleport と transition の兼ね合いでcomponent 自体にv-ifすると不具合が生じるため propsで渡している
 * - title header 部分に表示するタイトル文言
 */
import { defineComponent, watch } from '@nuxtjs/composition-api'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Icon from '@/components/molecules/Icon.vue'
export default defineComponent({
  components: {
    Icon,
  },
  props: {
    controlFlag: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String as () => string | null,
      default: null,
    },
  },
  emits: ['click'],
  setup(props) {
    watch(
      () => props.controlFlag,
      () => {
        if (props.controlFlag) {
          document.querySelector('.sidebar-wrapper')?.classList.add('-z0')
        } else {
          document.querySelector('.sidebar-wrapper')?.classList.remove('-z0')
        }
      }
    )
    return {
      faTimes,
    }
  },
})
</script>
