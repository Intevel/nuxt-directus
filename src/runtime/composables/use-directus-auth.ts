import { defu } from 'defu'
import {
  acceptUserInvite as sdkAcceptUserInvite,
  inviteUser as sdkInviteUser,
  passwordRequest as sdkPasswordRequest,
  passwordReset as sdkPasswordReset
} from '@directus/sdk'
import type {
  DirectusRestConfig,
  DirectusInviteUser,
  LoginOptions
} from '../types'

export function useDirectusAuth<TSchema extends Object> (config?: Partial<DirectusRestConfig>) {
  const { useNuxtCookies } = useRuntimeConfig().public.directus.authConfig

  const defaultConfig: Partial<DirectusRestConfig> = {
    useStaticToken: false
  }
  const client = useDirectusRest<TSchema>(defu(config, defaultConfig))

  const { readMe, user } = useDirectusUsers(defu(config, defaultConfig))
  const { tokens } = useDirectusTokens(config?.useStaticToken ?? defaultConfig.useStaticToken)

  async function login (
    identifier: string, password: string, options?: LoginOptions
  ) {
    try {
      const defaultOptions = {
        mode: useNuxtCookies ? 'json' : 'cookie'
      }
      const params = defu(options, defaultOptions) as LoginOptions

      const authResponse = await client.login(identifier, password, params)
      if (authResponse.access_token) {
        await readMe()
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

  async function refreshTokens () {
    try {
      const authResponse = await client.refresh()
      if (authResponse.access_token) {
        await readMe()
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

  async function logout () {
    try {
      await client.logout()
      user.value = undefined
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
    acceptUserInvite,
    inviteUser,
    login,
    logout,
    passwordRequest,
    passwordReset,
    refreshTokens,
    tokens,
    user
  }
}
