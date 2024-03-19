import type { Ref } from 'vue'
import type { CookieRef } from '#app'
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
  AuthenticationData,
  AuthenticationMode,
  DirectusUser,
  LoginOptions,
  Query,
  ReadUserOutput
} from '@directus/sdk'
import type {
  DirectusRestConfig,
  DirectusClients,
  SDKReturn
} from '../types'
import { useDirectusUsers } from './use-directus-users'
import { useDirectusRest, useDirectusTokens, useRuntimeConfig } from '#imports'

export function useDirectusAuth<TSchema extends object = any> (config?: Partial<DirectusRestConfig>) {
  const { useNuxtCookies } = useRuntimeConfig().public.directus.authConfig

  const defaultConfig: Partial<DirectusRestConfig> = {
    staticToken: false
  }
  const client: DirectusClients.Rest<TSchema> = useDirectusRest<TSchema>(defu(config, defaultConfig))

  const {
    readMe: readMyself,
    setUser,
    user
  } = useDirectusUsers<TSchema>(defu(config, defaultConfig)) as {
    readMe: <TQuery extends Query<TSchema, DirectusUser<TSchema>>>
      (_query?: TQuery & { updateState?: boolean }) => SDKReturn<ReadUserOutput<TSchema, TQuery>>,
    setUser: (value: Partial<DirectusUser<TSchema>> | undefined) => Promise<void>,
    user: Ref<Partial<DirectusUser<TSchema>> | undefined>
  }
  const {
    refreshToken: refreshTokenCookie,
    set: setTokens,
    tokens
  } = useDirectusTokens(config?.staticToken ?? defaultConfig.staticToken) as {
    refreshToken: () => CookieRef<string | null | undefined>,
    set: (tokens: AuthenticationData | null) => void,
    tokens: Ref<AuthenticationData | null>
  }
  const defaultMode: AuthenticationMode = useNuxtCookies ? 'json' : 'cookie'

  /**
   * Retrieve a temporary access token and refresh token.
   *
   * @param identifier Email address of the user you're retrieving the access token for.
   * @param password Password of the user.
   * @param options Optional login settings
   *
   * @returns The access and refresh tokens for the session
   */
  async function login <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    identifier: string,
    password: string,
    {
      options,
      updateStates,
      updateTokens,
      readMe
    }: {
      options?: LoginOptions,
      updateStates?: boolean,
      updateTokens?: boolean,
      readMe?: {
        query?: TQuery,
        updateState?: boolean
      } | false
    } = {}
  ): Promise<AuthenticationData> {
    return await client.request(sdkLogin(identifier, password, defu(options, { mode: defaultMode }))).then(async (authResponse) => {
      if (authResponse && updateStates !== false) {
        if (updateTokens !== false) {
          await setTokens(authResponse)
        }
        if (readMe !== false) {
          await readMyself(readMe)
        }
      }
      return authResponse
    })
  }

  /**
   * Retrieve a new access token using a refresh token.
   *
   * @param mode Whether to retrieve the refresh token in the JSON response, or in a httpOnly secure cookie. One of json, cookie.
   * @param refreshToken The refresh token to use. If you have the refresh token in a cookie through /auth/login, you don't have to submit it here.
   * @param updateStates Whether to update the user and tokens states. Defaults to true.
   * @param updateTokens Whether to update the tokens state. Defaults to true.
   * @param readMe Whether to update the user state. Defaults to true.
   *
   * @returns The new access and refresh tokens for the session.
   */
  async function refresh <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > ({
    mode,
    refreshToken,
    updateStates,
    updateTokens,
    readMe
  }: {
    mode?: AuthenticationMode,
    refreshToken?: string
    updateStates?: boolean,
    updateTokens?: boolean,
    readMe?: { query?: TQuery, updateState?: boolean } | false
  } = {}): Promise<AuthenticationData> {
    const token = refreshToken ?? tokens.value?.refresh_token ?? refreshTokenCookie().value ?? undefined
    if (!token && useNuxtCookies) {
      throw new Error('No refresh token found.')
    }

    const authResponse = await client.request(sdkRefresh(mode ?? defaultMode, token ?? undefined))

    if (updateStates !== false) {
      if (updateTokens !== false) {
        await setTokens(authResponse ?? null)
      }
      if (readMe !== false) {
        await readMyself(readMe)
      }
    }

    return authResponse
  }

  /**
   * Invalidate the refresh token thus destroying the user's session.
   *
   * @param refreshToken The refresh token to invalidate. If you have the refresh token in a cookie through /auth/login, you don't have to submit it here.
   *
   * @returns Empty body.
   */
  async function logout (
    refreshToken?: string
  ): Promise<void> {
    return await client.request(sdkLogout(refreshToken ?? tokens.value?.refresh_token ?? undefined)).then(() => {
      user.value = undefined
      setTokens(null)
    })
  }

  /**
   * Request a password reset email to be sent to the given user.
   *
   * @param email Email address of the user you're requesting a password reset for.
   * @param resetUrl Provide a custom reset url which the link in the email will lead to. The reset token will be passed as a parameter.
   *
   * @returns Empty body.
   */
  async function passwordRequest (
    email: string,
    resetUrl?: string
  ): Promise<void> {
    return await client.request(sdkPasswordRequest(email, resetUrl))
  }

  /**
   * The request a password reset endpoint sends an email with a link to the admin app (or a custom route) which in turn uses this endpoint to allow the user to reset their password.
   *
   * @param token Password reset token, as provided in the email sent by the request endpoint.
   * @param password New password for the user.
   *
   * @returns Empty body.
   */
  async function passwordReset (
    token: string,
    password: string
  ): Promise<void> {
    return await client.request(sdkPasswordReset(token, password))
  }

  /**
   * Invite a new user by email.
   *
   * @param email User email to invite.
   * @param role Role of the new user.
   * @param inviteUrl Provide a custom invite url which the link in the email will lead to. The invite token will be passed as a parameter.
   *
   * @returns Nothing.
   */
  async function inviteUser (
    email: string,
    role: string,
    inviteUrl?: string
  ): Promise<void> {
    return await client.request(sdkInviteUser(email, role, inviteUrl))
  }

  /**
   * Accept your invite. The invite user endpoint sends the email a link to the Admin App.
   *
   * @param token Accept invite token.
   * @param password Password for the user.
   *
   * @returns Nothing.
   */
  async function acceptUserInvite (
    token: string,
    password: string
  ): Promise<void> {
    return await client.request(sdkAcceptUserInvite(token, password))
  }

  return {
    client,
    acceptUserInvite,
    inviteUser,
    login,
    logout,
    passwordRequest,
    passwordReset,
    refresh,
    refreshTokenCookie,
    readMe: readMyself,
    setUser,
    setTokens,
    tokens,
    user
  }
}
