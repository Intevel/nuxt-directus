import type { ModuleOptions } from '../types'
import type { CookieRef } from '#app'
import { useCookie } from '#imports'

export function useDirectusCookie () {
  const {
    tokenCookieName,
    refreshTokenCookieName,
    cookieHttpOnly: httpOnly,
    cookieSameSite: sameSite,
    cookieSecure: secure
  } = useRuntimeConfig().public.directus as ModuleOptions

  const accessToken = (maxAge?: number | undefined): CookieRef<string | null> => {
    const cookie = useCookie<string | null>(tokenCookieName, { maxAge, httpOnly, sameSite, secure })
    return cookie
  }

  const refreshToken = (maxAge?: number | undefined): CookieRef<string | null> => {
    const cookie = useCookie<string | null>(refreshTokenCookieName, { maxAge, httpOnly, sameSite, secure })
    return cookie
  }

  return {
    accessToken,
    refreshToken
  }
}
