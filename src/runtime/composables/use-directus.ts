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
import { useRuntimeConfig, useDirectusTokens } from '#imports'

/**
 * Provides the core functionalities to create a custom Directus client.
 *
 * @returns createDirectus.
 */
export const useDirectus = <T extends Object>(options?: Partial<DirectusClientOptions>) => {
  const { url } = useRuntimeConfig().public.directus

  const defaultOptions: DirectusClientOptions = {
    baseURL: url,
    clientOptions: {
      globals: {
        fetch: $fetch.create(options?.fetchOptions ?? {})
      }
    }
  }

  const config = defu(options, defaultOptions)

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
export const useDirectusRest = <T extends Object>(options?: Partial<DirectusRestConfig>) => {
  const { moduleConfig: { autoRefresh }, authConfig: { useNuxtCookies } } = useRuntimeConfig().public.directus

  const defaultOptions: Partial<DirectusRestConfig> = {
    authConfig: {
      autoRefresh,
      storage: useDirectusTokens(options?.useStaticToken)
    },
    restConfig: {
      credentials: 'include'
    }
  }

  const config = defu(options, defaultOptions)

  const client = useDirectus<T>(config?.options)
    .with(authentication(useNuxtCookies ? 'json' : 'cookie', config.authConfig))
    .with(rest(config.restConfig))

  return client
}

/**
 * Creates a client to communicate with the Directus GraphQL API.
 *
 * @returns A Directus GraphQL client.
 */
export const useDirectusGraphql = <T extends Object>(options?: Partial<DirectusGraphqlConfig>) => {
  const { moduleConfig: { autoRefresh }, authConfig: { useNuxtCookies } } = useRuntimeConfig().public.directus

  const defaultOptions: Partial<DirectusGraphqlConfig> = {
    authConfig: {
      autoRefresh,
      storage: useDirectusTokens(options?.useStaticToken)
    },
    graphqlConfig: {
      credentials: 'include'
    }
  }

  const config = defu(options, defaultOptions)

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
export const useDirectusRealtime = <T extends Object>(options?: Partial<DirectusRealtimeConfig>) => {
  const { moduleConfig: { autoRefresh }, authConfig: { useNuxtCookies } } = useRuntimeConfig().public.directus

  const defaultOptions: Partial<DirectusRealtimeConfig> = {
    authConfig: {
      autoRefresh,
      storage: useDirectusTokens(options?.useStaticToken)
    }
  }

  const config = defu(options, defaultOptions)

  const client = useDirectus<T>(config?.options)
    .with(authentication(useNuxtCookies ? 'json' : 'cookie', config.authConfig))
    .with(realtime(config?.websocketConfig))

  return client
}
