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

  function $readItem(
    collection: string,
    id: string,
    params?: DirectusFetchParams,
  ) {
    return $directusFetch(collectionURL(collection, id), {
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
    const { params, ...fetchOptions } = destructureUseFetchParams<ResT, DataT>(options)

    return useDirectusFetch<ResT, DataT>(collectionURL(collection, id), {
      ...fetchOptions,
      params,
      method: 'GET',
    })
  }

  function $readItems(
    collection: string,
    options?: DirectusFetchParams,
  ) {
    const { params, ...fetchOptions } = destructureFetchParams(options)

    return $directusFetch(collectionURL(collection), {
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
    const { params, ...fetchOptions } = destructureUseFetchParams<ResT, DataT>(options)

    return useDirectusFetch<ResT, DataT>(collectionURL(collection), {
      ...fetchOptions,
      params,
      method: 'GET',
    })
  }

  function $readSingleton(
    collection: string,
    options?: DirectusFetchParams,
  ) {
    const { params, ...fetchOptions } = destructureFetchParams(options)

    return $directusFetch(collectionURL(collection), {
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
    const { params, ...fetchOptions } = destructureUseFetchParams<ResT, DataT>(options)

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
