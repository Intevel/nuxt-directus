import { useCookie, useNuxtApp, useRuntimeConfig } from "#app";
import { CookieRef } from "~~/node_modules/nuxt3/dist/app/composables/cookie";
import { DirectusAuthResponse } from "../types";


export const useDirectusToken = () => {
  const nuxtApp = useNuxtApp();
  const baseURL = useDirectusUrl();
  const config = useRuntimeConfig()

  const accessToken = (): CookieRef<string> => {
    nuxtApp._cookies = nuxtApp._cookies || {};
    if (nuxtApp._cookies.directus_token) {
      return nuxtApp._cookies.directus_token;
    }

    const cookie = useCookie<string | null>("directus_token", config.directus.cookie);
    nuxtApp._cookies.directus_token = cookie;
    return cookie;
  };

  const refreshToken = (): CookieRef<string> => {
    nuxtApp._cookies = nuxtApp._cookies || {};
    if (nuxtApp._cookies.directus_refresh_token) {
      return nuxtApp._cookies.directus_refresh_token;
    }

    const cookie = useCookie<string | null>("directus_refresh_token", config.directus.cookie);
    nuxtApp._cookies.directus_refresh_token = cookie;
    return cookie;
  };

  const expiredAt = (): CookieRef<number> => {
    nuxtApp._cookies = nuxtApp._cookies || {};
    if (nuxtApp._cookies.directus_token_expired_at) {
      return nuxtApp._cookies.directus_token_expired_at;
    }

    const cookie = useCookie<number | null>("directus_token_expired_at", config.directus.cookie);
    nuxtApp._cookies.directus_token_expired_at = cookie;
    return cookie;
  };

  const refreshTokens = async (): Promise<DirectusAuthResponse | null> => {
    if (refreshToken() && refreshToken().value) {
      const body = {
        refresh_token: refreshToken().value,
      };
      const data = await $fetch<{data: DirectusAuthResponse}>("/auth/refresh", {
        baseURL,
        body,
        method: "POST"
      });
      expiredAt().value = new Date().getTime() + data.data.expires;
      accessToken().value = data.data.access_token;
      refreshToken().value = data.data.refresh_token;
      return data.data;
    } else {
      return null;
    }
  };

  const token = async (): Promise<string | null> => {
    if (expiredAt() && expiredAt().value) {
      const isExpired = new Date().getTime() > expiredAt().value;
      if (isExpired && refreshToken() && refreshToken().value) {
        const data = await refreshTokens();
        console.log('ata.access_token', data.access_token);
        return data.access_token;
      } else {
        console.log('accessToken().value', accessToken().value);
        
        return accessToken().value;
      }
    }
    return null;
  };

  return {
    accessToken: accessToken(),
    refreshToken: refreshToken(),
    expiredAt: expiredAt(),
    token,
    refreshTokens,
  };
};
