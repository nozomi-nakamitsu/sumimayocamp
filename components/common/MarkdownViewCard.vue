<template>
  <div class="markdown-editor">
    <no-ssr>
      <mavon-editor
        language="ja"
        v-model="content"
        :subfield="false"
        :editable="false"
        :toolbarsFlag="false"
        :boxShadow="false"
        defaultOpen="preview"
        previewBackground="#fff"
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
