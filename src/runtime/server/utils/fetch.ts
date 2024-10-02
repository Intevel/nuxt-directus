import type {
  FetchRequest,
  FetchOptions,
  ResponseType,
} from 'ofetch'

import {
  ofetch,
} from 'ofetch'

import { createError, useRuntimeConfig } from '#imports'

export function useDirectusFetch<
  T,
  R extends ResponseType = 'json',
>(
  req: FetchRequest,
  options?: FetchOptions<R>,
) {
  const {
    public: {
      directus: {
        url,
        staticToken: publicToken,
      },
    },
    directus: {
      staticToken,
    },
  } = useRuntimeConfig()
  if (!url) throw createError({
    statusCode: 500,
    message: 'Missing Directus URL',
  })

  const directusFetch = ofetch.create({
    baseURL: url,
    onRequest({ options }) {
      options.headers ||= {}

      // @ts-expect-error Authorization header wrong type
      if ((staticToken || publicToken) && !options.headers.Authorization) {
        // @ts-expect-error Authorization header wrong type
        options.headers.Authorization = `Bearer ${staticToken || publicToken}`
      }

      // TODO: add user's token
    },
    onResponse({ response }) {
      if (response.status === 200) {
        response._data = response._data.data
      }
    },
  })

  return directusFetch<T, R>(req, options)
}
