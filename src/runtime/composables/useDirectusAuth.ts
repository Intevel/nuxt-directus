/* eslint-disable camelcase */
import { authentication, type loginOptions } from '@directus/sdk'
import { useDirectus } from './useDirectus'
import { useDirectusCookie } from './useDirectusCookie'

export function useDirectusAuth () {
  const directus = useDirectus().with(authentication())
  const { token, refreshToken } = useDirectusCookie()

  const signIn = async (identifier: string, password: string) => {
    try {
      const { access_token, expires, refresh_token, expires_at } = await directus.login(identifier, password, {})
      token().value = access_token
      refreshToken().value = refresh_token

      return {
        access_token,
        expires,
        refresh_token,
        expires_at
      }
    } catch (error) {
      console.error(error)
    }
  }

  const refreshTokens = async () => {
    try {
      const { access_token, expires, refresh_token, expires_at } = await directus.refresh()
      token().value = access_token
      refreshToken().value = refresh_token

      return {
        access_token,
        expires,
        refresh_token,
        expires_at
      }
    } catch (error) {
      console.error(error)
    }
  }

  const signOut = async () => {
    try {
      await directus.logout()
      token().value = null
      refreshToken().value = null
    } catch (error) {
      console.error(error)
    }
  }

  return {
    signIn,
    refreshTokens,
    signOut
  }
}
