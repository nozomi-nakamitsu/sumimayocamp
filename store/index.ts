// import { createLogger } from 'vuex'
import { Auth } from './auth'

// const debug = process.env.NODE_ENV !== 'production'

// Vuex厳格モードをオフ（配列の更新が上手くいかないので追加しています><）
export const strict = false

export const store = {
  state: {
    version: '1.0.0',
  },
  modules: { Auth },
  // strict: debug,
  // plugins: debug ? [createLogger()] : [],
}
