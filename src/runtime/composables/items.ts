import type { FetchError, ResponseType } from 'ofetch'

import type {
  KeysOf,
  PickFrom,
  HttpResponseError,
  DirectusFetchOptions,
  DirectusFetchParams,
  DirectusUseFetchOptions,
  DirectusUseFetchParams,
} from '#directus/types'
import {
  directusPath,
  destructureFetchParams,
} from '#directus/utils/fetch-options'

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
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

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
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)

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
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

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
    data: DirectusUseFetchOptions<ResT, DataT>['body'],
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)

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
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    id: string,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

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
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const fetchOptions = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('items', collection, id), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function $readItems<
    T,
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

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
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const fetchOptions = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('items', collection), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function $readSingleton<
    T,
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

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
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const fetchOptions = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('items', collection), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function $updateItem<
    T,
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    id: string,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

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
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)

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
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    ids: MaybeRef<string[]>,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<R>,
  ): Promise<T>
  function $updateItems<
    T,
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    query: MaybeRef<Record<string, unknown>>,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<R>,
  ): Promise<T>
  function $updateItems<
    T,
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    keys: MaybeRef<string[]> | MaybeRef<Record<string, unknown>>,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)
    const _keys = toValue(keys)
    let body: DirectusFetchOptions<R>['body']

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
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null>
  function updateItems<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    query: MaybeRef<Record<string, unknown>>,
    data: MaybeRef<Partial<ResT>>,
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null>
  function updateItems<
    ResT,
    DataT = ResT,
  >(
    collection: string,
    keys: MaybeRef<string[]> | MaybeRef<Record<string, unknown>>,
    data: MaybeRef<Partial<ResT>>,
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)
    const _keys = toValue(keys)
    let body: DirectusUseFetchOptions<ResT, DataT>['body']

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
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

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
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('items', collection), {
      ...fetchOptions,
      body: data,
      method: 'PATCH',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $deleteItem<
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    id: string,
    options?: DirectusFetchParams<R>,
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
    options?: DirectusUseFetchParams<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)

    return useDirectusFetch<unknown>(directusPath('items', collection, id), {
      ...fetchOptions,
      method: 'DELETE',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $deleteItems<
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    ids: MaybeRef<string[]>,
    options?: DirectusFetchParams<R>,
  ): Promise<any>
  function $deleteItems<
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    query: MaybeRef<Record<string, unknown>>,
    options?: DirectusFetchParams<R>,
  ): Promise<any>
  function $deleteItems<
    R extends ResponseType = ResponseType,
  >(
    collection: string,
    keys: MaybeRef<string[]> | MaybeRef<Record<string, unknown>>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)
    const _keys = toValue(keys)
    let body: DirectusFetchOptions['body']

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
    options?: DirectusUseFetchParams<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null>
  function deleteItems(
    collection: string,
    query: MaybeRef<Record<string, unknown>>,
    options?: DirectusUseFetchParams<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null>
  function deleteItems(
    collection: string,
    ids: MaybeRef<string[]> | MaybeRef<Record<string, unknown>>,
    options?: DirectusUseFetchParams<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)
    const _ids = toValue(ids)
    let body: DirectusUseFetchOptions<unknown>['body']

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
