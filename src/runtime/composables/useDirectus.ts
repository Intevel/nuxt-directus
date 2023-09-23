import type {
  ClientOptions,
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

export const useDirectus = <T extends Object>(url?: string, options?: ClientOptions) => {
  const configUrl = useRuntimeConfig().public.directus.url

  return createDirectus<T>(url ?? configUrl, options)
}

export const useDirectusRest = <T extends Object>(config?: DirectusRestConfig) => {
  const { client } = useDirectusAuth<T>()
  const publicStaticToken = ref('')

  if (typeof config?.staticToken === 'string') {
    publicStaticToken.value = config?.staticToken
  } else if (config?.staticToken !== false) {
    publicStaticToken.value = useRuntimeConfig().public.directus.staticToken
  }

  // TODO: add configs for oFetch once the following is fixed and released and check if `credentials: 'include'` works
  // https://github.com/directus/directus/issues/19747
  const defaultConfig: RestConfig = {
    credentials: 'include',
  }

  const options = defu(config, defaultConfig)

  return client.with(rest(options)).with(staticToken(publicStaticToken.value))
}

export const useDirectusGraphql = <T extends Object>(config?: DirectusGrafqlConfig) => {
  const { client } = useDirectusAuth<T>()
  const publicStaticToken = ref('')

  if (typeof config?.staticToken === 'string') {
    publicStaticToken.value = config?.staticToken
  } else if (config?.staticToken !== false) {
    publicStaticToken.value = useRuntimeConfig().public.directus.staticToken
  }

  return client.with(graphql()).with(staticToken(publicStaticToken.value)) as GraphqlClient<T>
}
