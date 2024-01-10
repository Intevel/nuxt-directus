import { defu } from 'defu'
import {
  login as sdkLogin,
  refresh as sdkRefresh,
  logout as sdkLogout,
  acceptUserInvite as sdkAcceptUserInvite,
  inviteUser as sdkInviteUser,
  passwordRequest as sdkPasswordRequest,
  passwordReset as sdkPasswordReset
} from '@directus/sdk'
import type {
  AuthenticationMode,
  DirectusRestConfig,
  DirectusInviteUser,
  LoginOptions
} from '../types'

export function useDirectusAuth<TSchema extends Object> (config?: Partial<DirectusRestConfig>) {
  const { useNuxtCookies } = useRuntimeConfig().public.directus.authConfig
  const nuxtApp = useNuxtApp()

  const defaultConfig: Partial<DirectusRestConfig> = {
    useStaticToken: false
  }
  const client = useDirectusRest<TSchema>(defu(config, defaultConfig))

  const {
    readMe,
    setUser,
    user
  } = useDirectusUsers(defu(config, defaultConfig))
  const {
    refreshToken: refreshTokenCookie,
    set: setTokens,
    tokens
  } = useDirectusTokens(config?.useStaticToken ?? defaultConfig.useStaticToken)
  const defaultMode: AuthenticationMode = useNuxtCookies ? 'json' : 'cookie'

  async function login (
    identifier: string, password: string, options?: LoginOptions
  ) {
    try {
      const params = defu(options, { defaultMode })

      const authResponse = await client.request(sdkLogin(identifier, password, params))
      if (authResponse.access_token) {
        nuxtApp.runWithContext(() => {
          setTokens(authResponse)
          readMe()
        })
      }

      return {
        access_token: authResponse.access_token,
        refresh_token: authResponse.refresh_token,
        expires_at: authResponse.expires_at,
        expires: authResponse.expires
      }
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't login user.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  async function refreshTokens ({
    refreshToken,
    mode
  }: {
    refreshToken?: string
    mode?: AuthenticationMode
  } = {}) {
    try {
      const token = refreshToken ?? tokens.value?.refresh_token ?? refreshTokenCookie().value ?? undefined
      if (!refreshToken && useNuxtCookies) {
        throw new Error('No refresh token found.')
      }

      const authResponse = await client.request(sdkRefresh(mode ?? defaultMode, token ?? undefined))
      if (authResponse.access_token) {
        nuxtApp.runWithContext(() => {
          setTokens(authResponse)
          readMe()
        })
      }

      return {
        access_token: authResponse.access_token,
        refresh_token: authResponse.refresh_token,
        expires_at: authResponse.expires_at,
        expires: authResponse.expires
      }
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't refresh tokens.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  async function logout (
    refreshToken?: string
  ) {
    try {
      await client.request(sdkLogout(refreshToken ?? tokens.value?.refresh_token ?? undefined))
      user.value = undefined
      setTokens(null)
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't logut user.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  async function passwordRequest (
    email: string,
    resetUrl?: string
  ) {
    try {
      await client.request(sdkPasswordRequest(email, resetUrl))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't request password reset.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  async function passwordReset (
    token: string,
    password: string
  ) {
    try {
      await client.request(sdkPasswordReset(token, password))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't reset password.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  async function inviteUser (
    email: string,
    role: string,
    params?: DirectusInviteUser
  ) {
    try {
      await client.request(sdkInviteUser(email, role, params?.invite_url))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't invite user.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  async function acceptUserInvite (
    token: string,
    password: string
  ) {
    try {
      await client.request(sdkAcceptUserInvite(token, password))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't accept user invite.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  return {
    client,
    acceptUserInvite,
    inviteUser,
    login,
    logout,
    passwordRequest,
    passwordReset,
    refreshTokens,
    refreshTokenCookie,
    readMe,
    setUser,
    setTokens,
    tokens,
    user
  }
}
