import type { NitroFetchOptions } from 'nitropack';
import { useRuntimeConfig, createError } from "#app";
import { useDirectusUrl } from "./useDirectusUrl";
import { useDirectusToken } from "./useDirectusToken";

export const useDirectus = () => {
  const baseURL = useDirectusUrl();
  const config = useRuntimeConfig();
  const { token } = useDirectusToken();

  return async <T>(
    url: string,
    fetchOptions: NitroFetchOptions<string> = {},
    useStaticToken = true
  ): Promise<T> => {
    const headers: HeadersInit = {};

    if (token && token.value) {
      headers.Authorization = `Bearer ${token.value}`;
    } else if (config.public.directus.token && useStaticToken) {
      headers.Authorization = `Bearer ${config.public.directus.token}`;
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
      if (process.dev) {
        console.error("[Directus Error]: " + err);
      } else {
        console.error(
          "[Directus Error]: " +
            err.response?.status +
            ", " +
            err.response?.statusText
        );
      }
      throw createError({
        statusCode: err.response?.status,
        statusMessage: err.response?.statusText,
      });
    }
  };
};
