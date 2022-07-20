import { useCookie, useNuxtApp } from "#app";
import { useDirectusToken } from "./useDirectusToken";
import { useDirectusUrl } from "./useDirectusUrl";
import { DirectusAuthResponse } from "../types";

export const useDirectusRefresh = () => {
  const nuxtApp = useNuxtApp();
  const token = useDirectusToken();
  const baseURL = useDirectusUrl();

  const refreshToken = () => {
    nuxtApp._cookies = nuxtApp._cookies || {};
    if (nuxtApp._cookies.directus_refresh_token) {
      return nuxtApp._cookies.directus_refresh_token;
    }

    const cookie = useCookie<string | null>("directus_refresh_token");
    nuxtApp._cookies.directus_refresh_token = cookie;
    return cookie;
  };

  const expiredAt = () => {
    nuxtApp._cookies = nuxtApp._cookies || {};
    if (nuxtApp._cookies.directus_token_expired_at) {
      return nuxtApp._cookies.directus_token_expired_at;
    }

    const cookie = useCookie<number | null>("directus_token_expired_at");
    nuxtApp._cookies.directus_token_expired_at = cookie;
    return cookie;
  };

  const refreshTokens = async (): Promise<DirectusAuthResponse | null> => {
    if (refreshToken() && refreshToken().value) {
      const body = {
        refresh_token: refreshToken().value,
      };
      const data = await $fetch<{ data: DirectusAuthResponse }>(
        "/auth/refresh",
        {
          baseURL,
          body,
          method: "POST",
        }
      );
      expiredAt().value = new Date().getTime() + data.data.expires;
      token.value = data.data.access_token;
      refreshToken().value = data.data.refresh_token;
      return data.data;
    } else {
      return null;
    }
  };

  return {
    refreshToken: refreshToken(),
    expiredAt: expiredAt(),
    refreshTokens,
  };
};
