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
  destructureFetchParams,
} from '#directus/utils/fetch-options'

import type { AsyncData } from '#app'
import {
  type MaybeRef,
  toValue,
  useDirectusFetch,
  useNuxtApp,
} from '#imports'

export type TranslationsObject = {
  id: string
  key: string
  language: string
  value: string
}

export function useDirectusTranslations() {
  const { $directusFetch } = useNuxtApp()

  function $createTranslation<
    T extends Omit<TranslationsObject, 'id'>,
    R extends ResponseType = ResponseType,
  >(
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('translations'), {
      ...fetchOptions,
      body: toValue(data),
      method: 'POST',
    })
  }

  function createTranslation<
    ResT extends Omit<TranslationsObject, 'id'>,
    DataT = ResT,
    DefaultT = undefined,
  >(
    data: Partial<ResT>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<DefaultT | PickFrom<DataT, KeysOf<DataT>>, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('translations'), {
      ...options,
      body: data,
      method: 'POST',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
    })
  }

  function $createTranslations<
    T extends Omit<TranslationsObject, 'id'>,
    R extends ResponseType = ResponseType,
  >(
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('translations'), {
      ...fetchOptions,
      body: toValue(data),
      method: 'POST',
    })
  }

  function createTranslations<
    ResT extends Omit<TranslationsObject, 'id'>,
    DataT = ResT,
    DefaultT = undefined,
  >(
    data: Partial<ResT>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('translations'), {
      ...options,
      body: data,
      method: 'POST',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
    })
  }

  function $readTranslation<
    T extends TranslationsObject,
    R extends ResponseType = ResponseType,
  >(
    id: string,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('translations', undefined, id), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function readTranslation<
    ResT extends TranslationsObject,
    DataT = ResT,
    DefaultT = undefined,
  >(
    id: MaybeRef<string>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('translations', undefined, toValue(id)), {
      ...options,
      method: 'GET',
    })
  }

  function $readTranslations<
    T extends TranslationsObject[],
    R extends ResponseType = ResponseType,
  >(
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('translations'), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function readTranslations<
    ResT extends TranslationsObject[],
    DataT = ResT,
    DefaultT = undefined,
  >(
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('translations'), {
      ...options,
      method: 'GET',
    })
  }

  function $updateTranslation<
    T extends Omit<TranslationsObject, 'id'>,
    R extends ResponseType = ResponseType,
  >(
    id: string,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('translations', undefined, id), {
      ...fetchOptions,
      body: toValue(data),
      method: 'PATCH',
    })
  }

  function updateTranslation<
    ResT extends Omit<TranslationsObject, 'id'>,
    DataT = ResT,
    DefaultT = undefined,
  >(
    id: MaybeRef<string>,
    data: MaybeRef<Partial<ResT>>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('translations', undefined, toValue(id)), {
      ...options,
      body: data,
      method: 'PATCH',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
    })
  }

  function $updateTranslations<
    T extends Omit<TranslationsObject, 'id'>,
    R extends ResponseType = ResponseType,
  >(
    keys: MaybeRef<string[]>,
    data: MaybeRef<Partial<T>>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('translations'), {
      ...fetchOptions,
      body: {
        keys: toValue(keys),
        data: toValue(data),
      },
      method: 'PATCH',
    })
  }

  function updateTranslations<
    ResT extends Omit<TranslationsObject, 'id'>,
    DataT = ResT,
    DefaultT = undefined,
  >(
    keys: MaybeRef<string[]>,
    data: MaybeRef<Partial<ResT>>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('translations'), {
      ...options,
      body: {
        keys: toValue(keys),
        data: toValue(data),
      },
      method: 'PATCH',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
    })
  }

  function $deleteTranslation<
    T,
    R extends ResponseType = ResponseType,
  >(
    id: string,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('translations', undefined, id), {
      ...fetchOptions,
      method: 'DELETE',
    })
  }

  function deleteTranslation<
    ResT,
    DataT = ResT,
    DefaultT = undefined,
  >(
    id: MaybeRef<string>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<DefaultT | PickFrom<DataT, KeysOf<DataT>>, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('translations', undefined, toValue(id)), {
      ...options,
      method: 'DELETE',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
    })
  }

  function $deleteTranslations<
    R extends ResponseType = ResponseType,
  >(
    keys: MaybeRef<string[]>,
    options?: DirectusFetchParams<R>,
  ): Promise<any> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch(directusPath('translations'), {
      ...fetchOptions,
      body: toValue(keys),
      method: 'DELETE',
    })
  }

  function deleteTranslations<
    ResT,
    DataT = ResT,
    DefaultT = undefined,
  >(
    keys: MaybeRef<string[]>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<DefaultT | PickFrom<DataT, KeysOf<DataT>>, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('translations'), {
      ...options,
      body: keys,
      method: 'DELETE',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
    })
  }

  return {
    $createTranslation,
    createTranslation,
    $createTranslations,
    createTranslations,
    $readTranslation,
    readTranslation,
    $readTranslations,
    readTranslations,
    // $searchTranslations,
    // searchTranslations,
    $updateTranslation,
    updateTranslation,
    $updateTranslations,
    updateTranslations,
    $deleteTranslation,
    deleteTranslation,
    $deleteTranslations,
    deleteTranslations,
  }
}
