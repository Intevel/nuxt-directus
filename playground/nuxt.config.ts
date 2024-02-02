export default defineNuxtConfig({
  ssr: true,
  alias: {
    'nuxt-directus': '../src/module'
  },
  modules: ['nuxt-directus'],
  devtools: true,
  directus: {
    url: 'http://localhost:8055/',
    authConfig: {
      useNuxtCookies: true,
      refreshTokenCookieName: 'nuxt-directus_refresh_token'
    },
    moduleConfig: {
      devtools: true,
      autoRefresh: {
        enableMiddleware: false,
        redirectTo: '/login',
        to: ['/restricted']
      }
    }
  },
  routeRules: {
    '/restricted/**': {
      ssr: false
    }
  }
})
