import type { FetchError } from 'ofetch'

import type {
  KeysOf,
  PickFrom,
  HttpResponseError,
  DirectusFetchParams,
  UseDirectusFetchParams,
} from '../types'
import {
  collectionURL,
  destructureFetchParams,
  destructureUseFetchParams,
} from '../../utils/fetch-options'

import type { AsyncData } from '#app'
import {
  useDirectusFetch,
  useNuxtApp,
} from '#imports'

export function useDirectusItems() {
  const { $directusFetch } = useNuxtApp()

  function $readItem<
    T,
  >(
    collection: string,
    id: string,
    options?: DirectusFetchParams<T>,
  ) {
    const { params, ...fetchOptions } = destructureFetchParams(options)

    return $directusFetch<T>(collectionURL(collection, id), {
      ...fetchOptions,
      params,
      method: 'GET',
    })
  }

  function readItem<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    id: string,
    options?: UseDirectusFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { params, ...fetchOptions } = destructureUseFetchParams(options)

    return useDirectusFetch<ResT, DataT>(collectionURL(collection, id), {
      ...fetchOptions,
      params,
      method: 'GET',
    })
  }

  function $readItems<
    T,
  >(
    collection: string,
    options?: DirectusFetchParams<T>,
  ) {
    const { params, ...fetchOptions } = destructureFetchParams(options)

    return $directusFetch<T>(collectionURL(collection), {
      ...fetchOptions,
      params,
      method: 'GET',
    })
  }

  function readItems<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    options?: UseDirectusFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { params, ...fetchOptions } = destructureUseFetchParams(options)

    return useDirectusFetch<ResT, DataT>(collectionURL(collection), {
      ...fetchOptions,
      params,
      method: 'GET',
    })
  }

  function $readSingleton<
    T,
  >(
    collection: string,
    options?: DirectusFetchParams<T>,
  ) {
    const { params, ...fetchOptions } = destructureFetchParams(options)

    return $directusFetch<T>(collectionURL(collection), {
      ...fetchOptions,
      params,
      method: 'GET',
    })
  }

  function readSingleton<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    options?: UseDirectusFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { params, ...fetchOptions } = destructureUseFetchParams(options)

    return useDirectusFetch<ResT, DataT>(collectionURL(collection), {
      ...fetchOptions,
      params,
      method: 'GET',
    })
  }

  return {
    // createItem,
    // createItems,
    $readItem,
    readItem,
    $readItems,
    readItems,
    $readSingleton,
    readSingleton,
    // updateItem,
    // updateItems,
    // updateSingleton,
    // deleteItem,
    // deleteItems,
  }
}
