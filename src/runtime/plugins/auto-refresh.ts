import { useDirectusAuth } from '../composables/use-directus-auth'
import {
  abortNavigation,
  addRouteMiddleware,
  defineNuxtPlugin,
  navigateTo,
  useRequestHeaders,
  useRuntimeConfig
} from '#imports'

function cookieParser (cookie: string): Record<string, string> {
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

  const headers = useRequestHeaders(['cookie'])

  if (process.server && headers.cookie) {
    if (useNuxtCookies) {
      const cookies = cookieParser(headers.cookie)

      if (cookies[refreshTokenCookieName]) {
        tokens.value = await refreshTokens({
          refreshToken: cookies[refreshTokenCookieName],
          updateStates: false
        }).catch(e => console.error(e))

        refreshTokenCookie().value = tokens.value?.refresh_token
      }
    } // else {
    //   console.log('headers.cookie', headers.cookie)
    //   const resp = await $fetch.raw('auth/refresh', {
    //     baseURL: url,
    //     method: 'POST',
    //     headers,
    //     body: {
    //       mode: 'cookie'
    //     }
    //   }).catch(e => console.error(e))
    //   tokens.value = resp?._data
    //   const resHeaders = resp?.headers
    //   console.log('tokens.value', resp?.headers)
    // }

    if (tokens.value && tokens.value.access_token) {
      user.value = await $fetch('users/me', {
        baseURL: url,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokens.value.access_token}`
        }
      })
    }
  }

  if (process.client && !tokens.value?.access_token && (!!refreshTokenCookie().value || !useNuxtCookies)) {
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
