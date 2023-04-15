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
import { useDirectusUrl } from './useDirectusUrl'
import { useDirectusToken } from './useDirectusToken'

export const useDirectusAuth = () => {
  const url = useDirectusUrl()
  const config = useRuntimeConfig()
  const directus = useDirectus()
  const user = useDirectusUser()
  const { token, refreshToken, expires } = useDirectusToken()

  const setToken = (value: string | null, _refreshToken?: string | null, _expires?: number | null) => {
    token.value = value

    if (_refreshToken) {
      refreshToken.value = _refreshToken
      if (_expires) {
        expires.value = _expires
      }
    }
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
          const res = await directus<{ data: DirectusUser }>('/users/me', useStaticToken)
          setUser(res.data)
        }
      } catch (e) {
        setToken(null)
      }
    }
    return user
  }

  const login = async (
    data: DirectusAuthCredentials,
    useStaticToken?: boolean
  ): Promise<DirectusAuthResponse> => {
    setToken(null)

    const response: { data: DirectusAuthResponse } = await directus(
      '/auth/login',
      {
        method: 'POST',
        body: data
      },
      useStaticToken
    )

    if (!response.data.access_token) { throw new Error('Login failed, please check your credentials.') }
    setToken(response.data.access_token, response.data.refresh_token, response.data.expires)

    const user = await fetchUser()

    return {
      user,
      access_token: response.data.access_token,
      expires: response.data.expires
    }
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
    await directus('/auth/logout', {
      method: 'POST',
      body: { refresh_token: refreshToken.value }
    })
    setToken(null, null, null)
    setUser(null)
    await fetchUser()
  }

  return {
    setToken,
    setUser,
    fetchUser,
    login,
    requestPasswordReset,
    resetPassword,
    logout,
    createUser,
    register
  }
}
