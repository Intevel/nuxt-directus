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
    moduleConfig: {
      devtools: true,
      autoRefresh: {
        enableMiddleware: false,
        redirectTo: '/login',
        to: ['/restricted'],
      },
      readMeQuery: {
        fields: ['id', 'email', 'first_name', 'last_name', 'avatar', 'status'],
      },
      nuxtImage: {
        useAuthToken: false,
        useStaticToken: true,
      },
    },
  },

  image: {
    providers: {
      nuxtDirectus: {
        options: {
          maxAge: 2592000,
          modifiers: {
            withoutEnlargement: 'true',
            transforms: [['blur', 4], ['negate']],
          },
        },
      },
    },
  },

  devtools: { enabled: true },
  routeRules: {
    '/restricted/**': {
      ssr: false,
    },
  },
  compatibilityDate: '2024-07-14',
})
