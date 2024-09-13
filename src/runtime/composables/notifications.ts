import type { FetchError, MappedResponseType, ResponseType } from 'ofetch'

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
} from '#directus/utils/fetch-options'

import type { AsyncData } from '#app'
import {
  type MaybeRef,
  toValue,
  useDirectusFetch,
  useNuxtApp,
} from '#imports'

export type NotificationObject = {
  id: number
  timestamp: string
  status: string
  recipient: string
  sender: string
  subject: string
  message: string
  collection: string
  item: string
}

export function useDirectusNotifications() {
  const { $directusFetch } = useNuxtApp()

  function $createNotification<
    T extends NotificationObject,
    R extends ResponseType = ResponseType,
  >(
    notification: MaybeRef<T>,
    options?: DirectusFetchParams<R>,
  ): Promise<MappedResponseType<R, T>> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('notifications'), {
      ...fetchOptions,
      body: toValue(notification),
      method: 'POST',
    })
  }

  function createNotification<
    ResT extends NotificationObject,
    DataT = ResT,
  >(
    notification: MaybeRef<ResT>,
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('notifications'), {
      ...fetchOptions,
      body: toValue(notification),
      method: 'POST',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $createNotifications<
    T extends NotificationObject[],
    R extends ResponseType = ResponseType,
  >(
    notification: MaybeRef<T>,
    options?: DirectusFetchParams<R>,
  ): Promise<MappedResponseType<R, T>> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('notifications'), {
      ...fetchOptions,
      body: toValue(notification),
      method: 'POST',
    })
  }

  function createNotifications<
    ResT extends NotificationObject[],
    DataT = ResT,
  >(
    notification: MaybeRef<ResT>,
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('notifications'), {
      ...fetchOptions,
      body: toValue(notification),
      method: 'POST',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $readNotification<
    T extends NotificationObject,
    R extends ResponseType = ResponseType,
  >(
    id: number,
    options?: DirectusFetchParams<R>,
  ): Promise<MappedResponseType<R, T>> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('notifications', undefined, id), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function readNotification<
    ResT extends NotificationObject,
    DataT = ResT,
  >(
    id: number,
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const fetchOptions = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('notifications', undefined, id), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function $readNotifications<
    T extends NotificationObject[],
    R extends ResponseType = ResponseType,
  >(
    options?: DirectusFetchParams<R>,
  ): Promise<MappedResponseType<R, T>> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('notifications'), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function readNotifications<
    ResT extends NotificationObject[],
    DataT = ResT,
  >(
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const fetchOptions = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('notifications'), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function $updateNotification<
    T extends NotificationObject,
    R extends ResponseType = ResponseType,
  >(
    id: number,
    notification: MaybeRef<T>,
    options?: DirectusFetchParams<R>,
  ): Promise<MappedResponseType<R, T>> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('notifications', undefined, id), {
      ...fetchOptions,
      body: toValue(notification),
      method: 'PATCH',
    })
  }

  function updateNotification<
    ResT extends NotificationObject,
    DataT = ResT,
  >(
    id: number,
    notification: MaybeRef<ResT>,
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('notifications', undefined, id), {
      ...fetchOptions,
      body: toValue(notification),
      method: 'PATCH',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $updateNotifications<
    T extends NotificationObject[],
    R extends ResponseType = ResponseType,
  >(
    ids: number[],
    notifications: MaybeRef<T>,
    options?: DirectusFetchParams<R>,
  ): Promise<MappedResponseType<R, T>> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('notifications', undefined), {
      ...fetchOptions,
      body: {
        keys: ids,
        data: toValue(notifications),
      },
      method: 'PATCH',
    })
  }

  function updateNotifications<
    ResT extends NotificationObject[],
    DataT = ResT,
  >(
    ids: number[],
    notifications: MaybeRef<ResT>,
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('notifications'), {
      ...fetchOptions,
      body: {
        keys: ids,
        data: toValue(notifications),
      },
      method: 'PATCH',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $deleteNotification(
    id: number,
    options?: DirectusFetchParams,
  ): Promise<void> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch(directusPath('notifications', undefined, id), {
      ...fetchOptions,
      method: 'DELETE',
    })
  }

  function deleteNotification(
    id: number,
    options?: DirectusUseFetchParams<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)

    return useDirectusFetch(directusPath('notifications', undefined, id), {
      ...fetchOptions,
      method: 'DELETE',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $deleteNotifications(
    ids: number[],
    options?: DirectusFetchParams,
  ): Promise<void> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch(directusPath('notifications'), {
      ...fetchOptions,
      body: ids,
      method: 'DELETE',
    })
  }

  function deleteNotifications(
    ids: number[],
    options?: DirectusUseFetchParams<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)

    return useDirectusFetch(directusPath('notifications'), {
      ...fetchOptions,
      body: ids,
      method: 'DELETE',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  return {
    $createNotification,
    createNotification,
    $createNotifications,
    createNotifications,
    $readNotification,
    readNotification,
    $readNotifications,
    readNotifications,
    $updateNotification,
    updateNotification,
    $updateNotifications,
    updateNotifications,
    $deleteNotification,
    deleteNotification,
    $deleteNotifications,
    deleteNotifications,
  }
}
