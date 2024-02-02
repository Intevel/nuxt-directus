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
      refreshTokenCookieName: 'nuxt-directus_refresh_token'
    },
    moduleConfig: {
      devtools: true,
      autoRefresh: {
        enableMiddleware: true,
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
