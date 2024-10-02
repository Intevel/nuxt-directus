import type { FetchError, ResponseType } from 'ofetch'

import type {
  KeysOf,
  PickFrom,
  HttpResponseError,
  DirectusFetchOptions,
  DirectusFetchParams,
  UseDirectusFetchOptions,
  UseDirectusFetchParams,
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
    ResT = any,
    DataT = ResT,
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    data: Partial<ResT>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<DefaultT | PickFrom<DataT, KeysOf<DataT>>, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('items', toValue(collection)), {
      ...options,
      body: data,
      method: 'POST',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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
    ResT = any,
    DataT = ResT,
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    data: Partial<ResT>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('items', toValue(collection)), {
      ...options,
      body: data,
      method: 'POST',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    id: MaybeRef<string>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('items', toValue(collection), toValue(id)), {
      ...options,
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
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('items', toValue(collection)), {
      ...options,
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
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('items', toValue(collection)), {
      ...options,
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
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    id: MaybeRef<string>,
    data: MaybeRef<Partial<ResT>>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('items', toValue(collection), toValue(id)), {
      ...options,
      body: data,
      method: 'PATCH',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    ids: MaybeRef<string[]>,
    data: MaybeRef<Partial<ResT>>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined>
  function updateItems<
    ResT,
    DataT = ResT,
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    query: MaybeRef<Record<string, unknown>>,
    data: MaybeRef<Partial<ResT>>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined>
  function updateItems<
    ResT,
    DataT = ResT,
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    keys: MaybeRef<string[]> | MaybeRef<Record<string, unknown>>,
    data: MaybeRef<Partial<ResT>>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    const _keys = toValue(keys)
    let body: UseDirectusFetchOptions<ResT, DataT, DefaultT>['body']

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

    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('items', toValue(collection)), {
      ...options,
      body,
      method: 'PATCH',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    data: MaybeRef<Partial<ResT>>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('items', toValue(collection)), {
      ...options,
      body: data,
      method: 'PATCH',
      immediate: options?.immediate === undefined ? false : options?.immediate,
      watch: options?.watch === undefined ? false : options?.watch,
    })
  }

  function $deleteItem<
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
      method: 'DELETE',
    })
  }

  function deleteItem<
    ResT,
    DataT = ResT,
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    id: MaybeRef<string>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<DefaultT | PickFrom<DataT, KeysOf<DataT>>, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('items', toValue(collection), toValue(id)), {
      ...options,
      method: 'DELETE',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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

  function deleteItems<
    ResT,
    DataT = ResT,
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    ids: MaybeRef<string[]>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<DefaultT | PickFrom<DataT, KeysOf<DataT>>, FetchError<HttpResponseError> | undefined>
  function deleteItems<
    ResT,
    DataT = ResT,
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    query: MaybeRef<Record<string, unknown>>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<DefaultT | PickFrom<DataT, KeysOf<DataT>>, FetchError<HttpResponseError> | undefined>
  function deleteItems<
    ResT,
    DataT = ResT,
    DefaultT = undefined,
  >(
    collection: MaybeRef<string>,
    ids: MaybeRef<string[]> | MaybeRef<Record<string, unknown>>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<DefaultT | PickFrom<DataT, KeysOf<DataT>>, FetchError<HttpResponseError> | undefined> {
    const _ids = toValue(ids)
    let body: UseDirectusFetchOptions<ResT, DataT, DefaultT>['body']

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

    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('items', toValue(collection)), {
      ...options,
      body,
      method: 'DELETE',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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
    // $searchItems,
    // searchItems,
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
