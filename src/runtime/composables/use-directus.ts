import { defu } from 'defu'
import {
  authentication,
  createDirectus,
  realtime,
  graphql,
  rest
} from '@directus/sdk'
import WebSocket from 'ws'
import type {
  ClientOptions,
  DirectusRealtimeConfig,
  DirectusClientOptions,
  DirectusGraphqlConfig,
  DirectusRestConfig,
  GraphqlConfig,
  RestConfig
} from '../types'
import { useRuntimeConfig } from '#imports'

export const useDirectus = <T extends Object>(options?: DirectusClientOptions) => {
  const configUrl = useRuntimeConfig().public.directus.url

  const defaultOptions: ClientOptions = {
    globals: {
      fetch: $fetch.create(options?.fetchOptions ?? {})
    }
  }

  const clientOptions = defu(options, defaultOptions)

  return createDirectus<T>(options?.url ?? configUrl, clientOptions)
}

export const useDirectusRest = <T extends Object>(config?: DirectusRestConfig) => {
  const { moduleConfig, authConfig } = useRuntimeConfig().public.directus

  // TODO: add configs for oFetch once the following is fixed and released and check if `credentials: 'include'` works
  // https://github.com/directus/directus/issues/19747
  const defaultConfig: RestConfig = {
    credentials: 'include'
  }

  const options = defu(config, defaultConfig)

  const client = useDirectus<T>(config?.clientOptions).with(authentication(
    authConfig.useNuxtCookies ? 'json' : 'cookie', {
      autoRefresh: moduleConfig.autoRefresh,
      storage: useDirectusTokens(config?.useStaticToken)
    })).with(rest(options))

  return client
}

export const useDirectusGraphql = <T extends Object>(config?: DirectusGraphqlConfig) => {
  const { moduleConfig, authConfig } = useRuntimeConfig().public.directus

  const defaultConfig: GraphqlConfig = {
    credentials: 'include'
  }

  const options = defu(config, defaultConfig)

  const client = useDirectus<T>(config?.clientOptions).with(authentication(
    authConfig.useNuxtCookies ? 'json' : 'cookie', {
      autoRefresh: moduleConfig.autoRefresh,
      credentials: 'include',
      storage: useDirectusTokens(config?.useStaticToken)
    })).with(graphql(options))

  return client
}

export const useDirectusRealtime = <T extends Object>(config?: DirectusRealtimeConfig) => {
  const { moduleConfig, authConfig } = useRuntimeConfig().public.directus

  const defaultOptions: ClientOptions = {
    globals: {
      WebSocket
    }
  }

  const options = defu(config?.clientOptions, defaultOptions)

  const client = useDirectus<T>(options).with(authentication(
    authConfig.useNuxtCookies ? 'json' : 'cookie', {
      autoRefresh: moduleConfig.autoRefresh,
      credentials: 'include',
      storage: useDirectusTokens(config?.useStaticToken)
    })).with(realtime(config?.websocketConfig))

  return client
}
