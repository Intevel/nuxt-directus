import type {
  DirectusUserFetch,
  DirectusUserInfo,
  DirectusDeleteUser,
  DirectusUser,
  Query
} from '../types'
import { type Ref, useState } from '#imports'
import {
  createUser as sdkCreateUser,
  readMe as sdkReadMe,
  updateMe as sdkUpdateMe,
  deleteUser as sdkDeleteUser
} from '@directus/sdk'

export function useDirectusUser <TSchema extends Object> (useStaticToken?: boolean | string) {
  const { userStateName } = useRuntimeConfig().public.directus.authConfig
  const { tokens } = useDirectusTokens()

  const client = (useStaticToken?: boolean | string) => {
    return useDirectusRest<TSchema>({
      useStaticToken
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

  function setUser (value: Partial<DirectusUser<TSchema>> | undefined) {
    user.value = value
  }

  async function readMe <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (params?: DirectusUserFetch<TSchema, TQuery>) {
    if (tokens.value?.access_token) {
      try {
        return await client(params?.useStaticToken || useStaticToken).request(sdkReadMe())
      } catch (error: any) {
        if (error && error.message) {
          // eslint-disable-next-line no-console
          console.error("Couldn't fetch user", error.errors)
        } else {
          // eslint-disable-next-line no-console
          console.error(error)
        }
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

  const user: Ref<Partial<DirectusUser<TSchema>> | undefined> = useState<Partial<DirectusUser<TSchema>> | undefined>(userStateName, () => undefined)

  return {
    createUser,
    readMe,
    updateMe,
    deleteUser,
    setUser,
    user
  }
}

