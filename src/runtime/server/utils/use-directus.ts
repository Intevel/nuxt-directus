import { defu } from 'defu'
import {
  createDirectus,
  rest,
  staticToken
} from '@directus/sdk'
import type {
  DirectusClientOptions,
  DirectusRestConfig
} from '../../types'
import { useRuntimeConfig } from '#imports'

export const useDirectus = <T extends Object>(options?: Partial<DirectusClientOptions>) => {
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

export const useDirectusRest = <T extends Object>(options?: Partial<Omit<DirectusRestConfig, 'authConfig'>>) => {
  const { staticToken: privateToken } = useRuntimeConfig().directus

  const defaultOptions: Partial<Omit<DirectusRestConfig, 'authConfig'>> = {
    useStaticToken: true,
    restConfig: {
      credentials: 'include' // TODO: need to confirm how to handle the incoming request's credentials inside `server/api`
    }
  }

  const config = defu(options, defaultOptions)

  const token = config.useStaticToken === true
    ? privateToken
    : typeof config.useStaticToken === 'string'
      ? config.useStaticToken
      : ''

  const client = useDirectus<T>(config?.options)
    .with(rest(config.restConfig))
    .with(staticToken(token))

  return client
}
