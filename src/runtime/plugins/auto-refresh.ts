import { useDirectusAuth } from '../composables/use-directus-auth'
import {
  abortNavigation,
  addRouteMiddleware,
  defineNuxtPlugin,
  navigateTo,
  useRuntimeConfig
} from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const {
    authConfig: {
      useNuxtCookies
    },
    moduleConfig: {
      autoRefresh: {
        enableMiddleware,
        global,
        middlewareName,
        redirectTo,
        to: toArray
      }
    }
  } = useRuntimeConfig().public.directus

  const {
    refreshTokenCookie,
    refreshTokens,
    tokens,
    user
  } = useDirectusAuth({ useStaticToken: false })

  if (!tokens.value?.access_token && (!!refreshTokenCookie().value || !useNuxtCookies)) {
    nuxtApp.hook('app:mounted', async () => {
      await refreshTokens()
    })
  }

  if (enableMiddleware) {
    addRouteMiddleware(middlewareName, (to, _from) => {
      const restricted = (!toArray.length || !!toArray.find((p: string) => p === to.path))

      nuxtApp.hook('app:mounted', async () => {
        if (!user.value && to.path !== redirectTo && restricted) {
          await navigateTo(redirectTo)
        }
      })

      if (process.client && !nuxtApp.isHydrating && !user.value && to.path !== redirectTo && restricted) {
        return abortNavigation()
      }
    }, {
      global
    })
  }
})
