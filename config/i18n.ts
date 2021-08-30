import Vue from 'vue'
import VueI18n from 'vue-i18n'
import validationJa from 'vee-validate/dist/locale/ja.json'
import _ from 'lodash'
import ja from '@/lang/ja'

Vue.use(VueI18n)

const messages = {
  ja: _.merge(ja, { validations: validationJa.messages }),
}

const i18n = new VueI18n({
  locale: 'ja',
  fallbackLocale: 'ja',
  messages,
})
export { i18n }
