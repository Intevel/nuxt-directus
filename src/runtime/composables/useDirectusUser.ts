import type {
  DirectusDeleteUser,
  DirectusUserInfo,
  DirectusUser,
  Query
} from '../types'
import { type Ref, useState } from '#imports'
import {
  createUser as sdkCreateUser,
  deleteUser as sdkDeleteUser,
  updateMe as sdkUpdateMe
} from '@directus/sdk'

export function useDirectusUser <TSchema extends Object> (useStaticToken?: boolean | string) {
  const client = (useStaticToken?: boolean | string) => {
    return useDirectusRest<TSchema>({
      useStaticToken,
      credentials: 'include'
    })
  }

  async function createUser <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (params: DirectusUserInfo<TSchema, TQuery>) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkCreateUser(params.userInfo, params.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't create user", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  async function updateMe <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (params: DirectusUserInfo<TSchema, TQuery>) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkUpdateMe(params.userInfo, params.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't update user", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  async function deleteUser (params: DirectusDeleteUser<TSchema>) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkDeleteUser(params.id))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't delete user", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  const user: Ref<DirectusUser<TSchema> | null> = useState<DirectusUser<TSchema> | null>('directus.user', () => null)

  return {
    createUser,
    deleteUser,
    updateMe,
    user
  }
}

