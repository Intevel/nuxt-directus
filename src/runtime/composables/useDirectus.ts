import { defu } from 'defu'
import {
  authentication,
  createDirectus,
  graphql,
  rest,
  staticToken as sdkStaticToken
} from '@directus/sdk'
import type {
  ClientOptions,
  DirectusGraphqlConfig,
  DirectusRestConfig,
  GraphqlConfig,
  RestConfig
} from '../types'
import { useRuntimeConfig } from '#imports'

export const useDirectus = <T extends Object>(url?: string, options?: ClientOptions) => {
  const configUrl = useRuntimeConfig().public.directus.url

  const defaultOptions: ClientOptions = {
    // Commented out untill is fixed https://github.com/directus/directus/issues/19747
    // globals: {
    //   fetch: $fetch
    // }
  }

  const clientOptions = defu(options, defaultOptions)

  return createDirectus<T>(url ?? configUrl, clientOptions)
}

export const useDirectusRest = <T extends Object>(config?: DirectusRestConfig) => {
  const { moduleConfig, authConfig, staticToken } = useRuntimeConfig().public.directus
  const { tokens } = useDirectusTokens()

  // TODO: add configs for oFetch once the following is fixed and released and check if `credentials: 'include'` works
  // https://github.com/directus/directus/issues/19747
  const defaultConfig: RestConfig = {
    credentials: 'include'
  }

  const options = defu(config, defaultConfig)

  const client = useDirectus<T>().with(authentication(
    authConfig.useNuxtCookies ? 'json' : 'cookie', {
      autoRefresh: moduleConfig.autoRefresh,
      storage: useDirectusTokens()
    })).with(rest(options))

  if (config?.useStaticToken === undefined && !tokens.value?.access_token) {
    return client.with(sdkStaticToken(staticToken))
  } else if (typeof config?.useStaticToken === 'string') {
    return client.with(sdkStaticToken(config?.useStaticToken))
  } else if (config?.useStaticToken === true) {
    return client.with(sdkStaticToken(staticToken))
  }

  return client
}

export const useDirectusGraphql = <T extends Object>(config?: DirectusGraphqlConfig) => {
  const { moduleConfig, authConfig, staticToken } = useRuntimeConfig().public.directus
  const { tokens } = useDirectusTokens()

  const defaultConfig: GraphqlConfig = {
    credentials: 'include'
  }

  const options = defu(config, defaultConfig)

  const client = useDirectus<T>().with(authentication(
    authConfig.useNuxtCookies ? 'json' : 'cookie', {
      autoRefresh: moduleConfig.autoRefresh,
      credentials: 'include',
      storage: useDirectusTokens()
    })).with(graphql(options))

  if (config?.useStaticToken === undefined && !tokens.value?.access_token) {
    return client.with(sdkStaticToken(staticToken))
  } else if (typeof config?.useStaticToken === 'string') {
    return client.with(sdkStaticToken(config?.useStaticToken))
  } else if (config?.useStaticToken === true) {
    return client.with(sdkStaticToken(staticToken))
  }

  return client
}
