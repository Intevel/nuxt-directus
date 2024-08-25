import type { FetchOptions, ResponseType } from 'ofetch'
import type { UseFetchOptions } from 'nuxt/app'
import type { MaybeRefOrGetter } from '#imports'

export type PickFrom<T, K extends Array<string>> = T extends Array<any>
  ? T
  : T extends Record<string, any>
    ? keyof T extends K[number]
      ? T // Exact same keys as the target, skip Pick
      : K[number] extends never
        ? T
        : Pick<T, K[number]>
    : T

export type KeysOf<T> = Array<
  T extends T // Include all keys of union types, not just common keys
    ? keyof T extends string
      ? keyof T
      : never
    : never
>

export type UseDirectusFetchOptions<
  ResT,
  DataT = ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = undefined,
> = Omit<UseFetchOptions<ResT, DataT, PickKeys, DefaultT>, '$fetch'>

export interface HttpResponseError {
  errors: {
    message: string
    extensions: {
      code: 'FORBIDDEN' | string
      path?: string
    }
  }[]
}

// TODO: add HttpResponseOk

export interface DirectusQueryParams {
  fields?: MaybeRefOrGetter<Array<string>>
  sort?: MaybeRefOrGetter<string | Array<string>>
  filter?: MaybeRefOrGetter<Record<string, unknown>>
  limit?: MaybeRefOrGetter<number>
  offset?: MaybeRefOrGetter<number>
  page?: MaybeRefOrGetter<number>
  alias?: MaybeRefOrGetter<string | Array<string>>
  deep?: MaybeRefOrGetter<Record<string, unknown>>
  search?: MaybeRefOrGetter<string>
}

export type DirectusFetchParams<
  R = ResponseType,
> = DirectusQueryParams & Omit<FetchOptions<R>, 'method' | 'params' | 'query'>

export type UseDirectusFetchParams<
  ResT,
  DataT = ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = undefined,
> = DirectusQueryParams & Omit<UseDirectusFetchOptions<ResT, DataT, PickKeys, DefaultT>, 'method' | 'params' | 'query'>
