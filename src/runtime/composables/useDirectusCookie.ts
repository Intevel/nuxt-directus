import type { CookieRef } from '#app'
import { useCookie, useNuxtApp } from '#imports'

export function useDirectusCookie () {
  const accessToken = (T?: number | undefined): CookieRef<string | null> => {
    // TODO make prefix editable
    const cookie = useCookie<string | null>('directus_access_token', { maxAge: T })
    return cookie
  }

  const refreshToken = (T?: number | undefined): CookieRef<string | null> => {
    // TODO make prefix editable
    const cookie = useCookie<string | null>('directus_refresh_token', { maxAge: T })
    return cookie
  }

  return {
    accessToken,
    refreshToken
  }
}
