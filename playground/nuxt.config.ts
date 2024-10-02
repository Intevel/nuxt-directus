export default defineNuxtConfig({
  ssr: true,

  alias: {
    'nuxt-directus': '../src/module',
  },
  modules: ['../src/module'],

  directus: {
    authConfig: {
      refreshTokenCookieName: 'nuxt-directus_refresh_token',
    },
  },

  devtools: { enabled: true },

  compatibilityDate: '2024-07-14',
})
