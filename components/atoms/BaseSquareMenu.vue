<template>
  <div class="square-menu-container">
    <v-menu
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
      style="display: block"
    >
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          <BaseSquareButton />
        </div>
      </template>

      <v-card class="card">
        <div class="menu-item" @click="Router.push(`/posts/edit/${postId}`)">
          <Icon :icon="faCode" types="menu" />
          <p class="text">Edit</p>
        </div>
        <div class="menu-item" @click="$emit('delete-post')">
          <Icon :icon="faTrash" types="menu" />
          <p class="text">Delete</p>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import BaseSquareButton from '@/components/atoms/BaseSquareButton.vue'
import Icon from '@/components/molecules/Icon.vue'
import { faTrash, faCode } from '@fortawesome/free-solid-svg-icons'

// バリデーション周り

export default defineComponent({
  components: {
    BaseSquareButton,
    Icon,
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  emits: ['delete-post'],
  setup() {
    const Router = useRouter()
    return {
      faTrash,
      faCode,
      Router,
    }
  },
})
</script>
