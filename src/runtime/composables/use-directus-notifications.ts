import { type MaybeRefOrGetter, computed, reactive, toValue } from 'vue'
import { hash } from 'ohash'
import {
  createNotification as sdkCreateNotification,
  createNotifications as sdkCreateNotifications,
  readNotification as sdkReadNotification,
  readNotifications as sdkReadNotifications,
  updateNotification as sdkUpdateNotification,
  updateNotifications as sdkUpdateNotifications,
  deleteNotification as sdkDeleteNotification,
  deleteNotifications as sdkDeleteNotifications,
} from '@directus/sdk'
import type {
  DirectusNotification,
  Query,
  CreateNotificationOutput,
  ReadNotificationOutput,
  UpdateNotificationOutput,
} from '@directus/sdk'
import type {
  DirectusRestConfig,
  DirectusClients,
  ReadAsyncOptionsWithQuery,
  ReadAsyncDataReturn,
  SDKReturn,
} from '../types'
import { useAsyncData } from '#app'
import { useDirectusRest } from '#imports'

export function useDirectusNotifications<TSchema extends object = any>(config?: Partial<DirectusRestConfig>) {
  const client: DirectusClients.Rest<TSchema> = useDirectusRest<TSchema>(config)

  /**
   * Create a new notification.
   *
   * @param item The notification to create.
   * @param query Optional return data query.
   *
   * @returns Returns the notification object for the created notification.
   */
  async function createNotification<
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>,
  >(
    item: Partial<DirectusNotification<TSchema>>,
    query?: TQuery,
  ): SDKReturn<CreateNotificationOutput<TSchema, TQuery>> {
    return await client.request(sdkCreateNotification(item, query))
  }

  /**
   * Create multiple new notifications.
   *
   * @param items The notifications to create.
   * @param query Optional return data query.
   *
   * @returns Returns the notification object for the created notification.
   */
  async function createNotifications<
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>,
  >(
    items: Partial<DirectusNotification<TSchema>>[],
    query?: TQuery,
  ): SDKReturn<CreateNotificationOutput<TSchema, TQuery>[]> {
    return await client.request(sdkCreateNotifications(items, query))
  }

  /**
   * List an existing notification by primary id.
   *
   * @param id The primary id of the dashboard.
   * @param query The query parameters.
   *
   * @returns Returns the requested notification object.
   *
   * @throws Will throw if id is empty.
   */
  async function readNotification<
    ID extends DirectusNotification<TSchema>['id'],
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>,
  >(
    id: ID,
    query?: TQuery,
  ): SDKReturn<ReadNotificationOutput<TSchema, TQuery>> {
    return await client.request(sdkReadNotification(id, query))
  }

  /**
   * List an existing notification by primary id.
   *
   * @param id The primary id of the dashboard.
   * @param params query parameters, useAsyncData options and payload key.
   *
   * @returns Returns the requested notification object.
   *
   * @throws Will throw if id is empty.
   */
  async function readAsyncNotification<
    ID extends DirectusNotification<TSchema>['id'],
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>,
  >(
    id: MaybeRefOrGetter<ID>,
    params?: ReadAsyncOptionsWithQuery<SDKReturn<ReadNotificationOutput<TSchema, TQuery>>, TQuery>,
  ): ReadAsyncDataReturn<SDKReturn<ReadNotificationOutput<TSchema, TQuery>>> {
    const { key, query, ..._params } = params ?? {}
    const _key = computed(() => {
      return key ?? 'D_' + hash(['readAsyncNotification', toValue(id), toValue(query)])
    })

    return await useAsyncData(_key.value, () => readNotification(toValue(id), reactive(query ?? {})), _params)
  }

  /**
   * List all notifications that exist in Directus.
   *
   * @param query The query parameters.
   *
   * @returns An array of up to limit notification objects. If no items are available, data will be an empty array.
   */
  async function readNotifications<
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>,
  >(
    query?: TQuery,
  ): SDKReturn<ReadNotificationOutput<TSchema, TQuery>[]> {
    return await client.request(sdkReadNotifications(query))
  }

  /**
   * List all notifications that exist in Directus.
   *
   * @param params query parameters, useAsyncData options and payload key.
   *
   * @returns An array of up to limit notification objects. If no items are available, data will be an empty array.
   */
  async function readAsyncNotifications<
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>,
  >(
    params?: ReadAsyncOptionsWithQuery<SDKReturn<ReadNotificationOutput<TSchema, TQuery>[]>, TQuery>,
  ): ReadAsyncDataReturn<SDKReturn<ReadNotificationOutput<TSchema, TQuery>[]>> {
    const { key, query, ..._params } = params ?? {}
    const _key = computed(() => {
      return key ?? 'D_' + hash(['readAsyncNotifications', toValue(query)])
    })

    return await useAsyncData(_key.value, () => readNotifications(reactive(query ?? {})), _params)
  }

  /**
   * Update an existing notification.
   *
   * @param id The primary id of the notification.
   * @param item
   * @param query
   *
   * @returns Returns the notification object for the updated notification.
   *
   * @throws Will throw if id is empty.
   */
  async function updateNotification<
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>,
  >(
    id: DirectusNotification<TSchema>['id'],
    item: Partial<DirectusNotification<TSchema>>,
    query?: TQuery,
  ): SDKReturn<UpdateNotificationOutput<TSchema, TQuery>> {
    return await client.request(sdkUpdateNotification(id, item, query))
  }

  /**
   * Update multiple existing notifications.
   *
   * @param ids The primary ids of the notifications.
   * @param item
   * @param query
   *
   * @returns Returns the notification objects for the updated notifications.
   *
   * @throws Will throw if ids is empty.
   */
  async function updateNotifications<
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>,
  >(
    ids: DirectusNotification<TSchema>['id'][],
    item: Partial<DirectusNotification<TSchema>>,
    query?: TQuery,
  ): SDKReturn<UpdateNotificationOutput<TSchema, TQuery>[]> {
    return await client.request(sdkUpdateNotifications(ids, item, query))
  }

  /**
   * Delete an existing notification.
   *
   * @param id The primary id of the notifications.
   *
   * @returns Nothing.
   *
   * @throws Will throw if id is empty.
   */
  async function deleteNotification(
    id: DirectusNotification<TSchema>['id'],
  ): Promise<void> {
    return await client.request(sdkDeleteNotification(id))
  }

  /**
   * Delete multiple existing notifications.
   *
   * @param ids The primary ids of the notifications.
   *
   * @returns Nothing.
   *
   * @throws Will throw if ids is empty.
   */
  async function deleteNotifications(
    ids: DirectusNotification<TSchema>['id'][],
  ): Promise<void> {
    return await client.request(sdkDeleteNotifications(ids))
  }

  return {
    client,
    createNotification,
    createNotifications,
    readNotification,
    readAsyncNotification,
    readNotifications,
    readAsyncNotifications,
    updateNotification,
    updateNotifications,
    deleteNotification,
    deleteNotifications,
  }
}
