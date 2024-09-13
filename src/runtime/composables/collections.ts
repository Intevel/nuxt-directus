import type { FetchError, ResponseType } from 'ofetch'

import type {
  KeysOf,
  PickFrom,
  HttpResponseError,
  DirectusFetchParams,
  UseDirectusFetchParams,
} from '#directus/types'
import {
  directusPath,
} from '#directus/utils/fetch-options'

import type { AsyncData } from '#app'
import {
  type MaybeRef,
  toValue,
  useDirectusFetch,
  useNuxtApp,
} from '#imports'

export type CollectionObject = {
  collection: string
  schema: null | {
    [key: string]: unknown
  }
  [key: string]: unknown
}

export function useDirectusCollections() {
  const { $directusFetch } = useNuxtApp()

  function $createCollection<
    T extends CollectionObject,
    R extends ResponseType = ResponseType,
  >(
    collection: MaybeRef<T>,
    options?: DirectusFetchParams<R>,
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
    DefaultT = undefined,
  >(
    collection: MaybeRef<ResT>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('collections'), {
      ...options,
      query: undefined,
      params: undefined,
      body: collection,
      method: 'POST',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
    })
  }

  function $readCollection<
    T,
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    options?: DirectusFetchParams<R>,
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
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('collections', toValue(collection)), {
      ...options,
      query: undefined,
      params: undefined,
      method: 'GET',
    })
  }

  function $readCollections<
    T,
    R extends ResponseType = ResponseType,
  >(
    options?: DirectusFetchParams<R>,
  ) {
    return $directusFetch<T, R>(directusPath('collections'), {
      ...options,
      query: undefined,
      params: undefined,
      method: 'GET',
    })
  }

  function readCollections<
    ResT extends CollectionObject,
    DataT = ResT,
    DefaultT = undefined,
  >(
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('collections'), {
      ...options,
      query: undefined,
      params: undefined,
      method: 'GET',
    })
  }

  function $updateCollection<
    T,
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    meta: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<R>,
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
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    meta: MaybeRef<Partial<ResT>>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('collections', toValue(collection)), {
      ...options,
      body: {
        meta: toValue(meta),
      },
      query: undefined,
      params: undefined,
      method: 'PATCH',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
    })
  }

  function $deleteCollection(
    collection: string,
    options?: DirectusFetchParams,
  ) {
    return $directusFetch(directusPath('collections', collection), {
      ...options,
      query: undefined,
      params: undefined,
      method: 'DELETE',
    })
  }

  function deleteCollection<
    ResT,
    DataT = ResT,
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<DefaultT | PickFrom<DataT, KeysOf<DataT>>, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('collections', toValue(collection)), {
      ...options,
      query: undefined,
      params: undefined,
      method: 'DELETE',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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
