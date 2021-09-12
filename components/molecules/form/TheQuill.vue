<template>
  <!-- <div class="quill-editor">
    <div id="editor" />
  </div> -->
  <div id="app" class="quill-editor">
    <quillEditor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { quillEditor } from 'vue-quill-editor'
export default defineComponent({
  components: {
    quillEditor,
  },
  setup(props) {
    const editorOption = {
      placeholder: 'Enter your message!',
      theme: 'bubble',
    }

    return {
      editorOption,
    }
  },
})
</script>
