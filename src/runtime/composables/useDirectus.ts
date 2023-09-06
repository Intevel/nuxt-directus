import type {
  DirectusClient,
  GraphqlClient,
  RestClient,
  RestConfig
} from '@directus/sdk'
import {
  useNuxtApp,
  graphql,
  rest
} from '#imports'
import defu from 'defu'

export const useDirectus = <T extends Object>() => {
  return useNuxtApp().$directus as DirectusClient<T>
}

export const useDirectusRest = <T extends Object>(config?: RestConfig) => {
  const { accessToken, refreshToken } = useDirectusCookie()
  const staticToken = useRuntimeConfig().public.directus.staticToken

  // TODO: add configs for oFetch once the following it's implemented
  // https://github.com/directus/directus/issues/19592
  const defaultConfig: RestConfig = {
    // TODO: fix request for public content when accessToken is invalid.
    // Current workaround check for refreshToken too to fallback to auto/manual refresh.
    // @ts-ignore
    onRequest: (request) => {
      if (accessToken() && accessToken().value && refreshToken() && refreshToken().value) {
        request.headers = {
          ...request.headers,
          authorization: `Bearer ${accessToken().value}`
        }
      } else if (staticToken) {
        request.headers = {
          ...request.headers,
          authorization: `Bearer ${staticToken}`
        }
      }

      return request
    }
  }

  const options = defu(config, defaultConfig)

  return useNuxtApp().$directus.with(rest(options)) as RestClient<T>
}

export const useDirectusGraphql = <T extends Object>() => {
  return useNuxtApp().$directus.with(graphql()) as GraphqlClient<T>
}
