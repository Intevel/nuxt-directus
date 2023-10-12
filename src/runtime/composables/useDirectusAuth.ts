import { useRoute, useRuntimeConfig, navigateTo, useRouter } from 'nuxt/app'

import type { Ref } from 'vue'
import type {
  DirectusAuthCredentials,
  DirectusAuthResponse,
  DirectusAcceptInvite,
  DirectusInviteCreation,
  DirectusPasswordForgotCredentials,
  DirectusPasswordResetCredentials,
  DirectusRegisterCredentials,
  DirectusUser
} from '../types'
import { useDirectus } from './useDirectus'
import { useDirectusToken } from './useDirectusToken'
import { useDirectusUrl } from './useDirectusUrl'
import { useDirectusUser } from './useDirectusUser'

export const useDirectusAuth = () => {
  const config = useRuntimeConfig()
  const directus = useDirectus()
  const baseUrl = useDirectusUrl()
  const user = useDirectusUser()
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

    // Calculate new expires date, bug fix https://github.com/Intevel/nuxt-directus/issues/157
    const newExpires = (response.data.expires ?? 0) + new Date().getTime()

    setAuthCookies(response.data.access_token, response.data.refresh_token, newExpires)

    const user = await fetchUser()

    return {
      user: user.value,
      access_token: response.data.access_token,
      expires: newExpires,
      refresh_token: response.data.refresh_token
    }
  }

  const loginWithProvider = async (
    provider: string,
    redirectOnLogin?: string
  ) => {
    removeTokens()
    const route = useRoute()
    const redirect = `${window.location.origin}${redirectOnLogin ?? route.fullPath}`
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

  const inviteUser = async (
    data: DirectusInviteCreation
  ): Promise<void> => {
    return await directus('/users/invite', {
      method: 'POST',
      body: data
    })
  }

  const acceptInvite = async (
    data: DirectusAcceptInvite
  ): Promise<void> => {
    return await directus('/users/invite/accept', {
      method: 'POST',
      body: data
    })
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
    try {
      console.log('Sending logout request...');  // Log before sending request
  
      const response = await fetch(`${baseUrl}/auth/logout`, {
        body: JSON.stringify({ refresh_token: refreshToken.value }),  // Ensure the body is stringified
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }  // Add Content-Type header
      });
  
      console.log('Logout response:', response);  // Log response object
  
      if (!response.ok) {  // Check for a successful response
        const responseData = await response.json();  // Parse and log response data on error
        console.error('Logout error:', responseData);
        throw new Error(`Logout failed with status: ${response.status}`);
      }
  
      removeTokens();
      setUser(null);
      await fetchUser();
  
      // Redirect to index page
      const router = useRouter();  // Get the router instance from 'nuxt/app'
      router.push('/');  // Navigate to the index page
  
    } catch (error) {
      console.error('Logout exception:', error);  // Log any exceptions
    }
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
    inviteUser,
    acceptInvite,
    loginWithProvider,
    setAuthCookies
  }
}
