<template>
  <div class="markdown-editor">
    <no-ssr>
      <mavon-editor
        v-model="content"
        language="ja"
        :subfield="false"
        :editable="false"
        :toolbars-flag="false"
        :box-shadow="false"
        default-open="preview"
        preview-background="#fff"
      />
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
