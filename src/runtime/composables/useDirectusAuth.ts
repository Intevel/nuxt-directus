import type { Ref } from "vue";
import type {
  DirectusAuthResponse,
  DirectusAuthCredentials,
  DirectusUser,
  DirectusPasswordForgotCredentials,
  DirectusPasswordResetCredentials,
} from "../types";
import { useDirectus } from "./useDirectus";
import { useDirectusUser } from "./useDirectusUser";
import { useDirectusUrl } from "./useDirectusUrl";
import { useDirectusToken } from "./useDirectusToken";

export const useDirectusAuth = () => {
  const url = useDirectusUrl();
  const directus = useDirectus();
  const user = useDirectusUser();
  const { accessToken, refreshToken, expiredAt, token } = useDirectusToken();

  const setTokens = (
    accessToken: string | null,
    refreshToken: string | null,
    expiredAt: number | null
  ) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setTokenExpireDate(expiredAt);
  };

  const setAccessToken = (value: string | null) => {
     accessToken.value = value;
  };

  const setRefreshToken = (value: string | null) => {
    refreshToken.value = value;
  };

  const setTokenExpireDate = (offset: number | null) => {
    offset === null ?  expiredAt.value = null : (expiredAt.value = new Date().getTime() + offset);
  };

  const setUser = (value: DirectusUser) => {
    user.value = value;
  };

  const fetchUser = async (): Promise<Ref<DirectusUser>> => {
    const bearerToken = await token();
    if (bearerToken && !user.value) {
      try {
        var res = await directus<{ data: DirectusUser }>("/users/me");
        setUser(res.data);
      } catch (e) {
        setTokens(null, null, null);
      }
    }
    return user;
  };

  const login = async (
    data: DirectusAuthCredentials
  ): Promise<DirectusAuthResponse> => {
    setTokens(null, null, null);

    const response: { data: DirectusAuthResponse } = await directus(
      "/auth/login",
      {
        method: "POST",
        body: data,
      }
    );

    const res = response.data;   
    setTokens(res.access_token, res.refresh_token, res.expires);
    const user = await fetchUser();
    return {
      user,
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      expires: response.data.expires,
    };
  };

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

  const logout = async (): Promise<void> => {
    const body = {
      refresh_token: refreshToken.value,
    };
    try {
      await directus<void>("/auth/logout", {
        body,
        method: "POST",
      });
    } catch (error) {
      setTokens(null, null, null);
    }
    setTokens(null, null, null);
  };

  return {
    setAccessToken,
    setUser,
    fetchUser,
    login,
    requestPasswordReset,
    resetPassword,
    logout,
  };
};
