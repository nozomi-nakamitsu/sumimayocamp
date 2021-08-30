import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
} from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { i18n } from '@/config/i18n'

// 必要なルールのみインポート
extend('required', required)

configure({
  defaultMessage: (field, values) => {
    values._field_ = i18n.t(`fields.${field}`)
    if (values.target) {
      values.target = i18n.t(`fields.${values.target}`)
    }
    return i18n.tc(`validations.${values._rule_}`, 1, values)
  },
})
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
