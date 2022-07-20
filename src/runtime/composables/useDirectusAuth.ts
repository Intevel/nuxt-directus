import type { Ref } from 'vue'
import type {
  DirectusAuthResponse,
  DirectusAuthCredentials,
  DirectusUser,
  DirectusPasswordForgotCredentials,
  DirectusPasswordResetCredentials,
  DirectusRegisterCredentials,
} from "../types";
import { useDirectus } from "./useDirectus";
import { useDirectusUser } from "./useDirectusUser";
import { useDirectusUrl } from "./useDirectusUrl";
import { useDirectusToken } from "./useDirectusToken";
import { useDirectusRefresh } from "./useDirectusRefresh";

export const useDirectusAuth = () => {
  const url = useDirectusUrl()
  const directus = useDirectus()
  const user = useDirectusUser()
  const token = useDirectusToken()
  const { refreshToken, expiredAt, refreshTokens } = useDirectusRefresh()

  const setTokens = (
    accessToken: string | null,
    refreshToken: string | null,
    expiredAt: number | null
  ) => {
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    setTokenExpireDate(expiredAt)
  }

  const setAccessToken = (value: string | null) => {
    token.value = value
  }

  const setRefreshToken = (value: string | null) => {
    refreshToken.value = value
  }

  const setTokenExpireDate = (offset: number | null) => {
    offset === null
      ? (expiredAt.value = null)
      : (expiredAt.value = new Date().getTime() + offset)
  }

  const setUser = (value: DirectusUser) => {
    user.value = value
  }

  const fetchUser = async (): Promise<Ref<DirectusUser>> => {
    if (token.value && !user.value) {
      try {
        const res = await directus<{ data: DirectusUser }>('/users/me')
        setUser(res.data)
      } catch (e) {
        try {
          // refresh token if expired
          // eslint-disable-next-line camelcase
          const { access_token, expires, refresh_token, user } = await refreshTokens()
          setTokens(access_token, refresh_token, expires)
          setUser(user)
        } catch (e) {
          // remove refresh token after expired refresh token
          setTokens(null, null, null)
        }
      }
    }
    return user
  }

  const login = async (
    data: DirectusAuthCredentials
  ): Promise<DirectusAuthResponse> => {
    setTokens(null, null, null)

    const response: { data: DirectusAuthResponse } = await directus(
      '/auth/login',
      {
        method: "POST",
        body: data,
      }
    )

    setTokens(
      response.data.access_token,
      response.data.refresh_token,
      response.data.expires
    )

    const user = await fetchUser()

    return {
      user,
      access_token: response.data.access_token,
      expires: response.data.expires,
    };
  };

  const createUser = async (
    data: DirectusRegisterCredentials
  ): Promise<DirectusUser> => {
    return await directus("/users", {
      method: "POST",
      body: data,
    });
  };

  // Alias for createUser
  const register = async (
    data: DirectusRegisterCredentials
  ): Promise<DirectusUser> => {
    return createUser(data)
  }

  const requestPasswordReset = async (
    data: DirectusPasswordForgotCredentials
  ): Promise<void> => {
    await directus("/auth/password/request", {
      method: "POST",
      body: data,
    });
  };

  const resetPassword = async (
    data: DirectusPasswordResetCredentials
  ): Promise<void> => {
    await directus("/auth/password/reset", {
      method: "POST",
      body: data,
    });
  };

  const logout = (): void => {
    // https://docs.directus.io/reference/authentication/#logout todo: implement this
    setTokens(null, null, null)
    setUser(null)
  }

  return {
    setTokens,
    setUser,
    fetchUser,
    login,
    requestPasswordReset,
    resetPassword,
    logout,
    createUser,
    register,
  };
};
