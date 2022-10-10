import { useRuntimeConfig } from '#app'

import type { Ref } from 'vue'
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

export const useDirectusAuth = <User = DirectusUser>() => {
  const url = useDirectusUrl()
  const config = useRuntimeConfig()
  const directus = useDirectus()
  const user = useDirectusUser<User>()
  const token = useDirectusToken()

  const setToken = (value: string | null): void => {
    token.value = value
  }

  const setUser = (value: User): void => {
    user.value = value
  }

  const fetchUser = async (): Promise<Ref<User>> => {
    if (token.value && !user.value) {
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
          const res = await directus<{ data: User }>('/users/me', {
            params: config.directus.fetchUserParams
          })
          setUser(res.data)
        } else {
          const res = await directus<{ data: User }>('/users/me')
          setUser(res.data)
        }
      } catch (e) {
        setToken(null)
      }
    }
    return user
  }

  const login = async (
    data: DirectusAuthCredentials
  ): Promise<DirectusAuthResponse<User>> => {
    setToken(null)

    const response: {
      data: DirectusAuthResponse<User>;
    } = await directus('/auth/login', {
      method: 'POST',
      body: data
    })

    if (!response.data.access_token) { throw new Error('Login failed, please check your credentials.') }
    setToken(response.data.access_token)

    const user = await fetchUser()

    return {
      user: user.value,
      access_token: response.data.access_token,
      expires: response.data.expires
    }
  }

  const createUser = async (
    data: DirectusRegisterCredentials
  ): Promise<User> => {
    return await directus<User>('/users', {
      method: 'POST',
      body: data
    })
  }

  const requestPasswordReset = async (
    data: DirectusPasswordForgotCredentials
  ): Promise<void> => {
    await directus('/auth/password/request', {
      method: 'POST',
      body: data
    })
  }

  const resetPassword = async (
    data: DirectusPasswordResetCredentials
  ): Promise<void> => {
    await directus('/auth/password/reset', {
      method: 'POST',
      body: data
    })
  }

  const logout = (): void => {
    // https://docs.directus.io/reference/authentication/#logout todo: implement this
    setToken(null)
    setUser(null)
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
    // Alias for createUser
    register: createUser
  }
}
