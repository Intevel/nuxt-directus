import type {
  DirectusClient,
  GraphqlClient,
  RestClient,
  RestConfig
} from '@directus/sdk'
import {
  useRuntimeConfig,
  useNuxtApp,
  graphql,
  rest
} from '#imports'
import defu from 'defu'

export const useDirectus = <T extends Object>() => {
  return useNuxtApp().$directus as DirectusClient<T>
}

export const useDirectusRest = <T extends Object>(config?: RestConfig) => {
  const { accessToken } = useDirectusCookie()
  const staticToken = useRuntimeConfig().public.directus.staticToken

  // TODO: add configs for oFetch once the following it's implemented
  // https://github.com/directus/directus/issues/19592
  const defaultConfig: RestConfig = {
    onRequest: (request) => {
      if (accessToken() && accessToken().value) {
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

  return useDirectus().with(rest(options)) as RestClient<T>
}

export const useDirectusGraphql = <T extends Object>() => {
  return useDirectus().with(graphql()) as GraphqlClient<T>
}
