export default defineNuxtConfig({
  alias: {
    'nuxt-directus': '../src/module'
  },
  modules: ['nuxt-directus'],
  devtools: true,
  directus: {
    url: 'http://localhost:8055/',
    authConfig: {
      refreshTokenCookieName: 'nuxt-directus_refresh_token'
    },
    moduleConfig: {
      devtools: true,
      autoImport: true,
      authMiddleware: {
        enable: true,
        redirect: '/login',
        to: ['/restricted'],
        global: true
      }
    }
  }
})
