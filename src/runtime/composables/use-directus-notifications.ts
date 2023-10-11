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
  DirectusClientConfig,
  DirectusNotification,
  DirectusNotificationsOptions,
  DirectusNotificationsOptionsAsyncData,
  Query
} from '../types'
import { useAsyncData, computed, toRef, unref } from '#imports'

export function useDirectusNotifications<TSchema extends object> (useStaticToken?: boolean | string) {
  const client = (useStaticToken?: boolean | string) => {
    return useDirectusRest<TSchema>({
      useStaticToken
    })
  }

  async function createNotification <
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>
  > (
    item: Partial<DirectusNotification<TSchema>>,
    params?: DirectusNotificationsOptions<TQuery>
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkCreateNotification(item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't create notification", error.errors)
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
      return await client(params?.useStaticToken || useStaticToken).request(sdkCreateNotifications(item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't create notifications", error.errors)
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
      async () => await client(params?.useStaticToken || useStaticToken).request(sdkReadNotification(idRef.value, params?.query)), params?.params
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
      async () => await client(params?.useStaticToken || useStaticToken).request(sdkReadNotifications(params?.query)), params?.params
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
      return await client(params?.useStaticToken || useStaticToken).request(sdkUpdateNotification(id, item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't read notification", error.errors)
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
      return await client(params?.useStaticToken || useStaticToken).request(sdkUpdateNotifications(id, item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't read notification", error.errors)
      } else {
        console.error(error)
      }
    }
  }

  async function deleteNotification (
    id: DirectusNotification<TSchema>['id'],
    params?: DirectusClientConfig
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkDeleteNotification(id))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't read notification", error.errors)
      } else {
        console.error(error)
      }
    }
  }

  async function deleteNotifications (
    id: DirectusNotification<TSchema>['id'][],
    params?: DirectusClientConfig
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkDeleteNotifications(id))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't read notification", error.errors)
      } else {
        console.error(error)
      }
    }
  }

  return {
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
