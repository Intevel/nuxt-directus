import { appendResponseHeader, getCookie, getHeader } from 'h3'
import type { AuthenticationData, AuthenticationMode } from '@directus/sdk'
import { useDirectusAuth } from '../composables/use-directus-auth'
import {
  abortNavigation,
  addRouteMiddleware,
  defineNuxtPlugin,
  navigateTo,
  useRuntimeConfig,
} from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const {
    url: baseURL,
    authConfig: {
      mode,
      refreshTokenCookieName,
    },
    moduleConfig: {
      autoRefresh: {
        enableMiddleware,
        global,
        middlewareName,
        redirectTo,
        to: toArray,
      },
    },
  } = useRuntimeConfig().public.directus

  const {
    refreshTokenCookie,
    refresh,
    tokens,
    readMe,
    user,
  } = useDirectusAuth({ staticToken: false })

  const event = nuxtApp?.ssrContext?.event

  if (import.meta.server && event) {
    if (mode === 'json' as AuthenticationMode) {
      const refreshToken = getCookie(event, refreshTokenCookieName)

      if (refreshToken) {
        await refresh({ refreshToken }).catch(_e => null)
      }
    }
    else {
      const cookie = getHeader(event, 'cookie')

      if (cookie) {
        const res = await $fetch.raw<{ data: AuthenticationData }>('/auth/refresh', {
          body: {
            mode: 'cookie',
          },
          baseURL,
          method: 'POST',
          headers: {
            cookie,
          },
        }).catch(_e => null)

        if (res && res._data && res.headers) {
          tokens.value = res._data.data

          const resCookies = res.headers.get('set-cookie') || ''

          appendResponseHeader(event, 'set-cookie', resCookies)

          await readMe()
        }
      }
    }
  }
  else if (import.meta.client && (!tokens.value?.access_token || !user.value)) {
    nuxtApp.hook('app:mounted', async () => {
      if (mode === 'json' as AuthenticationMode && !refreshTokenCookie().value) {
        return
      }
      await refresh().catch(_e => null)
    })
  }

  if (enableMiddleware) {
    addRouteMiddleware(middlewareName, (to, _from) => {
      const restricted = (!toArray.length || !!toArray.find((p: string) => p === to.path))

      if (!user.value && to.path !== redirectTo && restricted) {
        if (import.meta.client && !nuxtApp.isHydrating) {
          return abortNavigation()
        }
        else {
          return navigateTo(redirectTo)
        }
      }
    }, {
      global,
    })
  }
})
