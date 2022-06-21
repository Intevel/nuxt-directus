import type { FetchError, FetchOptions } from "ohmyfetch";
import { useNuxtApp } from "#app";
import { useDirectusUrl } from "./useDirectusUrl";
import { useDirectusToken } from "./useDirectusToken";

export const useDirectus = () => {
  const nuxt = useNuxtApp();
  const baseURL = useDirectusUrl();
  const token = useDirectusToken();

  return async <T>(
    url: string,
    fetchOptions: FetchOptions = {}
  ): Promise<T> => {
    const headers: HeadersInit = {};

    if (token && token.value) {
      headers.Authorization = `Bearer ${token.value}`;
    }

    try {
      return await $fetch<T>(url, {
        baseURL,
        ...fetchOptions,
        headers: {
          ...headers,
          ...fetchOptions.headers
        }
      });
    } catch (err: any) {
      if (!err.includes("401 Unauthorized")) {
        console.error("[Directus Error]: " + err);
      }
    }
  };
};
