import type {
  DirectusClient,
  DirectusGrafqlConfig,
  DirectusRestConfig,
  GraphqlClient,
  RestClient,
  RestConfig
} from '../types'
import { defu } from 'defu'
import {
  useRuntimeConfig,
  createDirectus,
  graphql,
  rest,
  ref
} from '#imports'

export const useDirectus = <T extends Object>() => {
  const url = useRuntimeConfig().public.directus.url

  return createDirectus(url) as DirectusClient<T>
}

export const useDirectusRest = <T extends Object>(config?: DirectusRestConfig) => {
  const publicStaticToken = ref('')
  if (typeof config?.staticToken === 'string') {
    publicStaticToken.value = config?.staticToken
  } else if (config?.staticToken !== false) {
    publicStaticToken.value = useRuntimeConfig().public.directus.staticToken
  }

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

  const options = defu(config?.restConfig, defaultConfig)

  return useDirectus().with(rest(options)).with(staticToken(publicStaticToken.value)) as RestClient<T>
}

export const useDirectusGraphql = <T extends Object>(config?: DirectusGrafqlConfig) => {
  const publicStaticToken = ref('')
  if (typeof config?.staticToken === 'string') {
    publicStaticToken.value = config?.staticToken
  } else if (config?.staticToken !== false) {
    publicStaticToken.value = useRuntimeConfig().public.directus.staticToken
  }

  return useDirectus().with(graphql()).with(staticToken(publicStaticToken.value)) as GraphqlClient<T>
}
