<template>
  <div>
    <p style="font-size: 1.2rem">挑戦状から選択</p>
    <v-container fluid>
      <v-row align="center">
        <v-col style="padding: 8px 0">
          <v-select
            v-model="value"
            :items="items"
            attach
            chips
            label="Chips"
            multiple
            solo
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
// バリデーション周り

export default defineComponent({
  setup(props, ctx) {
    const value = ref([])
    const items = ref(['1', '2', '3'])

    return {
      value,
      items,
    }
  },
})
</script>
