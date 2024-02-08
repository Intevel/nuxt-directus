import { defu } from 'defu'
import {
  authentication,
  createDirectus,
  realtime,
  graphql,
  rest
} from '@directus/sdk'
import type {
  DirectusRealtimeConfig,
  DirectusClientOptions,
  DirectusGraphqlConfig,
  DirectusRestConfig
} from '../types'
import { useDirectusTokens } from './use-directus-tokens'
import { useRuntimeConfig } from '#imports'

/**
 * Provides the core functionalities to create a custom Directus client.
 *
 * @returns createDirectus.
 */
export const useDirectus = <T extends Object>(options?: DirectusClientOptions) => {
  const { url } = useRuntimeConfig().public.directus

  const config = defu(options, {
    baseURL: url,
    clientOptions: {
      globals: {
        fetch: $fetch.create(options?.fetchOptions ?? {})
      }
    }
  })

  if (!config.baseURL) {
    throw new Error('Please provide a Directus URL either via Nuxt runtimeConfig or via the options parameter.')
  }

  return createDirectus<T>(config.baseURL, config.clientOptions)
}

/**
 * Creates a client to communicate with the Directus REST API.
 *
 * @returns A Directus REST client.
 */
export const useDirectusRest = <T extends Object>(options?: DirectusRestConfig) => {
  const { authConfig: { useNuxtCookies } } = useRuntimeConfig().public.directus

  const config = defu<
    DirectusRestConfig,
    DirectusRestConfig[]
  >(options, {
    authConfig: {
      autoRefresh: true,
      msRefreshBeforeExpires: 1000 * 60 * 5,
      credentials: 'include',
      storage: useDirectusTokens(options?.staticToken)
    },
    restConfig: {
      credentials: 'include'
    }
  })

  const client = useDirectus<T>(config?.options)
    .with(authentication(useNuxtCookies ? 'json' : 'cookie', config.authConfig))
    .with(rest(config?.restConfig))

  return client
}

/**
 * Creates a client to communicate with the Directus GraphQL API.
 *
 * @returns A Directus GraphQL client.
 */
export const useDirectusGraphql = <T extends Object>(options?: DirectusGraphqlConfig) => {
  const { authConfig: { useNuxtCookies } } = useRuntimeConfig().public.directus

  const config = defu<
    DirectusGraphqlConfig,
    DirectusGraphqlConfig[]
  >(options, {
    authConfig: {
      autoRefresh: true,
      msRefreshBeforeExpires: 1000 * 60 * 5,
      credentials: 'include',
      storage: useDirectusTokens(options?.staticToken)
    },
    graphqlConfig: {
      credentials: 'include'
    }
  })

  const client = useDirectus<T>(config?.options)
    .with(authentication(useNuxtCookies ? 'json' : 'cookie', config.authConfig))
    .with(graphql(config.graphqlConfig))

  return client
}

/**
 * Creates a client to communicate with the Directus Realtime API.
 *
 * @returns A Directus Realtime client.
 */
export const useDirectusRealtime = <T extends Object>(options?: DirectusRealtimeConfig) => {
  const { authConfig: { useNuxtCookies } } = useRuntimeConfig().public.directus

  const config = defu<
    DirectusRealtimeConfig,
    DirectusRealtimeConfig[]
  >(options, {
    authConfig: {
      autoRefresh: true,
      msRefreshBeforeExpires: 1000 * 60 * 5,
      credentials: 'include',
      storage: useDirectusTokens(options?.staticToken)
    }
  })

  const client = useDirectus<T>(config?.options)
    .with(authentication(useNuxtCookies ? 'json' : 'cookie', config.authConfig))
    .with(realtime(config?.websocketConfig))

  return client
}
