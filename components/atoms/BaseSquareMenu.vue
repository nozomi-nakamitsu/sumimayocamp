<template>
  <v-app>
    <div class="square-menu-container">
      <v-menu
        :close-on-content-click="true"
        :nudge-width="200"
        offset-x
        style="display: block"
      >
        <template #activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <BaseSquareButton />
          </div>
        </template>

        <v-card class="card">
          <div class="menu-item" @click="onUpdate">
            <Icon :icon="faCode" types="menu" />
            <p class="text">Edit</p>
          </div>
          <div class="menu-item" @click="$emit('delete')">
            <Icon :icon="faTrash" types="menu" />
            <p class="text">Delete</p>
          </div>
        </v-card>
      </v-menu>
    </div>
  </v-app>
</template>
<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { faTrash, faCode } from '@fortawesome/free-solid-svg-icons'
import BaseSquareButton from '@/components/atoms/BaseSquareButton.vue'
import Icon from '@/components/molecules/Icon.vue'

// バリデーション周り

export default defineComponent({
  components: {
    BaseSquareButton,
    Icon,
  },
  props: {
    editPath: {
      type: String as () => string | null,
      default: null,
    },
  },
  emits: ['delete', 'update-mission'],
  setup(props, ctx) {
    const Router = useRouter()
    const onUpdate = () => {
      if (props.editPath === null) {
        ctx.emit('update-mission')
      } else {
        Router.push(props.editPath)
      }
    }
    return {
      faTrash,
      faCode,
      Router,
      onUpdate,
    }
  },
})
</script>
