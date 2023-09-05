import type { CookieRef } from '#app'
import { useCookie } from '#imports'

export function useDirectusCookie () {
  const config = useRuntimeConfig()

  const accessToken = (maxAge?: number | undefined): CookieRef<string | null> => {
    const cookie = useCookie<string | null>(config.public.directus.tokenCookieName, { maxAge })
    return cookie
  }

  const refreshToken = (maxAge?: number | undefined): CookieRef<string | null> => {
    const cookie = useCookie<string | null>(config.public.directus.refreshTokenCookieName, { maxAge })
    return cookie
  }

  return {
    accessToken,
    refreshToken
  }
}
