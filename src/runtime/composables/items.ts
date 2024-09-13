import type { FetchError, ResponseType } from 'ofetch'

import type {
  KeysOf,
  PickFrom,
  HttpResponseError,
  DirectusFetchParams,
  DirectusUseFetchParams,
} from '#directus/types'
import {
  directusPath,
  destructureFetchParams,
  destructureUseFetchParams,
} from '#directus/utils/fetch-options'

import type { AsyncData } from '#app'
import {
  type MaybeRef,
  toValue,
  useDirectusFetch,
  useNuxtApp,
} from '#imports'

export type DirectusFetchOptionsItems<
  R extends ResponseType = 'json',
> = Omit<DirectusFetchParams<R>, 'body'>

export type DirectusUseFetchOptionsItems<
  ResT,
  DataT = ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = undefined,
> = Omit<DirectusUseFetchParams<ResT, DataT, PickKeys, DefaultT>, 'body'>

export function useDirectusItems() {
  const { $directusFetch } = useNuxtApp()

  function $createItem<
    T,
    R extends ResponseType = 'json',
  >(
    collection: string,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchOptionsItems<R>,
  ) {
    const fetchOptions = destructureFetchParams<R>(options)

    return $directusFetch<T, R>(directusPath('items', collection), {
      ...fetchOptions,
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
    options?: DirectusUseFetchOptionsItems<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureUseFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('items', collection), {
      ...fetchOptions,
      body: data,
      method: 'POST',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $createItems<
    T,
    R extends ResponseType = 'json',
  >(
    collection: string,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchOptionsItems<R>,
  ) {
    const fetchOptions = destructureFetchParams<R>(options)

    return $directusFetch<T, R>(directusPath('items', collection), {
      ...fetchOptions,
      body: toValue(data),
      method: 'POST',
    })
  }

  function createItems<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    data: DirectusUseFetchParams<ResT, DataT>['body'],
    options?: DirectusUseFetchOptionsItems<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureUseFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('items', collection), {
      ...fetchOptions,
      body: data,
      method: 'POST',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $readItem<
    T,
    R extends ResponseType = 'json',
  >(
    collection: string,
    id: string,
    options?: DirectusFetchOptionsItems<R>,
  ) {
    const fetchOptions = destructureFetchParams<R>(options)

    return $directusFetch<T, R>(directusPath('items', collection, id), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function readItem<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    id: string,
    options?: DirectusUseFetchOptionsItems<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const fetchOptions = destructureUseFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('items', collection, id), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function $readItems<
    T,
    R extends ResponseType = 'json',
  >(
    collection: string,
    options?: DirectusFetchOptionsItems<R>,
  ) {
    const fetchOptions = destructureFetchParams<R>(options)

    return $directusFetch<T, R>(directusPath('items', collection), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function readItems<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    options?: DirectusUseFetchOptionsItems<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const fetchOptions = destructureUseFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('items', collection), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function $readSingleton<
    T,
    R extends ResponseType = 'json',
  >(
    collection: string,
    options?: DirectusFetchOptionsItems<R>,
  ) {
    const fetchOptions = destructureFetchParams<R>(options)

    return $directusFetch<T, R>(directusPath('items', collection), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function readSingleton<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    options?: DirectusUseFetchOptionsItems<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const fetchOptions = destructureUseFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('items', collection), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function $updateItem<
    T,
    R extends ResponseType = 'json',
  >(
    collection: string,
    id: string,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchOptionsItems<R>,
  ) {
    const fetchOptions = destructureFetchParams<R>(options)

    return $directusFetch<T, R>(directusPath('items', collection, id), {
      ...fetchOptions,
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
    options?: DirectusUseFetchOptionsItems<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureUseFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('items', collection, id), {
      ...fetchOptions,
      body: data,
      method: 'PATCH',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $updateItems<
    T,
    R extends ResponseType = 'json',
  >(
    collection: string,
    ids: MaybeRef<string[]>,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchOptionsItems<R>,
  ): Promise<T>
  function $updateItems<
    T,
    R extends ResponseType = 'json',
  >(
    collection: string,
    query: MaybeRef<Record<string, unknown>>,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchOptionsItems<R>,
  ): Promise<T>
  function $updateItems<
    T,
    R extends ResponseType = 'json',
  >(
    collection: string,
    keys: MaybeRef<string[]> | MaybeRef<Record<string, unknown>>,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchOptionsItems<R>,
  ) {
    const fetchOptions = destructureFetchParams<R>(options)
    const _keys = toValue(keys)
    let body: DirectusFetchParams<R>['body']

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

    return $directusFetch<T, R>(directusPath('items', collection), {
      ...fetchOptions,
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
    options?: DirectusUseFetchOptionsItems<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null>
  function updateItems<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    query: MaybeRef<Record<string, unknown>>,
    data: MaybeRef<Partial<ResT>>,
    options?: DirectusUseFetchOptionsItems<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null>
  function updateItems<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    keys: MaybeRef<string[]> | MaybeRef<Record<string, unknown>>,
    data: MaybeRef<Partial<ResT>>,
    options?: DirectusUseFetchOptionsItems<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureUseFetchParams(options)
    const _keys = toValue(keys)
    let body: DirectusUseFetchParams<ResT, DataT>['body']

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

    return useDirectusFetch<ResT, DataT>(directusPath('items', collection), {
      ...fetchOptions,
      body,
      method: 'PATCH',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $updateSingleton<
    T,
    R extends ResponseType = 'json',
  >(
    collection: string,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchOptionsItems<R>,
  ) {
    const fetchOptions = destructureFetchParams<R>(options)

    return $directusFetch<T, R>(directusPath('items', collection), {
      ...fetchOptions,
      body: toValue(data),
      method: 'PATCH',
    })
  }

  function updateSingleton<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    data: MaybeRef<Partial<ResT>>,
    options?: DirectusUseFetchOptionsItems<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureUseFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('items', collection), {
      ...fetchOptions,
      body: data,
      method: 'PATCH',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $deleteItem(
    collection: string,
    id: string,
    options?: DirectusFetchOptionsItems,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch(directusPath('items', collection, id), {
      ...fetchOptions,
      method: 'DELETE',
    })
  }

  function deleteItem(
    collection: string,
    id: string,
    options?: DirectusUseFetchOptionsItems<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureUseFetchParams(options)

    return useDirectusFetch<unknown>(directusPath('items', collection, id), {
      ...fetchOptions,
      method: 'DELETE',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $deleteItems(
    collection: string,
    ids: MaybeRef<string[]>,
    options?: DirectusFetchOptionsItems,
  ): Promise<any>
  function $deleteItems(
    collection: string,
    query: MaybeRef<Record<string, unknown>>,
    options?: DirectusFetchOptionsItems,
  ): Promise<any>
  function $deleteItems(
    collection: string,
    keys: MaybeRef<string[]> | MaybeRef<Record<string, unknown>>,
    options?: DirectusFetchOptionsItems,
  ) {
    const fetchOptions = destructureFetchParams(options)
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

    return $directusFetch(directusPath('items', collection), {
      ...fetchOptions,
      body,
      method: 'DELETE',
    })
  }

  function deleteItems(
    collection: string,
    ids: MaybeRef<string[]>,
    options?: DirectusUseFetchOptionsItems<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null>
  function deleteItems(
    collection: string,
    query: MaybeRef<Record<string, unknown>>,
    options?: DirectusUseFetchOptionsItems<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null>
  function deleteItems(
    collection: string,
    ids: MaybeRef<string[]> | MaybeRef<Record<string, unknown>>,
    options?: DirectusUseFetchOptionsItems<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureUseFetchParams(options)
    const _ids = toValue(ids)
    let body: DirectusUseFetchParams<unknown>['body']

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

    return useDirectusFetch<unknown>(directusPath('items', collection), {
      ...fetchOptions,
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
