import { defu } from 'defu'
import type {
  DirectusClient,
  GraphqlClient,
  RestClient,
  RestConfig
} from '@directus/sdk'
import {
  useRuntimeConfig,
  createDirectus,
  graphql,
  rest
} from '#imports'

export const useDirectus = <T extends Object>() => {
  const url = useRuntimeConfig().public.directus.url

  return createDirectus(url) as DirectusClient<T>
}

export const useDirectusRest = <T extends Object>(config?: RestConfig) => {
  const publicStaticToken = useRuntimeConfig().public.directus.staticToken

  // TODO: add configs for oFetch once the following is fixed and released
  // https://github.com/directus/directus/issues/19747
  const defaultConfig: RestConfig = {
    credentials: 'include',
    onRequest: (request) => {
      const reqCookies = useRequestHeaders()['cookie']
      if (reqCookies) {
        request.headers = {
          ...request.headers,
          cookie: reqCookies
        }
      }

      return request
    }
  }

  const options = defu(config, defaultConfig)

  return useDirectus().with(rest(options)).with(staticToken(publicStaticToken)) as RestClient<T>
}

export const useDirectusGraphql = <T extends Object>() => {
  const publicStaticToken = useRuntimeConfig().public.directus.staticToken

  return useDirectus().with(graphql()).with(staticToken(publicStaticToken)) as GraphqlClient<T>
}
