import type { CookieRef } from '#app'
import type {
  AuthenticationData
} from '@directus/sdk'
import type {
  DirectusTokens,
  ModuleOptions
} from '../types'
import {
  useCookie,
  useState,
  useNuxtApp,
  useRuntimeConfig
} from '#app'

/**
 * This expands the default Directus storage implementation for authenticated data. It adds a `store` named export for direct access within the Nuxt app using `useState` under the hood.
 *
 * @param useStaticToken - If `true` or `undefined` it will use the static token from the module config. If `false` it will not use any token. If a string is provided it will use that as the token.
 * @returns Directus SDK native AuthenticationStorage functions
 * @returns `store` for direct access to the stored data
 */
export const useDirectusTokens = (useStaticToken?: boolean | string): DirectusTokens => {
  const directusConfig = useRuntimeConfig().public.directus
  const {
    authStateName,
    mode,
    refreshTokenCookieName,
    authTokenCookieName,
    cookieHttpOnly: httpOnly,
    cookieSameSite: sameSite,
    cookieSecure: secure
  } = directusConfig.authConfig as ModuleOptions['authConfig']

  const { runWithContext } = useNuxtApp()

  const tokens = useState<AuthenticationData | null>(authStateName, () => null)

  function refreshToken (maxAge?: number | undefined): CookieRef<string | null | undefined> {
    const cookie = useCookie<string | null>(refreshTokenCookieName!, { maxAge, httpOnly, sameSite, secure })
    return cookie
  }

  function accessToken (maxAge?: number | undefined): CookieRef<string | null | undefined> {
    const cookie = useCookie<string | null>(authTokenCookieName!, { maxAge, httpOnly, sameSite, secure })
    return cookie
  }

  function get () {
    return runWithContext(() => {
      if ((useStaticToken === true || typeof useStaticToken === 'string') || (!tokens.value?.access_token && useStaticToken !== false)) {
        return {
          access_token: typeof useStaticToken === 'string' ? useStaticToken : directusConfig.staticToken,
          refresh_token: null,
          expires_at: null,
          expires: null
        }
      } else if (tokens.value) {
        return {
          access_token: tokens.value.access_token,
          refresh_token: mode === 'json' ? refreshToken().value! : tokens.value!.refresh_token,
          expires_at: tokens.value.expires_at,
          expires: tokens.value.expires
        }
      } else { return null }
    })
  }

  function set (value: AuthenticationData | null) {
    runWithContext(() => {
      tokens.value = value
      if (mode === 'json') {
        refreshToken(value?.expires || undefined).value = value?.refresh_token
        accessToken(value?.expires || undefined).value = value?.access_token
      }
    })
  }

  return {
    get,
    set,
    tokens,
    refreshToken
  }
}
