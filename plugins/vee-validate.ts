import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
  configure,
} from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
// import ja from 'vee-validate/dist/locale/ja.json'
import validateJa from '@/lang/vee-validate/ja';
import ja from '@/lang/ja';

// 必要なルールのみインポート
extend('required', required)


// メッセージを設定
// localize('ja', ja)


// const validationMessages = {
//  ja,

//   };
  configure({
    // @ts-ignore
    generateMessage:localize('ja',{
      messages:validateJa.messages,
      // @ts-ignore
      field :ja,
    }),
  })
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
