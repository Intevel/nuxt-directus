/* eslint-disable camelcase */
import { rest, login, refresh, logout } from '@directus/sdk'
import { useDirectus } from './useDirectus'
import { useDirectusCookie } from './useDirectusCookie'

export function useDirectusAuth () {
  const directus = useDirectus().with(rest())
  const { accessToken, refreshToken } = useDirectusCookie()

  const signIn = async (identifier: string, password: string) => {
    try {
      const { access_token, expires, refresh_token, expires_at } = await directus.request(login(identifier, password, {}))
      /* the following `if` is required to avoid a type error
      *  because the type of expires is number | null
      *  while maxAge for useCookie is number | undefined
      */
      if (expires !== null) {
        accessToken(expires).value = access_token
        refreshToken(expires).value = refresh_token
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  const refreshTokens = async () => {
    try {
      const { access_token, expires, refresh_token, expires_at } = await directus.request(refresh(refreshToken().value!))
      // check previous note about type error
      if (expires !== null) {
        accessToken(expires).value = access_token
        refreshToken(expires).value = refresh_token
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
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return {
    signIn,
    refreshTokens,
    signOut
  }
}
