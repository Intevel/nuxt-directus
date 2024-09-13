import type { FetchOptions, ResponseType } from 'ofetch'
import { joinURL } from 'ufo'

import type {
  DirectusEndpoints,
  DirectusFetchParams,
} from '#directus/types'
import { createError } from '#imports'

export function destructureFetchParams<
  R extends ResponseType = ResponseType,
>(
  options?: DirectusFetchParams<R>,
): FetchOptions<R> {
  const {
    fields,
    sort,
    filter,
    limit,
    offset,
    page,
    alias,
    deep,
    search,
    ...fetchOptions
  } = options || {}

  const params = {
    fields,
    sort,
    filter,
    limit,
    offset,
    page,
    alias,
    deep,
    search,
  }

  return { params, ...fetchOptions }
}

export function directusPath(
  endpoint: 'activity' | 'collections' | 'notifications' | 'revisions' | 'translations',
  collection?: string,
  id?: string | number,
): string
export function directusPath(
  endpoint: Exclude<DirectusEndpoints, 'activity' | 'collections' | 'notifications' | 'revisions' | 'translations'>,
  collection: string,
  id?: string | number,
): string
export function directusPath(
  endpoint: DirectusEndpoints,
  collection?: string,
  id?: string | number,
): string {
  if (endpoint === 'collections') {
    return collection !== undefined
      ? joinURL('collections', collection)
      : 'collections'
  }
  const systemEndpoints = ['notifications', 'revisions', 'translations']
  if (systemEndpoints.includes(endpoint)) {
    return id !== undefined
      ? joinURL(endpoint, id.toString())
      : endpoint
  }
  else if (endpoint !== 'activity' && collection === undefined) {
    throw createError({
      statusCode: 500,
      message: 'Collection must be defined for endpoints other than "activity", "collections", "notifications", "revisions" and "translations".',
    })
  }
  const input = collection ? [collection] : []
  if (id !== undefined) {
    input.push(id.toString())
  }
  return joinURL(endpoint, ...input)
}
