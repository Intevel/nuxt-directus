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
  const token = useDirectusToken()

  const setToken = (value: string | null) => {
    token.value = value
  }

  const setUser = (value: DirectusUser) => {
    user.value = value
  }

  const fetchUser = async (useStaticToken?: boolean): Promise<Ref<DirectusUser>> => {
    if (token.value) {
      try {
        if (config.directus.fetchUserParams?.filter) {
          (config.directus.fetchUserParams.filter as unknown) = JSON.stringify(
            config.directus.fetchUserParams.filter
          )
        }
        if (config.directus.fetchUserParams?.deep) {
          (config.directus.fetchUserParams.deep as unknown) = JSON.stringify(
            config.directus.fetchUserParams.deep
          )
        }
        if (config.directus.fetchUserParams) {
          const res = await directus<{ data: DirectusUser }>('/users/me', {
            params: config.directus.fetchUserParams
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
    setToken(response.data.access_token)

    const user = await fetchUser()

    return {
      user,
      access_token: response.data.access_token,
      expires: response.data.expires
    }
  }

  const refresh = async (
  ): Promise<DirectusAuthResponse> => {
    setToken(null)

    const response: { data: DirectusAuthResponse } = await directus(
      '/auth/refresh',
      {
        method: 'POST',
        body: {
          mode: 'json'
        }
      }
    )

    if (!response.data.access_token) { throw new Error('Login failed, you need to be connected.') }
    setToken(response.data.access_token)

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
    // https://docs.directus.io/reference/authentication/#logout todo: implement this
    setToken(null)
    setUser(null)
    await fetchUser()
  }

  return {
    setToken,
    setUser,
    fetchUser,
    login,
    refresh,
    requestPasswordReset,
    resetPassword,
    logout,
    createUser,
    register
  }
}
