<template>
  <BaseModal :control-flag="controlFlag" @click="$emit('click')">
    <div class="form-container -modal">
      <div class="flex">
        <div class="image">
          <img :src="data.sendUser.photoURL" alt="" class="img" />
        </div>
        <p class="text">
          <span class="bold">{{ data.sendUser.nickName }}</span> からの挑戦状
        </p>
      </div>
      <p class="title">{{ data.title }}</p>
      <div>
        <MarkdownViewCard :content="data.content" />
      </div>

      <div class="flex">
        <p>Challengers</p>
        <div v-for="status in data.status" :key="status.uid" class="items">
          <div class="image">
            <img :src="status.photoURL" alt="" class="img" />
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Mission } from '@/types/props-types'
import BaseModal from '@/components/atoms/BaseModal.vue'
import MarkdownViewCard from '@/components/organisms/MarkdownViewCard.vue'

export default defineComponent({
  components: {
    BaseModal,
    MarkdownViewCard,
  },
  props: {
    controlFlag: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object as PropType<Mission>,
      required: true,
    },
  },
  emits: ['click', 'created'],

  setup() {
    return {}
  },
})
</script>
