import type { FetchError, FetchOptions, ResponseType } from 'ofetch'

import type {
  KeysOf,
  PickFrom,
  HttpResponseError,
  DirectusUseFetchOptions,
} from '../types'
import {
  directusPath,
} from '../../utils/fetch-options'

import type { AsyncData } from '#app'
import {
  type MaybeRef,
  toValue,
  useDirectusFetch,
  useNuxtApp,
} from '#imports'

type CollectionObject = {
  collection: string
  schema: null | {
    [key: string]: unknown
  }
  [key: string]: unknown
}

type DirectusCollectionsFetchOptions<
  R extends ResponseType = 'json',
> = Omit<FetchOptions<R>, 'method' | 'params' | 'query' | 'body'>

type DirectusCollectionsUseFetchOptions<
  ResT,
  DataT = ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = undefined,
> = Omit<DirectusUseFetchOptions<ResT, DataT, PickKeys, DefaultT>, 'method' | 'params' | 'query' | 'body'>

export function useDirectusCollections() {
  const { $directusFetch } = useNuxtApp()

  function $createCollection<
    T extends CollectionObject,
    R extends ResponseType = 'json',
  >(
    collection: MaybeRef<CollectionObject>,
    options?: DirectusCollectionsFetchOptions<R>,
  ) {
    return $directusFetch<T, R>(directusPath('collections'), {
      ...options,
      query: undefined,
      params: undefined,
      body: toValue(collection),
      method: 'POST',
    })
  }

  function createCollection<
    ResT extends CollectionObject,
    DataT = ResT,
  >(
    collection: MaybeRef<CollectionObject>,
    options?: DirectusCollectionsUseFetchOptions<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = options || {}

    return useDirectusFetch<ResT, DataT>(directusPath('collections'), {
      ...fetchOptions,
      query: undefined,
      params: undefined,
      body: toValue(collection),
      method: 'POST',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $readCollection<
    T,
    R extends ResponseType = 'json',
  >(
    collection: string,
    options?: DirectusCollectionsFetchOptions<R>,
  ) {
    return $directusFetch<T, R>(directusPath('collections', collection), {
      ...options,
      query: undefined,
      params: undefined,
      method: 'GET',
    })
  }

  function readCollection<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    options?: DirectusCollectionsUseFetchOptions<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = options || {}

    return useDirectusFetch<ResT, DataT>(directusPath('collections', collection), {
      ...fetchOptions,
      query: undefined,
      params: undefined,
      method: 'GET',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $readCollections<
    T,
    R extends ResponseType = 'json',
  >(
    options?: DirectusCollectionsFetchOptions<R>,
  ) {
    return $directusFetch<T, R>(directusPath('collections'), {
      ...options,
      query: undefined,
      params: undefined,
      method: 'GET',
    })
  }

  function readCollections<
    ResT,
    DataT = ResT,
  >(
    options?: DirectusCollectionsUseFetchOptions<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = options || {}

    return useDirectusFetch<ResT, DataT>(directusPath('collections'), {
      ...fetchOptions,
      query: undefined,
      params: undefined,
      method: 'GET',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $updateCollection<
    T,
    R extends ResponseType = 'json',
  >(
    collection: string,
    meta: MaybeRef<Partial<T>>,
    options?: DirectusCollectionsFetchOptions<R>,
  ) {
    return $directusFetch<T, R>(directusPath('collections', collection), {
      ...options,
      body: {
        meta: toValue(meta),
      },
      query: undefined,
      params: undefined,
      method: 'PATCH',
    })
  }

  function updateCollection<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    meta: MaybeRef<Partial<DataT>>,
    options?: DirectusCollectionsUseFetchOptions<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = options || {}

    return useDirectusFetch<ResT, DataT>(directusPath('collections', collection), {
      ...fetchOptions,
      body: {
        meta: toValue(meta),
      },
      query: undefined,
      params: undefined,
      method: 'PATCH',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $deleteCollection(
    collection: string,
    options?: DirectusCollectionsFetchOptions,
  ) {
    return $directusFetch(directusPath('collections', collection), {
      ...options,
      query: undefined,
      params: undefined,
      method: 'DELETE',
    })
  }

  function deleteCollection(
    collection: string,
    options?: DirectusCollectionsUseFetchOptions<unknown>,
  ) {
    const { immediate, watch, ...fetchOptions } = options || {}

    return useDirectusFetch(directusPath('collections', collection), {
      ...fetchOptions,
      query: undefined,
      params: undefined,
      method: 'DELETE',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  return {
    $createCollection,
    createCollection,
    $readCollection,
    readCollection,
    $readCollections,
    readCollections,
    $updateCollection,
    updateCollection,
    $deleteCollection,
    deleteCollection,
  }
}
