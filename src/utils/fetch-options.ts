import { joinURL } from 'ufo'

import type {
  DirectusFetchParams,
  UseDirectusFetchParams,
} from '../runtime/types'

export function collectionURL(collection: string, id?: string) {
  const input = [collection]
  if (id !== undefined) {
    input.push(id)
  }
  return joinURL('items', ...input)
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
