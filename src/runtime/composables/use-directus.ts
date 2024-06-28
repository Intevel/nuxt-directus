import { defu } from 'defu'
import {
  type AuthenticationMode,
  type DirectusClient,
  authentication,
  createDirectus,
  realtime,
  graphql,
  rest,
} from '@directus/sdk'
import type {
  DirectusRealtimeConfig,
  DirectusClientOptions,
  DirectusGraphqlConfig,
  DirectusRestConfig,
  DirectusClients,
} from '../types'
import { useDirectusTokens } from './use-directus-tokens'
import { useRuntimeConfig } from '#imports'

/**
 * Provides the core functionalities to create a custom Directus client.
 *
 * @returns createDirectus.
 */
export const useDirectus = <T extends object = any>(options?: DirectusClientOptions): DirectusClient<T> => {
  const { url } = useRuntimeConfig().public.directus

  const config = defu(options, {
    baseURL: url,
    clientOptions: {
      globals: {
        fetch: $fetch.create({
          onRequestError: ({ request, options, error }) => {
            if (import.meta.dev) {
              console.error('Request error:', request, options, error)
            }
          },
          onResponseError: ({ request, options, response, error }) => {
            if (import.meta.dev) {
              console.error('Response error:', request, options, response, error)
            }
          },
        }),
      },
    },
  })

  if (!config.baseURL) {
    // TODO: better error handling
    throw new Error('Please provide a Directus URL either via Nuxt runtimeConfig or via the options parameter.')
  }

  return createDirectus<T>(config.baseURL, config.clientOptions)
}

/**
 * Creates a client to communicate with the Directus REST API.
 *
 * @returns A Directus REST client.
 */
export const useDirectusRest = <T extends object = any>(options?: DirectusRestConfig): DirectusClients.Rest<T> => {
  const { mode } = useRuntimeConfig().public.directus.authConfig as { mode: AuthenticationMode }

  const config = defu<
    DirectusRestConfig,
    DirectusRestConfig[]
  >(options, {
    authConfig: {
      autoRefresh: true,
      msRefreshBeforeExpires: 1000 * 60 * 5,
      credentials: 'include',
      storage: useDirectusTokens(options?.staticToken),
    },
    restConfig: {
      credentials: 'include',
    },
  })

  return useDirectus<T>(config?.options)
    .with(authentication(mode, config.authConfig))
    .with(rest(config?.restConfig))
}

/**
 * Creates a client to communicate with the Directus GraphQL API.
 *
 * @returns A Directus GraphQL client.
 */
export const useDirectusGraphql = <T extends object = any>(options?: DirectusGraphqlConfig): DirectusClients.Graphql<T> => {
  const { mode } = useRuntimeConfig().public.directus.authConfig as { mode: AuthenticationMode }

  const config = defu<
    DirectusGraphqlConfig,
    DirectusGraphqlConfig[]
  >(options, {
    authConfig: {
      autoRefresh: true,
      msRefreshBeforeExpires: 1000 * 60 * 5,
      credentials: 'include',
      storage: useDirectusTokens(options?.staticToken),
    },
    graphqlConfig: {
      credentials: 'include',
    },
  })

  return useDirectus<T>(config?.options)
    .with(authentication(mode, config.authConfig))
    .with(graphql(config.graphqlConfig))
}

/**
 * Creates a client to communicate with the Directus Realtime API.
 *
 * @returns A Directus Realtime client.
 */
export const useDirectusRealtime = <T extends object = any>(options?: DirectusRealtimeConfig): DirectusClients.Realtime<T> => {
  const { mode } = useRuntimeConfig().public.directus.authConfig as { mode: AuthenticationMode }

  const config = defu<
    DirectusRealtimeConfig,
    DirectusRealtimeConfig[]
  >(options, {
    authConfig: {
      autoRefresh: true,
      msRefreshBeforeExpires: 1000 * 60 * 5,
      credentials: 'include',
      storage: useDirectusTokens(options?.staticToken),
    },
  })

  return useDirectus<T>(config?.options)
    .with(authentication(mode, config.authConfig))
    .with(realtime(config?.websocketConfig))
}
