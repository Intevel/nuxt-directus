import { getCookie } from 'h3'
import { useDirectusAuth } from '../composables/use-directus-auth'
import {
  abortNavigation,
  addRouteMiddleware,
  defineNuxtPlugin,
  navigateTo,
  useRuntimeConfig
} from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const {
    authConfig: {
      useNuxtCookies,
      refreshTokenCookieName
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
    refresh,
    tokens,
    user
  } = useDirectusAuth({ useStaticToken: false })

  const event = nuxtApp?.ssrContext?.event

  if (process.server && event) {
    if (useNuxtCookies) {
      const refreshToken = getCookie(event, refreshTokenCookieName)

      if (refreshToken) { await refresh({ refreshToken }).catch(_e => null) }
    } else {
      // TODO: Add server side auth refresh for `useNuxtCookies: false`
    }
  } else if (process.client && (!tokens.value?.access_token || !user.value)) {
    nuxtApp.hook('app:mounted', async () => { await refresh().catch(_e => null) })
  }

  if (enableMiddleware) {
    addRouteMiddleware(middlewareName, async (to, _from) => {
      const restricted = (!toArray.length || !!toArray.find((p: string) => p === to.path))

      if (!user.value && to.path !== redirectTo && restricted) {
        await navigateTo(redirectTo)
      }

      if (process.client && !nuxtApp.isHydrating && !user.value && to.path !== redirectTo && restricted) {
        return abortNavigation()
      }
    }, {
      global
    })
  }
})
