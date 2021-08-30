import Vue from 'vue'
import VueI18n from 'vue-i18n'
import validationJa from 'vee-validate/dist/locale/ja.json'
import validationEn from 'vee-validate/dist/locale/en.json'
import ja from '@/lang/ja'
// import en from '@/locales/en'
import _ from 'lodash'

Vue.use(VueI18n)

const messages = {
  ja: _.merge(ja, { validations: validationJa.messages }),
  // en: _.merge(en, { validations: validationEn.messages }),
}

const i18n = new VueI18n({
  locale: 'ja',
  fallbackLocale: 'ja',
  messages,
})
export { i18n }
