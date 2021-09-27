import { Context } from '@nuxt/types'
export default function ({ app, store }: Context) {
  app?.router?.afterEach(() => {
    // ページ遷移ごとに行いたい処理
    document.querySelector('.common-container')?.classList.add('-load')
    store.commit('setIsLoading', true)
  })
}
