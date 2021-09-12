<template>
  <div class="quill-editor">
    <div id="editor" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import Quill from 'quill'
export default defineComponent({
  setup(props) {
    setTimeout(() => {
      let editor = new Quill('#editor', {
        placeholder: 'Compose an epic...',
        theme: 'bubble',
      })
    }, 10)
    return {}
  },
})
</script>
