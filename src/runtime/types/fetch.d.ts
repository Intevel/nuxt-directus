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

type MaybeRefOrGetterParams<T> = T extends object
  ? { [P in keyof T]: MaybeRefOrGetter<T[P]> }
  : T

export type DirectusUseFetchOptions<
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
  R = ResponseType<'json'>,
> = DirectusQueryParams & Omit<FetchOptions<R>, 'method' | 'params' | 'query'>

export type DirectusUseFetchParams<
  ResT,
  DataT = ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = undefined,
> = MaybeRefOrGetterParams<DirectusQueryParams> & Omit<DirectusUseFetchOptions<ResT, DataT, PickKeys, DefaultT>, 'method' | 'params' | 'query'>
