export default defineNuxtConfig({
  ssr: true,
  alias: {
    'nuxt-directus': '../src/module'
  },
  modules: ['nuxt-directus'],
  devtools: true,
  directus: {
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
      },
      readMeQuery: {
        fields: ['id', 'email', 'first_name', 'last_name', 'avatar', 'status']
      },
      nuxtImage: {
        useAuthToken: false,
        useStaticToken: true
      }
    }
  },
  image: {
    providers: {
      nuxtDirectus: {
        options: {
          maxAge: 2592000,
          modifiers: {
            withoutEnlargement: 'true',
            transforms: [['blur', 4], ['negate']]
          }
        }
      }
    }
  },
  routeRules: {
    '/restricted/**': {
      ssr: false
    }
  }
})
