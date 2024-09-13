import type { AsyncData, UseFetchOptions } from 'nuxt/app'
import type { FetchError } from 'ofetch'

import type { HttpResponseError } from '#directus/types'
import {
  type MaybeRefOrGetter,
  useFetch,
  useNuxtApp,
} from '#imports'

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

export type DirectusUseFetchOptions<
  ResT,
  DataT = ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = undefined,
> = Omit<UseFetchOptions<ResT, DataT, PickKeys, DefaultT>, '$fetch'>

export function useDirectusFetch<
  ResT,
  DataT = ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = undefined,
>(
  endpoint: MaybeRefOrGetter<string>,
  options: DirectusUseFetchOptions<ResT, DataT, PickKeys, DefaultT> = {},
): AsyncData<DefaultT | PickFrom<DataT, PickKeys>, FetchError<HttpResponseError> | null> {
  const { $directusFetch } = useNuxtApp()

  return useFetch(endpoint, {
    ...options,
    $fetch: $directusFetch,
  })
}
