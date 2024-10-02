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

export type VersionsObject = {
  key?: string
  name?: string
  collection?: string
  item?: string
  date_created?: string
  user_created?: string
}

export interface VersionsObjectRes extends Required<VersionsObject> {
  id: string
  hash: string
}

export interface VersionsCompare<T extends Record<string, any>> {
  outdated: boolean
  mainHash: string
  current: T
  main: T
}

export function useDirectusVersions() {
  const { $directusFetch } = useNuxtApp()

  function $createVersion<
    T extends VersionsObjectRes,
    R extends ResponseType = ResponseType,
  >(
    data: MaybeRef<VersionsObject>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('versions'), {
      ...fetchOptions,
      body: toValue(data),
      method: 'POST',
    })
  }

  function createVersion<
    ResT extends VersionsObjectRes,
    DataT = ResT,
    DefaultT = undefined,
  >(
    data: Partial<VersionsObject>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('versions'), {
      ...options,
      body: data,
      method: 'POST',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
    })
  }

  function $createVersions<
    T extends VersionsObjectRes[],
    R extends ResponseType = ResponseType,
  >(
    data: MaybeRef<VersionsObject[]>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('versions'), {
      ...fetchOptions,
      body: toValue(data),
      method: 'POST',
    })
  }

  function createVersions<
    ResT extends VersionsObjectRes[],
    DataT = ResT,
    DefaultT = undefined,
  >(
    data: Partial<VersionsObject[]>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('versions'), {
      ...options,
      body: data,
      method: 'POST',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
    })
  }

  function $readVersion<
    T extends VersionsObjectRes,
    R extends ResponseType = ResponseType,
  >(
    id: string,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('versions', id), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function readVersion<
    ResT extends VersionsObjectRes,
    DataT = ResT,
    DefaultT = undefined,
  >(
    id: MaybeRef<string>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('versions', toValue(id)), {
      ...options,
      method: 'GET',
    })
  }

  function $readVersions<
    T extends VersionsObjectRes[],
    R extends ResponseType = ResponseType,
  >(
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('versions'), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function readVersions<
    ResT extends VersionsObjectRes[],
    DataT = ResT,
    DefaultT = undefined,
  >(
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('versions'), {
      ...options,
      method: 'GET',
    })
  }

  function $updateVersion<
    T extends VersionsObjectRes,
    R extends ResponseType = ResponseType,
  >(
    id: string,
    data: MaybeRef<VersionsObject>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('versions', id), {
      ...fetchOptions,
      body: toValue(data),
      method: 'PATCH',
    })
  }

  function updateVersion<
    ResT extends VersionsObjectRes,
    DataT = ResT,
    DefaultT = undefined,
  >(
    id: MaybeRef<string>,
    data: MaybeRef<VersionsObject>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('versions', toValue(id)), {
      ...options,
      body: data,
      method: 'PATCH',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
    })
  }

  function $updateVersions<
    T extends VersionsObjectRes,
    R extends ResponseType = ResponseType,
  >(
    keys: MaybeRef<string[]>,
    data: MaybeRef<VersionsObject>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('versions'), {
      ...fetchOptions,
      body: {
        keys: toValue(keys),
        data: toValue(data),
      },
      method: 'PATCH',
    })
  }

  function updateVersions<
    ResT extends VersionsObjectRes,
    DataT = ResT,
    DefaultT = undefined,
  >(
    keys: MaybeRef<string[]>,
    data: MaybeRef<VersionsObject>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('versions'), {
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

  function $deleteVersion<
    R extends ResponseType = ResponseType,
  >(
    id: string,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<any, R>(directusPath('versions', id), {
      ...fetchOptions,
      method: 'DELETE',
    })
  }

  function deleteVersion(
    id: MaybeRef<string>,
    options?: UseDirectusFetchParams<any>,
  ): AsyncData<any, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<any>(() => directusPath('versions', toValue(id)), {
      ...options,
      method: 'DELETE',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
    })
  }

  function $deleteVersions<
    R extends ResponseType = ResponseType,
  >(
    keys: MaybeRef<string[]>,
    options?: DirectusFetchParams<R>,
  ): Promise<any> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<any, R>(directusPath('versions'), {
      ...fetchOptions,
      body: toValue(keys),
      method: 'DELETE',
    })
  }

  function deleteVersions(
    keys: MaybeRef<string[]>,
    options?: UseDirectusFetchParams<any>,
  ): AsyncData<any, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch(directusPath('versions'), {
      ...options,
      body: keys,
      method: 'DELETE',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
    })
  }

  function $saveVersion<
    T extends Record<string, any>,
    R extends ResponseType = ResponseType,
  >(
    id: string,
    data: MaybeRef<T>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('versions', id, 'save'), {
      ...fetchOptions,
      body: toValue(data),
      method: 'POST',
    })
  }

  function saveVersion<
    ResT extends Record<string, any>,
    DataT = ResT,
    DefaultT = undefined,
  >(
    id: MaybeRef<string>,
    data: MaybeRef<ResT>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('versions', toValue(id), 'save'), {
      ...options,
      body: data,
      method: 'POST',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
    })
  }

  function $compareVersion<
    T extends Record<string, any>,
    R extends ResponseType = ResponseType,
  >(
    id: string,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<VersionsCompare<T>, R>(directusPath('versions', id, 'compare'), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function compareVersion<
    ResT extends Record<string, any>,
    DataT extends Record<string, any> = ResT,
    DefaultT = undefined,
  >(
    id: MaybeRef<string>,
    options?: UseDirectusFetchParams<VersionsCompare<ResT>, VersionsCompare<DataT>, DefaultT>,
  ): AsyncData<PickFrom<VersionsCompare<DataT>, KeysOf<VersionsCompare<DataT>>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<VersionsCompare<ResT>, VersionsCompare<DataT>, DefaultT>(() => directusPath('versions', toValue(id), 'compare'), {
      ...options,
      method: 'GET',
    })
  }

  function $promoteVersion<
    T extends VersionsObjectRes,
    R extends ResponseType = ResponseType,
  >(
    id: MaybeRef<string>,
    mainHash: MaybeRef<string>,
    fields?: MaybeRef<string[]>,
    options?: DirectusFetchParams<R>,
  ) {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('versions', toValue(id), 'promote'), {
      ...fetchOptions,
      body: {
        mainHash: toValue(mainHash),
        ...(fields ? { fields: toValue(fields) } : {}),
      },
      method: 'POST',
    })
  }

  function promoteVersion<
    ResT extends VersionsObjectRes,
    DataT = ResT,
    DefaultT = undefined,
  >(
    id: MaybeRef<string>,
    mainHash: MaybeRef<string>,
    fields?: MaybeRef<string[]>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('versions', toValue(id), 'promote'), {
      ...options,
      body: {
        mainHash: toValue(mainHash),
        ...(fields ? { fields: toValue(fields) } : {}),
      },
      method: 'POST',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
    })
  }

  return {
    $createVersion,
    createVersion,
    $createVersions,
    createVersions,
    $readVersion,
    readVersion,
    $readVersions,
    readVersions,
    // $searchVersions,
    // searchVersions,
    $updateVersion,
    updateVersion,
    $updateVersions,
    updateVersions,
    $deleteVersion,
    deleteVersion,
    $deleteVersions,
    deleteVersions,
    $saveVersion,
    saveVersion,
    $compareVersion,
    compareVersion,
    $promoteVersion,
    promoteVersion,
  }
}
