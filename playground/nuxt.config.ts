export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: true,
  directus: {
    url: 'http://localhost:8055/',
    moduleConfig: {
      devtools: true,
      autoImport: true
    },
    authConfig: {
      refreshTokenCookieName: 'nuxt-directus_refresh_token'
    }
  }
})
