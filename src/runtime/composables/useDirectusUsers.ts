import type {
  DirectusClientConfig,
  DirectusUsersOptions,
  DirectusUser,
  Query
} from '../types'
import { type Ref, useState } from '#imports'
import {
  createUser as sdkCreateUser,
  createUsers as sdkCreateUsers,
  readMe as sdkReadMe,
  readUser as sdkReadUser,
  readUsers as sdkReadUsers,
  updateMe as sdkUpdateMe,
  updateUser as sdkUpdateUser,
  updateUsers as sdkUpdateUsers,
  deleteUser as sdkDeleteUser,
  deleteUsers as sdkDeleteUsers
} from '@directus/sdk'

export function useDirectusUsers <TSchema extends Object> (useStaticToken?: boolean | string) {
  const { userStateName } = useRuntimeConfig().public.directus.authConfig
  const { tokens } = useDirectusTokens()

  const client = (useStaticToken?: boolean | string) => {
    return useDirectusRest<TSchema>({
      useStaticToken
    })
  }

  async function createUser <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    userInfo: Partial<DirectusUser<TSchema>>,
    params?: DirectusUsersOptions<TQuery>
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkCreateUser(userInfo, params?.query))
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

  async function createUsers <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    userInfo: Partial<DirectusUser<TSchema>>[],
    params?: DirectusUsersOptions<TQuery>
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkCreateUsers(userInfo, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't create users", error.errors)
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
  > (
    params?: DirectusUsersOptions<TQuery>
  ) {
    if (tokens.value?.access_token) {
      try {
        return await client(params?.useStaticToken || useStaticToken).request(sdkReadMe(params?.query))
      } catch (error: any) {
        if (error && error.message) {
          // eslint-disable-next-line no-console
          console.error("Couldn't fetch authenticated user", error.errors)
        } else {
          // eslint-disable-next-line no-console
          console.error(error)
        }
      }
    }
  }

  async function readUser <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    id: DirectusUser<TSchema>["id"],
    params?: DirectusUsersOptions<TQuery>
  ) {
    if (tokens.value?.access_token) {
      try {
        return await client(params?.useStaticToken || useStaticToken).request(sdkReadUser(id, params?.query))
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

  async function readUsers <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    params?: DirectusUsersOptions<TQuery>
  ) {
    if (tokens.value?.access_token) {
      try {
        return await client(params?.useStaticToken || useStaticToken).request(sdkReadUsers(params?.query))
      } catch (error: any) {
        if (error && error.message) {
          // eslint-disable-next-line no-console
          console.error("Couldn't fetch users", error.errors)
        } else {
          // eslint-disable-next-line no-console
          console.error(error)
        }
      }
    }
  }

  async function updateMe <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    userInfo: Partial<DirectusUser<TSchema>>,
    params: DirectusUsersOptions<TQuery>
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkUpdateMe(userInfo, params.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't update authenticated user", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  async function updateUser <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    id: DirectusUser<TSchema>["id"],
    userInfo: Partial<DirectusUser<TSchema>>,
    params: DirectusUsersOptions<TQuery>
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkUpdateUser(id, userInfo, params.query))
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

  async function updateUsers <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    id: DirectusUser<TSchema>["id"][],
    userInfo: Partial<DirectusUser<TSchema>>,
    params: DirectusUsersOptions<TQuery>
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkUpdateUsers(id, userInfo, params.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't update users", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  async function deleteUser (
    id: DirectusUser<TSchema>["id"],
    params: DirectusClientConfig
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkDeleteUser(id))
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

  async function deleteUsers (
    id: DirectusUser<TSchema>["id"][],
    params: DirectusClientConfig
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkDeleteUsers(id))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't delete users", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  const user: Ref<Partial<DirectusUser<TSchema>> | undefined> = useState<Partial<DirectusUser<TSchema>> | undefined>(userStateName, () => undefined)

  return {
    createUser,
    createUsers,
    deleteUser,
    deleteUsers,
    readMe,
    readUser,
    readUsers,
    setUser,
    updateMe,
    updateUser,
    updateUsers,
    user
  }
}

