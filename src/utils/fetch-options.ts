import type { FetchOptions, ResponseType } from 'ofetch'
import { joinURL } from 'ufo'

import type {
  DirectusFetchParams,
  DirectusUseFetchOptions,
  DirectusUseFetchParams,
} from '../runtime/types'

type DirectusAPI = 'items' | 'collections' | 'notifications'

export function directusPath(endpoint: 'collections' | 'notifications', collection?: string, id?: string | number): string
export function directusPath(endpoint: Exclude<DirectusAPI, 'collections'>, collection: string, id?: string | number): string
export function directusPath(endpoint: DirectusAPI, collection?: string, id?: string | number): string {
  if (endpoint === 'collections') {
    return collection !== undefined
      ? joinURL('collections', collection)
      : 'collections'
  }
  else if (endpoint === 'notifications') {
    return id !== undefined
      ? joinURL('notifications', id.toString())
      : 'notifications'
  }
  if (collection === undefined) {
    throw new Error('Collection must be defined for endpoints other than "collections"')
  }
  const input = [collection]
  if (id !== undefined) {
    input.push(id.toString())
  }
  return joinURL(endpoint, ...input)
}

export function destructureFetchParams<
  R extends ResponseType = 'json',
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

export function destructureUseFetchParams<
  ResT,
  DataT = ResT,
>(
  options?: DirectusUseFetchParams<ResT, DataT>,
): DirectusUseFetchOptions<ResT, DataT> {
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
