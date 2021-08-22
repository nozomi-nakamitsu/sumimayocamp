import { computed } from '@nuxtjs/composition-api'

/**
 * NOTE:
 * バリデーションが必要な form 類のスタイルを制御するための computed
 * クラス名を返す
 */
export const doneOrError = computed(() => {
  return (failed: boolean, isBackendError: boolean) => {
    return {
      '-error': failed || isBackendError,
    }
  }
})
