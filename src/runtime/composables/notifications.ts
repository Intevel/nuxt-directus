import type { FetchError, MappedResponseType, ResponseType } from 'ofetch'

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
    DefaultT = undefined,
  >(
    notification: MaybeRef<ResT>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('notifications'), {
      ...options,
      body: notification,
      method: 'POST',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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
    DefaultT = undefined,
  >(
    notification: MaybeRef<ResT>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('notifications'), {
      ...options,
      body: notification,
      method: 'POST',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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
    DefaultT = undefined,
  >(
    id: MaybeRef<number>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('notifications', undefined, toValue(id)), {
      ...options,
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
    DefaultT = undefined,
  >(
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('notifications'), {
      ...options,
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
    DefaultT = undefined,
  >(
    id: MaybeRef<number>,
    notification: MaybeRef<ResT>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('notifications', undefined, toValue(id)), {
      ...options,
      body: notification,
      method: 'PATCH',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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
    DefaultT = undefined,
  >(
    ids: MaybeRef<number[]>,
    notifications: MaybeRef<ResT>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('notifications'), {
      ...options,
      body: {
        keys: toValue(ids),
        data: toValue(notifications),
      },
      method: 'PATCH',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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

  function deleteNotification<
    ResT,
    DataT = ResT,
    DefaultT = undefined,
  >(
    id: MaybeRef<number>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<DefaultT | PickFrom<DataT, KeysOf<DataT>>, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('notifications', undefined, toValue(id)), {
      ...options,
      method: 'DELETE',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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

  function deleteNotifications<
    ResT,
    DataT = ResT,
    DefaultT = undefined,
  >(
    ids: MaybeRef<number[]>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<DefaultT | PickFrom<DataT, KeysOf<DataT>>, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('notifications'), {
      ...options,
      body: ids,
      method: 'DELETE',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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
