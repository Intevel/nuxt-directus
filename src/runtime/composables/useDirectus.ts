import type { FetchError, FetchOptions } from "ohmyfetch";
import { useNuxtApp, useRuntimeConfig } from "#app";
import { useDirectusUrl } from "./useDirectusUrl";
import { useDirectusToken } from "./useDirectusToken";

export const useDirectus = () => {
  const nuxt = useNuxtApp();
  const baseURL = useDirectusUrl();
  const config = useRuntimeConfig()
  var token = useDirectusToken();
  
  return async <T>(
    url: string,
    fetchOptions: FetchOptions = {}
  ): Promise<T> => {
    const headers: HeadersInit = {};

    if (token && token.value) {
      headers.Authorization = `Bearer ${token.value}`;
    } else if (config.directus.token) {
      headers.Authorization = `Bearer ${config.directus.token}`
    }

    try {
      return await $fetch<T>(url, {
        baseURL,
        ...fetchOptions,
        headers: {
          ...headers,
          ...fetchOptions.headers,
        },
      });
    } catch (err: any) {
      console.error("[Directus Error]: " + err);
    }
  };
};
