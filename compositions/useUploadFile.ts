import { ref, useStore } from '@nuxtjs/composition-api'
import { FileArray, PostForm } from '@/types/props-types'
import { v4 as uuidv4 } from 'uuid'
export const useUploadFile = () => {
  const store = useStore()
  const isLoading = ref<boolean>(false)
  const files = ref<FileArray[]>([])
  const currentUser = store.getters.getCurrentUser
  const form = ref<PostForm>({
    id: '',
    user_id: currentUser.uid,
    title: '',
    content: '',
    created_at: new Date(),
    updated_at: new Date(),
    user: { ...currentUser },
    files: [],
  })
  const fileChanged = async (file: any) => {
    isLoading.value = true
    const id = uuidv4()
    try {
      const url = await store.dispatch('uploadFile', {
        file,
        id,
      })
      var reg = new RegExp('\\([.\\d]+?\\)', 'g')
      form.value.content = file.content.replace(reg, `(${url}})`)
      document
        .querySelector('.auto-textarea-input')
        ?.classList.remove('-hidden')
      document.querySelector('.v-note-show')?.classList.remove('-hidden')
      files.value = [...files.value, { id: id, url: url }]
    } catch (error) {
      console.error('file upload', error)
    } finally {
      isLoading.value = false
    }
  }
  /**
   * 投稿してないファイルがあればstorageから削除
   */
  const deleteUnNecessaryFiles = () => {
    files.value.map((file) => {
      const id = file.id
      store.dispatch('deleteFile', {
        id,
      })
    })
  }
  return {
    isLoading,
    fileChanged,
    files,
    form,
    currentUser,
    deleteUnNecessaryFiles,
  }
}
