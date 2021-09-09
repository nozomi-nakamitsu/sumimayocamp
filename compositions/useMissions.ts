import { ref, useStore, watch } from '@nuxtjs/composition-api'
import { FileArray, MissionPost } from '@/types/props-types'
import { v4 as uuidv4 } from 'uuid'
export const useMissions = (props: any) => {
  const store = useStore()
  const isLoading = ref<boolean>(false)

  const currentUser = store.getters.getCurrentUser
  const missionForm = ref<MissionPost>({
    id: '',
    title: '',
    content: '',
    created_at: new Date(),
    updated_at: new Date(),
    sendUser: { ...currentUser },
    receiveUser: [],
    files: [],
    status: null,
  })

  const files = ref<FileArray[]>(missionForm.value.files)
  watch(
    () => missionForm.value.files,
    () => {
      files.value = [...missionForm.value.files]
    }
  )

  watch(
    () => props.defaultData,
    () => {
      if (!props.defaultData) {
        missionForm.value = {
          id: '',
          title: '',
          content: '',
          created_at: new Date(),
          updated_at: new Date(),
          sendUser: { ...currentUser },
          receiveUser: [],
          files: [],
          status: null,
        }
        return
      }
      missionForm.value = { ...props.defaultData }
    }
  )
  const fileChanged = async (file: any) => {
    isLoading.value = true
    const id = uuidv4()
    try {
      const url = await store.dispatch('uploadFile', {
        file,
        id,
      })
      var reg = new RegExp('\\([.\\d]+?\\)', 'g')
      missionForm.value.content = file.content.replace(reg, `(${url}})`)
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
    missionForm,
    currentUser,
    deleteUnNecessaryFiles,
  }
}
