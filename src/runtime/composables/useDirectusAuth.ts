import type { Ref } from 'vue'
import { useRuntimeConfig } from '#app'
import type {
  DirectusAuthResponse,
  DirectusAuthCredentials,
  DirectusUser,
  DirectusPasswordForgotCredentials,
  DirectusPasswordResetCredentials,
  DirectusRegisterCredentials
} from '../types'
import { useDirectus } from './useDirectus'
import { useDirectusUser } from './useDirectusUser'
import { useDirectusToken } from './useDirectusToken'

export const useDirectusAuth = () => {
  const config = useRuntimeConfig()
  const directus = useDirectus()
  const baseUrl = useDirectusUrl()
  const user = useDirectusUser()
  const route = useRoute();
  const { token, refreshToken, expires } = useDirectusToken()

  const setAuthCookies = (_token: string, _refreshToken: string, _expires: number) => {
    token.value = _token
    refreshToken.value = _refreshToken
    expires.value = _expires
  }

  const removeTokens = () => {
    token.value = null
    expires.value = null
    refreshToken.value = null
  }

  const setUser = (value: DirectusUser) => {
    user.value = value
  }

  const fetchUser = async (useStaticToken?: boolean): Promise<Ref<DirectusUser>> => {
    if (token.value) {
      try {
        if (config.public.directus.fetchUserParams?.filter) {
          (config.public.directus.fetchUserParams.filter as unknown) = JSON.stringify(
            config.public.directus.fetchUserParams.filter
          )
        }
        if (config.public.directus.fetchUserParams?.deep) {
          (config.public.directus.fetchUserParams.deep as unknown) = JSON.stringify(
            config.public.directus.fetchUserParams.deep
          )
        }
        if (config.public.directus.fetchUserParams) {
          const res = await directus<{ data: DirectusUser }>('/users/me', {
            params: config.public.directus.fetchUserParams
          }, useStaticToken)
          setUser(res.data)
        } else {
          const res = await directus<{ data: DirectusUser }>('/users/me', {}, useStaticToken)
          setUser(res.data)
        }
      } catch (e) {
        console.error("Couldn't fetch user", e)
      }
    }
    return user
  }

  const login = async (
    data: DirectusAuthCredentials,
    useStaticToken?: boolean
  ): Promise<DirectusAuthResponse> => {
    removeTokens()

    const response = await $fetch<{data: DirectusAuthResponse}>('/auth/login', {
      baseURL: baseUrl,
      body: data,
      method: 'POST'
    })

    if (!response.data.access_token) { throw new Error('Login failed, please check your credentials.') }
    setAuthCookies(response.data.access_token, response.data.refresh_token, response.data.expires)

    const user = await fetchUser()

    return {
      user: user.value,
      access_token: response.data.access_token,
      expires: response.data.expires,
      refresh_token: response.data.refresh_token
    }
  }

  const loginWithProvider = async (
    provider: string,
  ) => {
    removeTokens()
    const redirect = `${window.location.origin}${config.public.directus.redirectOnLogin ?? route.fullPath}`;
    await navigateTo(`${baseUrl}/auth/login/${provider}?redirect=${encodeURIComponent(redirect)}`, { external: true })
  }

  const createUser = async (
    data: DirectusRegisterCredentials,
    useStaticToken?: boolean
  ): Promise<DirectusUser> => {
    return await directus('/users', {
      method: 'POST',
      body: data
    }, useStaticToken)
  }

  // Alias for createUser
  const register = async (
    data: DirectusRegisterCredentials
  // eslint-disable-next-line require-await
  ): Promise<DirectusUser> => {
    return createUser(data)
  }

  const requestPasswordReset = async (
    data: DirectusPasswordForgotCredentials,
    useStaticToken?: boolean
  ): Promise<void> => {
    await directus('/auth/password/request', {
      method: 'POST',
      body: data
    }, useStaticToken)
  }

  const resetPassword = async (
    data: DirectusPasswordResetCredentials,
    useStaticToken?: boolean
  ): Promise<void> => {
    await directus('/auth/password/reset', {
      method: 'POST',
      body: data
    }, useStaticToken)
  }

  const logout = async (): Promise<void> => {

    await $fetch('/auth/logout', {
      baseURL: baseUrl,
      body: { refresh_token: refreshToken.value },
      method: 'POST'
    })

    removeTokens()
    setUser(null)
    await fetchUser()
  }

  return {
    setUser,
    fetchUser,
    login,
    requestPasswordReset,
    resetPassword,
    logout,
    createUser,
    register,
    loginWithProvider
  }
}
