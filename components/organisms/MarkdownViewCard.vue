<template>
  <div class="markdown-editor" :class="{ '-white': types }">
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
import { defineComponent, watchEffect } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true,
    },
    types: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    watchEffect(() => {
      if (props.types) {
        console.log(props.types)
        document.querySelector('.markdown-body')?.classList.add('-white')
      }
    })

    return {}
  },
})
</script>
