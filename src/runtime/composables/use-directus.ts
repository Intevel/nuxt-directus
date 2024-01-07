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
  DirectusRealtimeConfig,
  DirectusClientOptions,
  DirectusGraphqlConfig,
  DirectusRestConfig
} from '../types'
import { useRuntimeConfig } from '#imports'

export const useDirectus = <T extends Object>(options?: DirectusClientOptions) => {
  const { url } = useRuntimeConfig().public.directus

  const defaultOptions: DirectusClientOptions = {
    url,
    clientOptions: {
      globals: {
        fetch: $fetch.create(options?.fetchOptions ?? {})
      }
    }
  }

  const config = defu(options, defaultOptions)

  return createDirectus<T>(config.url!, config.clientOptions)
}

export const useDirectusRest = <T extends Object>(options?: DirectusRestConfig) => {
  const { moduleConfig: { autoRefresh }, authConfig: { useNuxtCookies } } = useRuntimeConfig().public.directus

  const defaultOptions: DirectusRestConfig = {
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

export const useDirectusGraphql = <T extends Object>(options?: DirectusGraphqlConfig) => {
  const { moduleConfig: { autoRefresh }, authConfig: { useNuxtCookies } } = useRuntimeConfig().public.directus

  const defaultOptions: DirectusGraphqlConfig = {
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

export const useDirectusRealtime = <T extends Object>(options?: DirectusRealtimeConfig) => {
  const { moduleConfig: { autoRefresh }, authConfig: { useNuxtCookies } } = useRuntimeConfig().public.directus

  const defaultOptions: DirectusRealtimeConfig = {
    authConfig: {
      autoRefresh,
      storage: useDirectusTokens(options?.useStaticToken)
    },
    options: {
      clientOptions: {
        globals: {
          WebSocket
        }
      }
    }
  }

  const config = defu(options, defaultOptions)

  const client = useDirectus<T>(config?.options)
    .with(authentication(useNuxtCookies ? 'json' : 'cookie', config.authConfig))
    .with(realtime(config?.websocketConfig))

  return client
}
