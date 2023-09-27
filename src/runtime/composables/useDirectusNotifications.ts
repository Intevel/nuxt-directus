import type {
  DirectusClientConfig,
  DirectusNotification,
  DirectusNotificationsOptions,
  Query
} from '../types'
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
        // eslint-disable-next-line no-console
        console.error("Couldn't create notification", error.errors)
      } else {
        // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
        console.error("Couldn't create notifications", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  async function readNotification <
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>
  > (
    id: DirectusNotification<TSchema>['id'],
    params?: DirectusNotificationsOptions<TQuery>
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkReadNotification(id, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't read notification", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  async function readNotifications <
    TQuery extends Query<TSchema, DirectusNotification<TSchema>>
  > (
    params?: DirectusNotificationsOptions<TQuery>
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkReadNotifications(params?.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't read notifications", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
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
        // eslint-disable-next-line no-console
        console.error("Couldn't read notification", error.errors)
      } else {
        // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
        console.error("Couldn't read notification", error.errors)
      } else {
        // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
        console.error("Couldn't read notification", error.errors)
      } else {
        // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
        console.error("Couldn't read notification", error.errors)
      } else {
        // eslint-disable-next-line no-console
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
