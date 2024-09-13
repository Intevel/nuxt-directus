import type { FetchOptions, ResponseType } from 'ofetch'
import { joinURL } from 'ufo'

import type {
  KeysOf,
  DirectusEndpoints,
  DirectusUseFetchOptions,
} from '#directus/types'
import {
  type MaybeRefOrGetter,
  createError,
} from '#imports'

type MaybeRefOrGetterParams<T> = T extends object
  ? { [P in keyof T]: MaybeRefOrGetter<T[P]> }
  : T

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
  R extends ResponseType = ResponseType,
> = DirectusQueryParams
& Omit<FetchOptions<R>, 'method' | 'params' | 'query' | 'body'>

export type DirectusUseFetchParams<
  ResT,
  DataT = ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = undefined,
> = MaybeRefOrGetterParams<DirectusQueryParams>
& Omit<DirectusUseFetchOptions<ResT, DataT, PickKeys, DefaultT>, 'method' | 'params' | 'query' | 'body'>

export function directusPath(
  endpoint: 'activity' | 'collections' | 'notifications',
  collection?: string,
  id?: string | number,
): string
export function directusPath(
  endpoint: Exclude<DirectusEndpoints, 'activity' | 'collections' | 'notifications'>,
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
  else if (endpoint === 'notifications') {
    return id !== undefined
      ? joinURL('notifications', id.toString())
      : 'notifications'
  }
  if (endpoint !== 'activity' && collection === undefined) {
    throw createError({
      statusCode: 500,
      message: 'Collection must be defined for endpoints other than "activity", "collections" and "notifications".',
    })
  }
  const input = collection ? [collection] : []
  if (id !== undefined) {
    input.push(id.toString())
  }
  return joinURL(endpoint, ...input)
}

export function destructureFetchParams<
  R extends ResponseType = ResponseType,
>(
  options?: DirectusFetchParams<R>,
): FetchOptions<R>
export function destructureFetchParams<
  ResT,
  DataT = ResT,
>(
  options?: DirectusUseFetchParams<ResT, DataT>,
): DirectusUseFetchOptions<ResT, DataT>
export function destructureFetchParams<
  ResT,
  DataT = ResT,
  R extends ResponseType = ResponseType,
>(
  options?: DirectusFetchParams<R> | DirectusUseFetchParams<ResT, DataT>,
): FetchOptions<R> | DirectusUseFetchOptions<ResT, DataT> {
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
