import type { FetchOptions } from 'ohmyfetch'
import { useRuntimeConfig, showError } from '#app'
import { useDirectusUrl } from './useDirectusUrl'
import { useDirectusToken } from './useDirectusToken'

export const useDirectus = () => {
  const baseURL = useDirectusUrl()
  const config = useRuntimeConfig()
  const token = useDirectusToken()

  return async <T>(
    url: string,
    fetchOptions: FetchOptions = {},
    useStaticToken = true
  ): Promise<T> => {
    const headers: HeadersInit = {}

    if (token && token.value) {
      headers.Authorization = `Bearer ${token.value}`
    } else if (config.directus.token && useStaticToken) {
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

        onResponseError({ response, request }) {
          let message = response.statusText;
          let httpCode = response.status;

          showError({
            statusCode: httpCode,
            statusMessage: message,
          });
        },
      });
    } catch (err: any) {
      if (process.dev) {
        console.error("[Directus Error]: " + err);
        throw err;
      }
    }
  }
}
