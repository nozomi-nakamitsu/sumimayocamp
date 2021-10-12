<template>
  <div
    class="base-comment-item-container"
    :class="[{ '-sent': types === 'sent' }]"
  >
    <div v-if="types == 'received'" class="image">
      <img :src="message.photoURL" :alt="message.nickName" class="img" />
    </div>
    <div class="message">
      <p class="text" :class="[{ '-sent': types === 'sent' }]">
        {{ message.text }}
      </p>
      <p class="date" style="text-align: end">
        {{ formatOnlyDateToSlashWithTime(new Date()) }}
      </p>
      <!-- <div
        @click="onDelete(message)"
        @mouseover="onMouse = true"
        @mouseleave="onMouse = false"
        class="delete"
        v-if="onMouse || isMenuOpen"
      >
        <Icon :icon="faTrash" types="comment" />
      </div> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { formatOnlyDateToSlashWithTime } from '@/compositions/useFormatData'

// import Icon from '@/components/molecules/Icon.vue'

export default defineComponent({
  // components: {
  //   Icon,
  // },
  props: {
    message: {
      type: Object,
      required: true,
    },
    types: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      faTrash,
      formatOnlyDateToSlashWithTime,
    }
  },
})
</script>
