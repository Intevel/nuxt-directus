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
