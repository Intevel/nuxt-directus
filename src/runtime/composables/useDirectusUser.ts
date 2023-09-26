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

export function useDirectusUser <TSchema extends Object> () {

  async function createUser <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (params: DirectusUserInfo<TSchema, TQuery>) {
    const createUserClient = useDirectusRest<TSchema>({
      staticToken: params?.useStaticToken,
      credentials: 'include'
    })

    try {
      return await createUserClient.request(sdkCreateUser(params.userInfo, params.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't create user", error.errors)
        throw error.errors
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
        throw error
      }
    }
  }

  async function updateMe <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (params: DirectusUserInfo<TSchema, TQuery>) {
    const createUserClient = useDirectusRest<TSchema>({
      staticToken: params?.useStaticToken,
      credentials: 'include'
    })

    try {
      return await createUserClient.request(sdkUpdateMe(params.userInfo, params.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't update user", error.errors)
        throw error.errors
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
        throw error
      }
    }
  }

  async function deleteUser (params: DirectusDeleteUser<TSchema>) {
    const createUserClient = useDirectusRest<TSchema>({
      staticToken: params?.useStaticToken,
      credentials: 'include'
    })

    try {
      return await createUserClient.request(sdkDeleteUser(params.key))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't delete user", error.errors)
        throw error.errors
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
        throw error
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

