import { useCookie, useNuxtApp, type CookieRef } from '#imports'

export function useDirectusCookie () {
  const nuxtApp = useNuxtApp()

  const token = (): CookieRef<string | null> => {
    nuxtApp._cookies = nuxtApp._cookies || {}
    if (nuxtApp._cookies.access_token) {
      return nuxtApp._cookies.access_token
    }

    const cookie = useCookie<string | null>('access_token')
    nuxtApp._cookies.access_token = cookie
    return cookie
  }

  const refreshToken = (): CookieRef<string | null> => {
    nuxtApp._cookies = nuxtApp._cookies || {}
    if (nuxtApp._cookies.refresh_token) {
      return nuxtApp._cookies.refresh_token
    }

    const cookie = useCookie<string | null>('refresh_token')
    nuxtApp._cookies.refresh_token = cookie
    return cookie
  }

  return {
    token,
    refreshToken
  }
}
