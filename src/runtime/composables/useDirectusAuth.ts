import { defu } from 'defu'
import type {
  DirectusUser,
  LoginOptions
} from '../types'
import {
  readMe
} from '@directus/sdk'

export function useDirectusAuth<TSchema extends Object> () {
  const client = useDirectusRest<TSchema>({ useStaticToken: false, credentials: 'include' })

  const { user } = useDirectusUser()
  const { tokens } = useDirectusTokens()

  function setUser (value: DirectusUser<TSchema>) {
    user.value = value
  }

  async function fetchUser () {
    if (tokens.value?.access_token) {
      try {
        const res = await client.request(readMe())
        // TODO: fix types for custom fields in `directus_users`
        setUser(res as DirectusUser<TSchema>)
      } catch (error: any) {
        if (error && error.message) {
          // eslint-disable-next-line no-console
          console.error("Couldn't fetch user", error.errors)
          throw error.errors
        } else {
          // eslint-disable-next-line no-console
          console.error(error)
          throw error
        }
      }
    }
    return user
  }

  async function login (identifier: string, password: string, options?: LoginOptions) {
    const { useNuxtCookies } = useRuntimeConfig().public.directus.cookieConfigs
    try {
      const defaultOptions = {
        mode: useNuxtCookies ? 'json' : 'cookie'
      }
      const params = defu(options, defaultOptions) as LoginOptions

      const authResponse = await client.login(identifier, password, params)
      fetchUser()

      return {
        access_token: authResponse.access_token,
        refresh_token: authResponse.refresh_token,
        expires_at: authResponse.expires_at,
        expires: authResponse.expires
      }
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't login user", error.errors)
        throw error.errors
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
        throw error
      }
    }
  }

  async function refreshTokens () {
    try {
      const authResponse = await client.refresh()
      fetchUser()

      return {
        access_token: authResponse.access_token,
        refresh_token: authResponse.refresh_token,
        expires_at: authResponse.expires_at,
        expires: authResponse.expires
      }
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't refresh tokens", error.errors)
        throw error.errors
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
        throw error
      }
    }
  }

  async function logout () {
    try {
      await client.logout()
      user.value = null
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't logut user", error.errors)
        throw error.errors
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
        throw error
      }
    }
  }

  return {
    user,
    tokens,
    setUser,
    fetchUser,
    login,
    refreshTokens,
    logout
  }
}
