/* eslint-disable no-console */
import type { NitroFetchOptions } from 'nitropack'
import { useRuntimeConfig, createError } from 'nuxt/app'
import { joinURL } from 'ufo'
import { useDirectusUrl } from './useDirectusUrl'
import { useDirectusToken } from './useDirectusToken'

export const useDirectus = () => {
  const baseURL = useDirectusUrl()
  const config = useRuntimeConfig()
  const { token, token_expired, checkAutoRefresh } = useDirectusToken()

  return async <T>(
    url: string,
    fetchOptions: NitroFetchOptions<string> = {},
    useStaticToken = true
  ): Promise<T> => {
    const headers: HeadersInit = {}

    await checkAutoRefresh()

    if (token?.value && !token_expired.value) {
      headers.Authorization = `Bearer ${token.value}`
    } else if (config.public.directus.token && useStaticToken) {
      headers.Authorization = `Bearer ${config.public.directus.token}`
    }

    try {
      return await $fetch<T>(joinURL(baseURL, url), {
        ...fetchOptions,
        headers: {
          ...headers,
          ...fetchOptions.headers
        }
      })
    } catch (err: any) {
      if (process.dev) {
        console.error('[Directus Error]: ' + err)
        console.log(err.response._data)
      } else {
        console.error(
          '[Directus Error]: ' +
            err.response?.status +
            ', ' +
            err.response?.statusText
        )
      }
      throw createError({
        statusCode: err.response?.status,
        statusMessage: err.response?.statusText,
        data: err.response?._data
      })
    }
  }
}
