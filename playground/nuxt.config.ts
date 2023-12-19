import NuxtDirectus from '..'

export default defineNuxtConfig({
  // @ts-ignore
  modules: [NuxtDirectus],
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
