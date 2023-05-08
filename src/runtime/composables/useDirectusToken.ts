import { useCookie, useNuxtApp, CookieRef, useRuntimeConfig } from '#app'
import { DirectusAuthResponse } from '../types'
import { useDirectusUrl } from './useDirectusUrl'

export const useDirectusToken = () => {
  const nuxtApp = useNuxtApp()
  const baseUrl = useDirectusUrl()
  const config = useRuntimeConfig().public

  const token = (): CookieRef<string | null> => {
    nuxtApp._cookies = nuxtApp._cookies || {}
    if (nuxtApp._cookies[config.directus.cookieNameToken]) {
      return nuxtApp._cookies[config.directus.cookieNameToken]
    }

    const cookie = useCookie<string | null>(config.directus.cookieNameToken)
    nuxtApp._cookies[config.directus.cookieNameToken] = cookie
    return cookie
  }

  const refreshToken = (): CookieRef<string | null> => {
    nuxtApp._cookies = nuxtApp._cookies || {}
    if (nuxtApp._cookies[config.directus.cookieNameRefreshToken]) {
      return nuxtApp._cookies[config.directus.cookieNameRefreshToken]
    }

    const cookie = useCookie<string | null>(config.directus.cookieNameRefreshToken, { maxAge: config.directus.maxAgeRefreshToken })
    nuxtApp._cookies[config.directus.cookieNameRefreshToken] = cookie
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

  
  const checkAutoRefresh = async () => {
    if (config.public.directus.autoRefresh) {
      if (token_expired.value) {
        try {
          await refreshTokens();
        } catch (e) {
          refreshToken().value = null;
          if (config.public.directus.onAutoRefreshError) {
            await config.public.directus.onAutoRefreshError();
          }
        }
      }
    }
  }

  const token_expires_in = computed(() => Math.max(0, (expires().value ?? 0) - new Date().getTime()));

  const token_expired = computed(() => !token().value || token_expires_in.value == 0);

  return {
    token: token(),
    refreshToken: refreshToken(),
    expires: expires(),
    token_expires_in,
    token_expired,
    refreshTokens,
    checkAutoRefresh
  }
}
