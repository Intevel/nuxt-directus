import { hash } from 'ohash'
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
import type {
  DirectusClientConfig,
  DirectusUsersOptions,
  DirectusUsersOptionsAsyncData,
  DirectusUser,
  Query
} from '../types'
import {
  type Ref,
  useState,
  useAsyncData,
  computed,
  toRef,
  unref
} from '#imports'

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
        console.error("Couldn't create user.", error.message)
      } else {
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
        console.error("Couldn't create users.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  function setUser (value: Awaited<ReturnType<typeof readMe>> | Partial<DirectusUser<TSchema>> | undefined) {
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
          console.error("Couldn't fetch authenticated user.", error.message)
        } else {
          console.error(error)
        }
      }
    }
  }

  async function readUser <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    id: DirectusUser<TSchema>['id'] | Ref<DirectusUser<TSchema>['id']>,
    params?: DirectusUsersOptionsAsyncData<TQuery>
  ) {
    const idRef = toRef(id) as Ref<DirectusUser<TSchema>['id']>
    const key = computed(() => {
      return hash([
        'readUser',
        unref(idRef),
        params?.toString()
      ])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      async () => await client(params?.useStaticToken || useStaticToken).request(sdkReadUser(idRef.value, params?.query)), params?.params
    )
  }

  async function readUsers <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    params?: DirectusUsersOptionsAsyncData<TQuery>
  ) {
    const key = computed(() => {
      return hash([
        'readUsers',
        params?.toString()
      ])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      async () => await client(params?.useStaticToken || useStaticToken).request(sdkReadUsers(params?.query)), params?.params
    )
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
        console.error("Couldn't update authenticated user.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  async function updateUser <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    id: DirectusUser<TSchema>['id'],
    userInfo: Partial<DirectusUser<TSchema>>,
    params: DirectusUsersOptions<TQuery>
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkUpdateUser(id, userInfo, params.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update user.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  async function updateUsers <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    id: DirectusUser<TSchema>['id'][],
    userInfo: Partial<DirectusUser<TSchema>>,
    params: DirectusUsersOptions<TQuery>
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkUpdateUsers(id, userInfo, params.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update users.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  async function deleteUser (
    id: DirectusUser<TSchema>['id'],
    params: DirectusClientConfig
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkDeleteUser(id))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't delete user.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  async function deleteUsers (
    id: DirectusUser<TSchema>['id'][],
    params: DirectusClientConfig
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkDeleteUsers(id))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't delete users.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  const user: Ref<Awaited<ReturnType<typeof readMe>> | Partial<DirectusUser<TSchema>> | undefined> = useState<Awaited<ReturnType<typeof readMe>> | Partial<DirectusUser<TSchema>> | undefined>(userStateName, () => undefined)

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
