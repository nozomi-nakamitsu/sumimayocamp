// モーダルの開け閉めする
import { ref } from '@nuxtjs/composition-api'

export const useModal = () => {
  const isOpened = ref<boolean>(false)
  const openModal = () => {
    isOpened.value = true
  }
  const closeModal = () => {
    isOpened.value = false
  }
  return {
    isOpened,
    openModal,
    closeModal,
  }
}
