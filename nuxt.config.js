import colors from 'vuetify/es5/util/colors'

require('dotenv').config()

const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = process.env
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - sumimayocamp',
    title: 'sumimayocamp',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    script: [
      {
        src: '//cdn.quilljs.com/1.3.6/quill.js',
        src: '//cdn.quilljs.com/1.3.6/quill.min.js',
        // src: '//cdn.quilljs.com/1.3.6/quill.core.js',
      },
    ],
    link: [
      { rel: 'stylesheet', href: '//cdn.quilljs.com/1.3.6/quill.snow.css' },
      { rel: 'stylesheet', href: '//cdn.quilljs.com/1.3.6/quill.bubble.css' },
      // { rel: 'stylesheet', href: '//cdn.quilljs.com/1.3.6/quill.core.css' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // プロジェクト内の SCSS ファイル
    '@/assets/scss/app.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-mavon-editor', ssr: false },
    { src: '~plugins/v-calendar.ts', ssr: false },
    '@/plugins/vee-validate',
    '@/plugins/i18n.ts',
    '@/plugins/nuxt-quill-plugin.ts',
    '@/plugins/vue-mention.ts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'ja',
            iso: 'ja',
            file: 'ja.json',
          },
          { code: 'en', iso: 'en-US' },
        ],
        defaultLocale: 'ja',
        vueI18n: {
          fallbackLocale: 'ja',
        },
        vueI18nLoader: true,
      },
    ],
    ['nuxt-fontawesome'],
  ],

  fontawesome: {
    component: 'fa',
  },
  defaultLocale: 'ja',

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate'],
  },
  env: {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID,
  },
  ssr: false,
  manifest: {
    gcm_sender_id: '103953800507',
  },
  router: {
    middleware: ['auth'],
  },
}
