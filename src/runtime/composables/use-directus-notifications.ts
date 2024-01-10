import { hash } from 'ohash'
import {
  createNotification as sdkCreateNotification,
  createNotifications as sdkCreateNotifications,
  readNotification as sdkReadNotification,
  readNotifications as sdkReadNotifications,
  updateNotification as sdkUpdateNotification,
  updateNotifications as sdkUpdateNotifications,
  deleteNotification as sdkDeleteNotification,
  deleteNotifications as sdkDeleteNotifications
} from '@directus/sdk'
import type {
  DirectusRestConfig,
  DirectusNotification,
  DirectusNotificationsOptions,
  DirectusNotificationsOptionsAsyncData,
  Query
} from '../types'
import { useAsyncData, computed, toRef, unref } from '#imports'

export function useDirectusNotifications<TSchema extends object> (config?: Partial<DirectusRestConfig>) {
  const client = useDirectusRest<TSchema>(config)

  /**
   * Create a new notification.
   *
   * @param item The notification to create.
   * @param query Optional return data query.
   *
   * @returns Returns the notification object for the created notification.
   */
  async function createNotification <
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>
  > (
    item: Partial<DirectusNotification<TSchema>>,
    params?: DirectusNotificationsOptions<TQuery>
  ) {
    try {
      return await client.request(sdkCreateNotification(item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't create notification.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * Create multiple new notifications.
   *
   * @param items The notifications to create.
   * @param query Optional return data query.
   *
   * @returns Returns the notification object for the created notification.
   */
  async function createNotifications <
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>
  > (
    item: Partial<DirectusNotification<TSchema>>[],
    params?: DirectusNotificationsOptions<TQuery>
  ) {
    try {
      return await client.request(sdkCreateNotifications(item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't create notifications.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * List an existing notification by primary key.
   *
   * @param key The primary key of the dashboard.
   * @param query The query parameters.
   *
   * @returns Returns the requested notification object.
   *
   * @throws Will throw if key is empty.
   */
  async function readNotification <
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>
  > (
    id: DirectusNotification<TSchema>['id'] | Ref<DirectusNotification<TSchema>['id']>,
    params?: DirectusNotificationsOptionsAsyncData<TQuery>
  ) {
    const idRef = toRef(id) as Ref<DirectusNotification<TSchema>['id']>
    const key = computed(() => {
      return hash([
        'readNotification',
        unref(idRef),
        params?.toString()
      ])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      () => client.request(sdkReadNotification(idRef.value, params?.query)),
      params?.params
    )
  }

  /**
   * List all notifications that exist in Directus.
   *
   * @param query The query parameters.
   *
   * @returns An array of up to limit notification objects. If no items are available, data will be an empty array.
   */
  async function readNotifications <
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>
  > (
    params?: DirectusNotificationsOptionsAsyncData<TQuery>
  ) {
    const key = computed(() => {
      return hash([
        'readNotifications',
        params?.toString()
      ])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      () => client.request(sdkReadNotifications(params?.query)),
      params?.params
    )
  }

  /**
   * Update an existing notification.
   *
   * @param key The primary key of the notification.
   * @param item
   * @param query
   *
   * @returns Returns the notification object for the updated notification.
   *
   * @throws Will throw if key is empty.
   */
  async function updateNotification <
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>
  > (
    id: DirectusNotification<TSchema>['id'],
    item: Partial<DirectusNotification<TSchema>>,
    params?: DirectusNotificationsOptions<TQuery>
  ) {
    try {
      return await client.request(sdkUpdateNotification(id, item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't read notification.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * Update multiple existing notifications.
   *
   * @param keys The primary keys of the notifications.
   * @param item
   * @param query
   *
   * @returns Returns the notification objects for the updated notifications.
   *
   * @throws Will throw if keys is empty.
   */
  async function updateNotifications <
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>
  > (
    id: DirectusNotification<TSchema>['id'][],
    item: Partial<DirectusNotification<TSchema>>,
    params?: DirectusNotificationsOptions<TQuery>
  ) {
    try {
      return await client.request(sdkUpdateNotifications(id, item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't read notification.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * Delete an existing notification.
   *
   * @param key The primary key of the notifications.
   *
   * @returns Nothing.
   *
   * @throws Will throw if key is empty.
   */
  async function deleteNotification (
    id: DirectusNotification<TSchema>['id']
  ) {
    try {
      return await client.request(sdkDeleteNotification(id))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't read notification.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * Delete multiple existing notifications.
   *
   * @param keys The primary keys of the notifications.
   *
   * @returns Nothing.
   *
   * @throws Will throw if keys is empty.
   */
  async function deleteNotifications (
    id: DirectusNotification<TSchema>['id'][]
  ) {
    try {
      return await client.request(sdkDeleteNotifications(id))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't read notification.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  return {
    client,
    createNotification,
    createNotifications,
    readNotification,
    readNotifications,
    updateNotification,
    updateNotifications,
    deleteNotification,
    deleteNotifications
  }
}
