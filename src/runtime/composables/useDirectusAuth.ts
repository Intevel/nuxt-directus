import type { DirectusUser } from '../types'
import { login, refresh, logout, readMe } from '#imports'

export function useDirectusAuth () {
  const { accessToken, refreshToken } = useDirectusCookie()
  const user = useDirectusUser()
  const directus = useDirectusRest()

  const setUser = <T extends object>(value: DirectusUser<T>) => {
    user.value = value
  }

  const fetchUser = async () => {
    if (accessToken().value) {
      try {
        const res = await directus.request(readMe())
        setUser(res)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
    return user
  }

  const signIn = async (identifier: string, password: string) => {
    try {
      const authResponse = await directus.request(
        login(identifier, password, {})
      )
      /* the following `if` is required to avoid a type error
       *  because the type of expires is number | null
       *  while maxAge for useCookie is number | undefined
       */
      if (authResponse.expires !== null) {
        refreshToken(authResponse.expires).value = authResponse.refresh_token
      }
      accessToken().value = authResponse.access_token

      return {
        accessToken: authResponse.access_token,
        refreshToken: authResponse.refresh_token,
        expiresAt: authResponse.expires_at,
        expires: authResponse.expires
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  const refreshTokens = async () => {
    try {
      const authResponse =
        await directus.request(refresh(refreshToken().value!))
      // check previous note about type error
      if (authResponse.expires !== null) {
        refreshToken(authResponse.expires).value = authResponse.refresh_token
      }
      accessToken().value = authResponse.access_token

      return {
        accessToken: authResponse.access_token,
        refreshToken: authResponse.refresh_token,
        expiresAt: authResponse.expires_at,
        expires: authResponse.expires
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }
  const signOut = async () => {
    try {
      await directus.request(logout(refreshToken().value!))
      accessToken().value = null
      refreshToken().value = null
      user.value = null
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return {
    setUser,
    fetchUser,
    signIn,
    refreshTokens,
    signOut
  }
}
