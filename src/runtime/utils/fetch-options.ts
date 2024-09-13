import type { FetchOptions, ResponseType } from 'ofetch'
import { joinURL } from 'ufo'

import type {
  KeysOf,
  DirectusUseFetchOptions,
} from '#directus/types'
import type {
  MaybeRefOrGetter,
} from '#imports'

type MaybeRefOrGetterParams<T> = T extends object
  ? { [P in keyof T]: MaybeRefOrGetter<T[P]> }
  : T

export type DirectusEndpoints = 'items' | 'collections' | 'notifications'

export interface DirectusQueryParams {
  fields?: Array<string>
  sort?: string | Array<string>
  filter?: Record<string, unknown>
  limit?: number
  offset?: number
  page?: number
  alias?: string | Array<string>
  deep?: Record<string, unknown>
  search?: string
}

export type DirectusFetchParams<
  R extends ResponseType = 'json',
> = DirectusQueryParams & Omit<FetchOptions<R>, 'method' | 'params' | 'query'>

export type DirectusUseFetchParams<
  ResT,
  DataT = ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = undefined,
> = MaybeRefOrGetterParams<DirectusQueryParams> & Omit<DirectusUseFetchOptions<ResT, DataT, PickKeys, DefaultT>, 'method' | 'params' | 'query'>

export function directusPath(endpoint: 'collections' | 'notifications', collection?: string, id?: string | number): string
export function directusPath(endpoint: Exclude<DirectusEndpoints, 'collections'>, collection: string, id?: string | number): string
export function directusPath(endpoint: DirectusEndpoints, collection?: string, id?: string | number): string {
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
