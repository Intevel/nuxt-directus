import { useDirectusAuth } from '../composables/use-directus-auth'
import {
  abortNavigation,
  addRouteMiddleware,
  defineNuxtPlugin,
  navigateTo,
  useRequestHeader,
  useRuntimeConfig
} from '#imports'

function cookieParser (cookie: string | undefined): Record<string, string> | undefined {
  if (!cookie) { return undefined }
  return cookie.split(';').reduce((acc: Record<string, string>, cookie) => {
    const [key, value] = cookie.split('=')
    acc[key.trim()] = value
    return acc
  }, {})
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const {
    url,
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
    refreshTokenCookie,
    refreshTokens,
    tokens,
    user
  } = useDirectusAuth({ useStaticToken: false })

  if (process.server && useNuxtCookies) {
    const cookies = cookieParser(useRequestHeader('cookie'))

    if (cookies && cookies[refreshTokenCookieName]) {
      tokens.value = await refreshTokens({
        refreshToken: cookies[refreshTokenCookieName],
        updateStates: false
      }).catch(e => console.error(e))

      refreshTokenCookie(tokens.value?.expires).value = tokens.value?.refresh_token
    }

    if (tokens.value && tokens.value.access_token) {
      user.value = await $fetch('users/me', {
        baseURL: url,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokens.value.access_token}`
        }
      })
    }
  } else if (process.client && !tokens.value?.access_token) {
    // Workaround for single routes that are `ssr: false` to prevent page flashing on client-side auth
    if (useNuxtCookies) {
      nuxtApp.hook('app:beforeMount', async () => {
        await refreshTokens()
      })
    } else {
      nuxtApp.hook('app:mounted', async () => {
        await refreshTokens()
      })
    }
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
