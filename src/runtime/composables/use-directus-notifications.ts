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
  DirectusNotification,
  Query
} from '@directus/sdk'
import type {
  DirectusRestConfig,
  DirectusNotificationsOptions
} from '../types'
import { recursiveUnref } from './internal-utils/recursive-unref'
import { computed, ref, useDirectusRest, useNuxtApp, useNuxtData } from '#imports'

export function useDirectusNotifications<TSchema extends object = any> (config?: Partial<DirectusRestConfig>) {
  const client = useDirectusRest<TSchema>(config)
  const { runWithContext } = useNuxtApp()

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
    query?: TQuery
  ) {
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
  async function createNotifications <
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>
  > (
    item: Partial<DirectusNotification<TSchema>>[],
    query?: DirectusNotificationsOptions<TQuery>
  ) {
    return await client.request(sdkCreateNotifications(item, query))
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
    id: DirectusNotification<TSchema>['id'],
    _query?: DirectusNotificationsOptions<TQuery>
  ) {
    const { nuxtData, ...query } = _query ?? {}
    const key = computed(() => {
      if (typeof nuxtData === 'string') {
        return nuxtData
      } else {
        return 'D_' + hash(['readNotification', id, recursiveUnref(query)])
      }
    })
    const promise = runWithContext(() => client.request(sdkReadNotification(id, query)))

    const { data } = nuxtData !== false
      ? useNuxtData<Awaited<typeof promise>>(key.value)
      : { data: ref<Awaited<typeof promise>>() }

    if (data.value) {
      return data.value
    } else {
      // @ts-ignore TODO: check why Awaited is creating problems
      data.value = await promise.catch((e: any) => {
        if (e && e.message) {
          console.error("Couldn't read notification:", e.message)
          return null
        } else {
          console.error(e)
          return null
        }
      })
      return data.value
    }
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
    _query?: DirectusNotificationsOptions<TQuery>
  ) {
    const { nuxtData, ...query } = _query ?? {}
    const key = computed(() => {
      if (typeof nuxtData === 'string') {
        return nuxtData
      } else {
        return 'D_' + hash(['readNotifications', recursiveUnref(query)])
      }
    })
    const promise = runWithContext(() => client.request(sdkReadNotifications(query)))

    const { data } = nuxtData !== false
      ? useNuxtData<Awaited<typeof promise>>(key.value)
      : { data: ref<Awaited<typeof promise>>() }

    if (data.value) {
      return data.value
    } else {
      data.value = await promise.catch((e: any) => {
        if (e && e.message) {
          console.error("Couldn't read notifications:", e.message)
          return null
        } else {
          console.error(e)
          return null
        }
      })
      return data.value
    }
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
    query?: TQuery
  ) {
    return await client.request(sdkUpdateNotification(id, item, query))
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
    query?: TQuery
  ) {
    return await client.request(sdkUpdateNotifications(id, item, query))
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
    return await client.request(sdkDeleteNotification(id))
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
    return await client.request(sdkDeleteNotifications(id))
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
