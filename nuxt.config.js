import colors from 'vuetify/es5/util/colors'
const { STRIPE_API_PUBLIC } = process.env

export default {
  privateRuntimeConfig: {
    STRIPE_API_PUBLIC
  },
  publicRuntimeConfig: {
    STRIPE_API_PUBLIC: process.env.NODE_ENV !== 'production' ? STRIPE_API_PUBLIC : undefined
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s｜col',
    title: 'client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios',
    '~/plugins/dayjs'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
    credentials:true
  },
  proxy: {
    '/api': process.env.API_URL,
    '/address': {
      target: 'https://zipcloud.ibsnet.co.jp',
      pathRewrite: { '^/address': '/api/search'}
    },
    '/bank': {
      target: 'https://bank.teraren.com',
      pathRewrite: { '^/bank': '/banks'}
    },
    '/venue': {
      target: 'https://opendata.resas-portal.go.jp',
      pathRewrite: { '^/venue': '/api/v1'}
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
