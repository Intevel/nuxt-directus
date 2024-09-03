import type { AsyncData } from 'nuxt/app'
import type { FetchError } from 'ofetch'

import type {
  KeysOf,
  PickFrom,
  HttpResponseError,
  DirectusUseFetchOptions,
} from '../types'
import {
  type MaybeRefOrGetter,
  useFetch,
  useNuxtApp,
} from '#imports'

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
