import { joinURL } from 'ufo'

import type {
  DirectusFetchParams,
  UseDirectusFetchParams,
  UseDirectusFetchOptions,
} from '../runtime/types'

type DirectusAPI = 'items' | 'collections'

export function directusPath(endpoint: DirectusAPI, collection: string, id?: string) {
  const input = [collection]
  if (id !== undefined) {
    input.push(id)
  }
  return joinURL(endpoint, ...input)
}

export function destructureFetchParams<
  R,
>(
  options?: DirectusFetchParams<R>,
) {
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
  options?: UseDirectusFetchParams<ResT, DataT>,
): UseDirectusFetchOptions<ResT, DataT> {
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
