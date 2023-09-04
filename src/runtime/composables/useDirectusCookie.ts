import type { CookieRef } from '#app'
import { useCookie } from '#imports'

export function useDirectusCookie () {
  const config = useRuntimeConfig()

  const accessToken = (T?: number | undefined): CookieRef<string | null> => {
    const cookie = useCookie<string | null>(config.public.directus.tokenCookieName, { maxAge: T })
    return cookie
  }

  const refreshToken = (T?: number | undefined): CookieRef<string | null> => {
    const cookie = useCookie<string | null>(config.public.directus.refreshTokenCookieName, { maxAge: T })
    return cookie
  }

  return {
    accessToken,
    refreshToken
  }
}
