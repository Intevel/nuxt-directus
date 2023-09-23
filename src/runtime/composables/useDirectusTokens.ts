import type { 
  AuthenticationData,
  AuthenticationStorage,
  ModuleOptions
} from '../types'
import {
  type CookieRef,
} from '#app'
import {
  type Ref,
  useRuntimeConfig,
  useState
} from '#imports'

/**
 * This expands the default Directus storage implementation for authenticated data. It adds a `store` named export for direct access within the Nuxt app using `useState` under the hood.
 *
 * @returns Directus SDK native AuthenticationStorage functions
 * @returns `store` for direct access to the stored data
 */
export const useDirectusTokens = ():AuthenticationStorage & { tokens: Ref<AuthenticationData | null> } & { refreshToken: (maxAge?: number | undefined) => CookieRef<string | null | undefined> } => {

  const {
    refreshTokenCookieName,
    cookieHttpOnly: httpOnly,
    cookieSameSite: sameSite,
    cookieSecure: secure
  } = useRuntimeConfig().public.directus as ModuleOptions

  const tokens: Ref<AuthenticationData | null> = useState('directus.auth')
  const refreshToken = (maxAge?: number | undefined): CookieRef<string | null | undefined> => {
    const cookie = useCookie<string | null>(refreshTokenCookieName, { maxAge, httpOnly, sameSite, secure })
    return cookie
  }

  return {
    get: () => {
      return {
        access_token: tokens.value?.access_token ?? null,
        refresh_token: tokens.value?.refresh_token ? tokens.value.refresh_token : refreshToken().value || null,
        expires_at: tokens.value?.expires_at ?? null,
        expires: tokens.value?.expires ?? null
      }
    },
    set: (value: AuthenticationData | null) => {
      tokens.value = {
        access_token: value?.access_token ?? null,
        refresh_token: value?.refresh_token ?? null,
        expires_at: value?.expires_at ?? null,
        expires: value?.expires ?? null
      }
      refreshToken(value?.expires || undefined).value = value?.refresh_token
    },
    tokens,
    refreshToken
  }
}