import { defu } from 'defu'
import type {
  DirectusClientOptions,
  DirectusRestConfig,
  DirectusClients,
} from '../types/use-directus-sdk'
import { useDirectusTokens } from './use-directus-tokens'
import {
  type AuthenticationMode,
  type DirectusClient,
  authentication,
  createDirectus,
  rest,
} from '#directus/sdk'
import { useRuntimeConfig } from '#imports'

/**
 * Provides the core functionalities to create a custom Directus client.
 *
 * @returns createDirectus.
 */
export const useDirectusSDK = <T = any>(options?: DirectusClientOptions): DirectusClient<T> => {
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
export const useDirectusRest = <T = any>(options?: DirectusRestConfig): DirectusClients.Rest<T> => {
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

  return useDirectusSDK<T>(config?.options)
    .with(authentication(mode, config.authConfig))
    .with(rest(config?.restConfig))
}
