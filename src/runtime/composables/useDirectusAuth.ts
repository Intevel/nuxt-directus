import type { DirectusUser } from '../types'
import { readMe } from '#imports'

export function useDirectusAuth () {
  const { accessToken, refreshToken } = useDirectusCookie()
  const user = useDirectusUser()
  const directus = useDirectus()
    .with(authentication('json', { credentials: 'include' }))
    .with(rest({ credentials: 'include' }))

  const setUser = <T extends object>(value: DirectusUser<T>) => {
    user.value = value
  }

  const fetchUser = async () => {
    if (accessToken().value) {
      try {
        const res = await useDirectusRest().request(readMe())
        setUser(res)
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error("Couldn't fetch user", error.errors)
        throw error.errors
      }
    }
    return user
  }

  const signIn = async (identifier: string, password: string) => {
    try {
      const authResponse = await directus.login(identifier, password)
      /* the following `if` is required to avoid a type error
       *  because the type of expires is number | null
       *  while maxAge for useCookie is number | undefined
       */
      if (authResponse.expires !== null) {
        refreshToken(authResponse.expires).value = authResponse.refresh_token
        accessToken(authResponse.expires).value = authResponse.access_token
      }
      const res = await directus.request(withToken(authResponse.access_token!, readMe()))
      setUser(res)

      return {
        accessToken: authResponse.access_token,
        refreshToken: authResponse.refresh_token,
        expiresAt: authResponse.expires_at,
        expires: authResponse.expires
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error("Couldn't login user", error.errors)
      throw error.errors
    }
  }

  const refreshTokens = async () => {
    try {
      const authResponse =
        await directus.refresh()
      // check previous note in `signIn` about type error
      if (authResponse.expires !== null) {
        refreshToken(authResponse.expires).value = authResponse.refresh_token
        accessToken(authResponse.expires).value = authResponse.access_token
      }
      const res = await directus.request(withToken(authResponse.access_token!, readMe()))
      setUser(res)

      return {
        accessToken: authResponse.access_token,
        refreshToken: authResponse.refresh_token,
        expiresAt: authResponse.expires_at,
        expires: authResponse.expires
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error("Couldn't refresh tokens", error.errors)
      throw error.errors
    }
  }
  const signOut = async () => {
    try {
      await directus.logout()
      accessToken().value = null
      refreshToken().value = null
      user.value = null
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error("Couldn't logut user", error.errors)
      throw error.errors
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
