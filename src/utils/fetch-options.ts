import type { FetchOptions, ResponseType } from 'ofetch'
import { joinURL } from 'ufo'

import type {
  DirectusFetchParams,
  DirectusUseFetchOptions,
  DirectusUseFetchParams,
} from '../runtime/types'

type DirectusAPI = 'items' | 'collections'

export function directusPath(endpoint: 'collections', collection?: string, id?: string): string
export function directusPath(endpoint: Exclude<DirectusAPI, 'collections'>, collection: string, id?: string): string
export function directusPath(endpoint: DirectusAPI, collection?: string, id?: string): string {
  if (endpoint === 'collections') {
    if (collection === undefined) {
      return 'collections'
    }
    return joinURL('collections', collection)
  }
  if (collection === undefined) {
    throw new Error('Collection must be defined for endpoints other than "collections"')
  }
  const input = [collection]
  if (id !== undefined) {
    input.push(id)
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
