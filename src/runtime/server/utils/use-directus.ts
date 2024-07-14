import { defu } from 'defu'
import {
  createDirectus,
  realtime,
  rest,
  staticToken,
} from '@directus/sdk'
import type {
  DirectusClient,
  RestClient,
  StaticTokenClient,
  WebSocketClient,
} from '@directus/sdk'
import { WebSocket } from 'ws'
import type {
  DirectusClientOptions,
  DirectusRestConfig,
  DirectusRealtimeConfig,
} from '../../types'
import { useRuntimeConfig } from '#imports'

/**
 * Provides the core functionalities to create a custom Directus client.
 *
 * @returns createDirectus.
 */
export const useDirectus = <T = any>(options?: Partial<DirectusClientOptions>): DirectusClient<T> => {
  const { url } = useRuntimeConfig().public.directus

  const defaultOptions: DirectusClientOptions = {
    baseURL: url,
    clientOptions: {
      globals: {
        fetch: $fetch.create(options?.fetchOptions ?? {}),
        WebSocket,
      },
    },
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
export const useDirectusRest = <T = any>(options?: Partial<Omit<DirectusRestConfig, 'authConfig'>>): DirectusClient<T> & RestClient<T> & StaticTokenClient<T> => {
  const { staticToken: privateToken } = useRuntimeConfig().directus

  const defaultOptions: Partial<Omit<DirectusRestConfig, 'authConfig'>> = {
    staticToken: true,
    restConfig: {
      credentials: 'include', // TODO: need to confirm how to handle the incoming request's credentials inside `server/api`
    },
  }

  const config = defu(options, defaultOptions)

  const token = config.staticToken === true
    ? privateToken
    : typeof config.staticToken === 'string'
      ? config.staticToken
      : ''

  const client = useDirectus<T>(config?.options)
    .with(rest(config.restConfig))
    .with(staticToken(token))

  return client
}

/**
 * Creates a client to communicate with the Directus Realtime API.
 *
 * @returns A Directus Realtime client.
 */
export const useDirectusRealtime = <T = any>(options?: Partial<DirectusRealtimeConfig>): DirectusClient<T> & WebSocketClient<T> & StaticTokenClient<T> => {
  const { staticToken: privateToken } = useRuntimeConfig().directus

  const defaultOptions: Partial<Omit<DirectusRealtimeConfig, 'authConfig'>> = {
    staticToken: true,
  }

  const config = defu(options, defaultOptions)

  const token = config.staticToken === true
    ? privateToken
    : typeof config.staticToken === 'string'
      ? config.staticToken
      : ''

  const client = useDirectus<T>(config?.options)
    .with(realtime(config?.websocketConfig))
    .with(staticToken(token))

  return client
}
