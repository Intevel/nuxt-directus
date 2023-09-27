import type { 
  AuthenticationData,
  DirectusTokens,
  ModuleOptions
} from '../types'
import type {
  CookieRef
} from '#app'
import {
  type Ref,
  useCookie,
  useState
} from '#imports'

/**
 * This expands the default Directus storage implementation for authenticated data. It adds a `store` named export for direct access within the Nuxt app using `useState` under the hood.
 *
 * @returns Directus SDK native AuthenticationStorage functions
 * @returns `store` for direct access to the stored data
 */
export const useDirectusTokens = ():DirectusTokens => {

  const {
    authStateName,
    useNuxtCookies,
    refreshTokenCookieName,
    cookieHttpOnly: httpOnly,
    cookieSameSite: sameSite,
    cookieSecure: secure
  } = useRuntimeConfig().public.directus.authConfig as ModuleOptions['authConfig']

  const tokens: Ref<AuthenticationData | null> = useState(authStateName)
  function refreshToken (maxAge?: number | undefined): CookieRef<string | null | undefined> {
    const cookie = useCookie<string | null>(refreshTokenCookieName!, { maxAge, httpOnly, sameSite, secure })
    return cookie
  }

  return {
    get: () => {
      return {
        access_token: tokens.value?.access_token ?? null,
        refresh_token: useNuxtCookies ? refreshToken().value : tokens.value?.refresh_token,
        expires_at: tokens.value?.expires_at ?? null,
        expires: tokens.value?.expires ?? null
      } as AuthenticationData
    },
    set: (value: AuthenticationData | null) => {
      tokens.value = value
      if (useNuxtCookies) {
        refreshToken(value?.expires || undefined).value = value?.refresh_token
      }
    },
    tokens,
    refreshToken
  }
}