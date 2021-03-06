import { ref, useStore, watch } from '@nuxtjs/composition-api'
import { v4 as uuidv4 } from 'uuid'
import { CurrentUser, FileArray, PostForm } from '@/types/props-types'
import { timestamp } from '@/compositions/useFormatData'
export const useUploadFile = (currentUser: CurrentUser) => {
  const store = useStore()
  const isLoading = ref<boolean>(false)

  const form = ref<PostForm>({
    id: '',
    user_id: currentUser.uid,
    title: '',
    content: '',
    created_at: timestamp(new Date()),
    updated_at: timestamp(new Date()),
    user: { ...currentUser },
    files: [],
  })
  const files = ref<FileArray[]>(form.value.files)
  watch(
    () => form.value.files,
    () => {
      files.value = [...form.value.files]
    }
  )
  const fileChanged = async (file: any) => {
    isLoading.value = true
    const id = uuidv4()
    try {
      const url = await store.dispatch('auth/uploadFile', {
        file,
        id,
      })
      const reg = new RegExp('\\([.\\d]+?\\)', 'g')
      form.value.content = file.content.replace(reg, `(${url}})`)
      document
        .querySelector('.auto-textarea-input')
        ?.classList.remove('-hidden')
      document.querySelector('.v-note-show')?.classList.remove('-hidden')
      files.value = [...files.value, { id, url }]
    } catch (error) {
      store.dispatch('auth/onRejected', error)
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
      store.dispatch('auth/deleteFile', {
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
