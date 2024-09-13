import type { FetchError, FetchOptions, MappedResponseType, ResponseType } from 'ofetch'

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

export type NotificationObject = {
  id?: number
  timestamp?: string
  status?: string
  recipient?: string
  sender?: string
  subject?: string
  message?: string
  collection?: string
  item?: string
}

export type DirectusFetchOptionsNotifications<
  R extends ResponseType = 'json',
> = Omit<FetchOptions<R>, 'method' | 'params' | 'query' | 'body'>

export type DirectusUseFetchOptionsNotifications<
  ResT,
  DataT = ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = undefined,
> = Omit<DirectusUseFetchOptions<ResT, DataT, PickKeys, DefaultT>, 'method' | 'params' | 'query' | 'body'>

export function useDirectusNotifications() {
  const { $directusFetch } = useNuxtApp()

  function $createNotification<
    T extends NotificationObject,
    R extends ResponseType = 'json',
  >(
    notification: MaybeRef<T>,
    options?: DirectusFetchOptionsNotifications<R>,
  ): Promise<MappedResponseType<R, T>> {
    return $directusFetch<T, R>(directusPath('notifications'), {
      ...options,
      query: undefined,
      params: undefined,
      body: toValue(notification),
      method: 'POST',
    })
  }

  function createNotification<
    ResT extends NotificationObject,
    DataT = ResT,
  >(
    notification: MaybeRef<ResT>,
    options?: DirectusUseFetchOptionsNotifications<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = options || {}

    return useDirectusFetch<ResT, DataT>(directusPath('notifications'), {
      ...fetchOptions,
      query: undefined,
      params: undefined,
      body: toValue(notification),
      method: 'POST',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $createNotifications<
    T extends NotificationObject[],
    R extends ResponseType = 'json',
  >(
    notification: MaybeRef<T>,
    options?: DirectusFetchOptionsNotifications<R>,
  ): Promise<MappedResponseType<R, T>> {
    return $directusFetch<T, R>(directusPath('notifications'), {
      ...options,
      query: undefined,
      params: undefined,
      body: toValue(notification),
      method: 'POST',
    })
  }

  function createNotifications<
    ResT extends NotificationObject[],
    DataT = ResT,
  >(
    notification: MaybeRef<ResT>,
    options?: DirectusUseFetchOptionsNotifications<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = options || {}

    return useDirectusFetch<ResT, DataT>(directusPath('notifications'), {
      ...fetchOptions,
      query: undefined,
      params: undefined,
      body: toValue(notification),
      method: 'POST',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $readNotification<
    T extends NotificationObject,
    R extends ResponseType = 'json',
  >(
    id: number,
    options?: DirectusFetchOptionsNotifications<R>,
  ): Promise<MappedResponseType<R, T>> {
    return $directusFetch<T, R>(directusPath('notifications', undefined, id), {
      ...options,
      query: undefined,
      params: undefined,
      method: 'GET',
    })
  }

  function readNotification<
    ResT extends NotificationObject,
    DataT = ResT,
  >(
    id: number,
    options?: DirectusUseFetchOptionsNotifications<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = options || {}

    return useDirectusFetch<ResT, DataT>(directusPath('notifications', undefined, id), {
      ...fetchOptions,
      query: undefined,
      params: undefined,
      method: 'GET',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $readNotifications<
    T extends NotificationObject[],
    R extends ResponseType = 'json',
  >(
    options?: DirectusFetchOptionsNotifications<R>,
  ): Promise<MappedResponseType<R, T>> {
    return $directusFetch<T, R>(directusPath('notifications'), {
      ...options,
      query: undefined,
      params: undefined,
      method: 'GET',
    })
  }

  function readNotifications<
    ResT extends NotificationObject[],
    DataT = ResT,
  >(
    options?: DirectusUseFetchOptionsNotifications<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = options || {}

    return useDirectusFetch<ResT, DataT>(directusPath('notifications'), {
      ...fetchOptions,
      query: undefined,
      params: undefined,
      method: 'GET',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $updateNotification<
    T extends NotificationObject,
    R extends ResponseType = 'json',
  >(
    id: number,
    notification: MaybeRef<T>,
    options?: DirectusFetchOptionsNotifications<R>,
  ): Promise<MappedResponseType<R, T>> {
    return $directusFetch<T, R>(directusPath('notifications', undefined, id), {
      ...options,
      body: toValue(notification),
      query: undefined,
      params: undefined,
      method: 'PATCH',
    })
  }

  function updateNotification<
    ResT extends NotificationObject,
    DataT = ResT,
  >(
    id: number,
    notification: MaybeRef<ResT>,
    options?: DirectusUseFetchOptionsNotifications<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = options || {}

    return useDirectusFetch<ResT, DataT>(directusPath('notifications', undefined, id), {
      ...fetchOptions,
      body: toValue(notification),
      query: undefined,
      params: undefined,
      method: 'PATCH',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $updateNotifications<
    T extends NotificationObject[],
    R extends ResponseType = 'json',
  >(
    ids: number[],
    notifications: MaybeRef<T>,
    options?: DirectusFetchOptionsNotifications<R>,
  ): Promise<MappedResponseType<R, T>> {
    return $directusFetch<T, R>(directusPath('notifications', undefined), {
      ...options,
      body: {
        keys: ids,
        data: toValue(notifications),
      },
      query: undefined,
      params: undefined,
      method: 'PATCH',
    })
  }

  function updateNotifications<
    ResT extends NotificationObject[],
    DataT = ResT,
  >(
    ids: number[],
    notifications: MaybeRef<ResT>,
    options?: DirectusUseFetchOptionsNotifications<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = options || {}

    return useDirectusFetch<ResT, DataT>(directusPath('notifications'), {
      ...fetchOptions,
      body: {
        keys: ids,
        data: toValue(notifications),
      },
      query: undefined,
      params: undefined,
      method: 'PATCH',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $deleteNotification(
    id: number,
    options?: DirectusFetchOptionsNotifications,
  ): Promise<void> {
    return $directusFetch(directusPath('notifications', undefined, id), {
      ...options,
      query: undefined,
      params: undefined,
      method: 'DELETE',
    })
  }

  function deleteNotification(
    id: number,
    options?: DirectusUseFetchOptionsNotifications<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = options || {}

    return useDirectusFetch(directusPath('notifications', undefined, id), {
      ...fetchOptions,
      query: undefined,
      params: undefined,
      method: 'DELETE',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $deleteNotifications(
    ids: number[],
    options?: DirectusFetchOptionsNotifications,
  ): Promise<void> {
    return $directusFetch(directusPath('notifications'), {
      ...options,
      body: ids,
      query: undefined,
      params: undefined,
      method: 'DELETE',
    })
  }

  function deleteNotifications(
    ids: number[],
    options?: DirectusUseFetchOptionsNotifications<unknown>,
  ): AsyncData<unknown, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = options || {}

    return useDirectusFetch(directusPath('notifications'), {
      ...fetchOptions,
      body: ids,
      query: undefined,
      params: undefined,
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
