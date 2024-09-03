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
  type MaybeRef,
  toValue,
  useDirectusFetch,
  useNuxtApp,
} from '#imports'

export function useDirectusItems() {
  const { $directusFetch } = useNuxtApp()

  function $createItem<
    T,
  >(
    collection: string,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<T>,
  ) {
    const { params, ...fetchOptions } = destructureFetchParams(options)

    return $directusFetch<T>(collectionURL(collection), {
      ...fetchOptions,
      params,
      body: toValue(data),
      method: 'POST',
    })
  }

  function createItem<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    data: Partial<ResT>,
    options?: UseDirectusFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { params, immediate, watch, ...fetchOptions } = destructureUseFetchParams(options)

    return useDirectusFetch<ResT, DataT>(collectionURL(collection), {
      ...fetchOptions,
      params,
      body: data,
      method: 'POST',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $createItems<
    T,
  >(
    collection: string,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<T>,
  ) {
    const { params, ...fetchOptions } = destructureFetchParams(options)

    return $directusFetch<T>(collectionURL(collection), {
      ...fetchOptions,
      params,
      body: toValue(data),
      method: 'POST',
    })
  }

  function createItems<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    data: DirectusFetchParams<ResT, DataT>['body'][],
    options?: UseDirectusFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { params, immediate, watch, ...fetchOptions } = destructureUseFetchParams(options)

    return useDirectusFetch<ResT, DataT>(collectionURL(collection), {
      ...fetchOptions,
      params,
      body: data,
      method: 'POST',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

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

  function $updateItem<
    T,
  >(
    collection: string,
    id: string,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<T>,
  ) {
    const { params, ...fetchOptions } = destructureFetchParams(options)

    return $directusFetch<T>(collectionURL(collection, id), {
      ...fetchOptions,
      params,
      body: toValue(data),
      method: 'PATCH',
    })
  }

  function updateItem<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    id: string,
    data: MaybeRef<Partial<ResT>>,
    options?: UseDirectusFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { params, immediate, watch, ...fetchOptions } = destructureUseFetchParams(options)

    return useDirectusFetch<ResT, DataT>(collectionURL(collection, id), {
      ...fetchOptions,
      params,
      body: data,
      method: 'PATCH',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $updateItems<
    T,
  >(
    collection: string,
    ids: MaybeRef<string[]>,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<T>,
  ): Promise<T>
  function $updateItems<
    T,
  >(
    collection: string,
    query: MaybeRef<Record<string, unknown>>,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<T>,
  ): Promise<T>
  function $updateItems<
    T,
  >(
    collection: string,
    keys: MaybeRef<string[]> | MaybeRef<Record<string, unknown>>,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<T>,
  ) {
    const { params, ...fetchOptions } = destructureFetchParams(options)
    const _keys = toValue(keys)
    let body: DirectusFetchParams<T>['body']

    if (Array.isArray(_keys)) {
      body = {
        data: toValue(data),
        keys: _keys,
      }
    }
    else {
      body = {
        data: toValue(data),
        query: _keys,
      }
    }

    return $directusFetch<T>(collectionURL(collection), {
      ...fetchOptions,
      params,
      body,
      method: 'PATCH',
    })
  }

  function updateItems<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    ids: MaybeRef<string[]>,
    data: MaybeRef<Partial<ResT>>,
    options?: UseDirectusFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null>
  function updateItems<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    query: MaybeRef<Record<string, unknown>>,
    data: MaybeRef<Partial<ResT>>,
    options?: UseDirectusFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null>
  function updateItems<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    keys: MaybeRef<string[]> | MaybeRef<Record<string, unknown>>,
    data: MaybeRef<Partial<ResT>>,
    options?: UseDirectusFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { params, immediate, watch, ...fetchOptions } = destructureUseFetchParams(options)
    const _keys = toValue(keys)
    let body: DirectusFetchParams<ResT, DataT>['body']

    if (Array.isArray(_keys)) {
      body = {
        data: toValue(data),
        keys: _keys,
      }
    }
    else {
      body = {
        data: toValue(data),
        query: _keys,
      }
    }

    return useDirectusFetch<ResT, DataT>(collectionURL(collection), {
      ...fetchOptions,
      params,
      body,
      method: 'PATCH',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $updateSingleton<
    T,
  >(
    collection: string,
    data: DirectusFetchParams<T>['body'],
    options?: DirectusFetchParams<T>,
  ) {
    const { params, ...fetchOptions } = destructureFetchParams(options)

    return $directusFetch<T>(collectionURL(collection), {
      ...fetchOptions,
      params,
      body: data,
      method: 'PATCH',
    })
  }

  function updateSingleton<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    data: DirectusFetchParams<ResT, DataT>['body'],
    options?: UseDirectusFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { params, immediate, watch, ...fetchOptions } = destructureUseFetchParams(options)

    return useDirectusFetch<ResT, DataT>(collectionURL(collection), {
      ...fetchOptions,
      params,
      body: data,
      method: 'PATCH',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $deleteItem(
    collection: string,
    id: string,
    options?: DirectusFetchParams,
  ) {
    const { params, ...fetchOptions } = destructureFetchParams(options)

    return $directusFetch(collectionURL(collection, id), {
      ...fetchOptions,
      params,
      method: 'DELETE',
    })
  }

  function deleteItem(
    collection: string,
    id: string,
    options?: UseDirectusFetchParams<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null> {
    const { params, immediate, watch, ...fetchOptions } = destructureUseFetchParams(options)

    return useDirectusFetch<unknown>(collectionURL(collection, id), {
      ...fetchOptions,
      params,
      method: 'DELETE',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $deleteItems(
    collection: string,
    ids: MaybeRef<string[]>,
    options?: DirectusFetchParams,
  ): Promise<any>
  function $deleteItems(
    collection: string,
    query: MaybeRef<Record<string, unknown>>,
    options?: DirectusFetchParams,
  ): Promise<any>
  function $deleteItems(
    collection: string,
    keys: MaybeRef<string[]> | MaybeRef<Record<string, unknown>>,
    options?: DirectusFetchParams,
  ) {
    const { params, ...fetchOptions } = destructureFetchParams(options)
    const _keys = toValue(keys)
    let body: DirectusFetchParams['body']

    if (Array.isArray(_keys)) {
      body = {
        keys: _keys,
      }
    }
    else {
      body = {
        query: _keys,
      }
    }

    return $directusFetch(collectionURL(collection), {
      ...fetchOptions,
      params,
      body,
      method: 'DELETE',
    })
  }

  function deleteItems(
    collection: string,
    ids: MaybeRef<string[]>,
    options?: UseDirectusFetchParams<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null>
  function deleteItems(
    collection: string,
    query: MaybeRef<Record<string, unknown>>,
    options?: UseDirectusFetchParams<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null>
  function deleteItems(
    collection: string,
    ids: MaybeRef<string[]> | MaybeRef<Record<string, unknown>>,
    options?: UseDirectusFetchParams<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null> {
    const { params, immediate, watch, ...fetchOptions } = destructureUseFetchParams(options)
    const _ids = toValue(ids)
    let body: Record<string, unknown>

    if (Array.isArray(_ids)) {
      body = {
        keys: _ids,
      }
    }
    else {
      body = {
        query: _ids,
      }
    }

    return useDirectusFetch<unknown>(collectionURL(collection), {
      ...fetchOptions,
      params,
      body,
      method: 'DELETE',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  return {
    $createItem,
    createItem,
    $createItems,
    createItems,
    $readItem,
    readItem,
    $readItems,
    readItems,
    $readSingleton,
    readSingleton,
    $updateItem,
    updateItem,
    $updateItems,
    updateItems,
    $updateSingleton,
    updateSingleton,
    $deleteItem,
    deleteItem,
    $deleteItems,
    deleteItems,
  }
}
