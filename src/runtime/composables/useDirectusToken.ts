import { useCookie, useNuxtApp, CookieRef } from '#app'
import { DirectusAuthResponse } from '../types'

export const useDirectusToken = () => {
  const nuxtApp = useNuxtApp()
  const baseUrl = useDirectusUrl()

  const token = (): CookieRef<string | null> => {
    nuxtApp._cookies = nuxtApp._cookies || {}
    if (nuxtApp._cookies.directus_token) {
      return nuxtApp._cookies.directus_token
    }

    const cookie = useCookie<string | null>('directus_token')
    nuxtApp._cookies.directus_token = cookie
    return cookie
  }

  const refreshToken = (): CookieRef<string | null> => {
    nuxtApp._cookies = nuxtApp._cookies || {}
    if (nuxtApp._cookies.directus_refresh_token) {
      return nuxtApp._cookies.directus_refresh_token
    }

    const cookie = useCookie<string | null>('directus_refresh_token')
    nuxtApp._cookies.directus_refresh_token = cookie
    return cookie
  }

  const expires = (): CookieRef<number | null> => {
    nuxtApp._cookies = nuxtApp._cookies || {}
    if (nuxtApp._cookies.directus_token_expired_at) {
      return nuxtApp._cookies.directus_token_expired_at
    }

    const cookie = useCookie<number | null>('directus_token_expired_at')
    nuxtApp._cookies.directus_token_expired_at = cookie
    return cookie
  }

  const refreshTokens = async (): Promise<DirectusAuthResponse | null> => {
    if (refreshToken() && refreshToken().value) {
      const body = {
        refresh_token: refreshToken().value
      }
      const data = await $fetch<{data: DirectusAuthResponse}>('/auth/refresh', {
        baseURL: baseUrl,
        body,
        method: 'POST'
      })
      expires().value = new Date().getTime() + data.data.expires
      token().value = data.data.access_token
      refreshToken().value = data.data.refresh_token
      return data.data
    } else {
      return null
    }
  }

  return { token: token(), refreshToken: refreshToken(), refreshTokens, expires: expires() }
}
