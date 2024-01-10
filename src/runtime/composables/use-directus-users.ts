import { defu } from 'defu'
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
  DirectusRestConfig,
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

export function useDirectusUsers <TSchema extends Object> (config?: Partial<DirectusRestConfig>) {
  const { userStateName } = useRuntimeConfig().public.directus.authConfig

  const defaultConfig: Partial<DirectusRestConfig> = {
    useStaticToken: false
  }
  const client = useDirectusRest<TSchema>(defu(config, defaultConfig))
  const { tokens } = useDirectusTokens(config?.useStaticToken ?? defaultConfig.useStaticToken)

  /**
   * Create a new user.
   *
   * @param userInfo The user to create.
   * @param query Optional return data query.
   *
   * @returns Returns the user object for the created user.
   */
  async function createUser <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    userInfo: Partial<DirectusUser<TSchema>>,
    params?: DirectusUsersOptions<TQuery>
  ) {
    try {
      return await client.request(sdkCreateUser(userInfo, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't create user.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * Create multiple new users.
   *
   * @param userInfo The user to create.
   * @param query Optional return data query.
   *
   * @returns Returns the user objects for the created users.
   */
  async function createUsers <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    userInfo: Partial<DirectusUser<TSchema>>[],
    params?: DirectusUsersOptions<TQuery>
  ) {
    try {
      return await client.request(sdkCreateUsers(userInfo, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't create users.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  function setUser (value: Partial<DirectusUser<TSchema>> | undefined) {
    user.value = value
  }

  /**
   * Retrieve the currently authenticated user.
   *
   * @param query The query parameters.
   *
   * @returns Returns the user object for the currently authenticated user.
   */
  async function readMe <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    params?: DirectusUsersOptions<TQuery> & { updateState?: boolean }
  ) {
    if (tokens.value?.access_token) {
      try {
        const userData = await client.request(sdkReadMe(params?.query))

        if (userData && params?.updateState !== false) {
          setUser(userData as Partial<DirectusUser<TSchema>>)
        }

        return userData
      } catch (error: any) {
        if (error && error.message) {
          console.error("Couldn't fetch authenticated user.", error.message)
        } else {
          console.error(error)
        }
      }
    }
  }

  /**
   * List an existing user by primary key.
   *
   * @param key The primary key of the user.
   * @param query The query parameters.
   *
   * @returns Returns the requested user object.
   *
   * @throws Will throw if key is empty.
   */
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
      () => client.request(sdkReadUser(idRef.value, params?.query)),
      params?.params
    )
  }

  /**
   * List all users that exist in Directus.
   *
   * @param query The query parameters.
   *
   * @returns An array of up to limit user objects. If no items are available, data will be an empty array.
   */
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
      () => client.request(sdkReadUsers(params?.query)),
      params?.params
    )
  }

  /**
   * Update the authenticated user.
   *
   * @param item The user data to update.
   * @param query Optional return data query.
   *
   * @returns Returns the updated user object for the authenticated user.
   */
  async function updateMe <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    userInfo: Partial<DirectusUser<TSchema>>,
    params: DirectusUsersOptions<TQuery> & { updateState?: boolean }
  ) {
    try {
      const userData = await client.request(sdkUpdateMe(userInfo, params.query))

      if (userData && params?.updateState !== false) {
        setUser(userData as Partial<DirectusUser<TSchema>>)
      }

      return userData
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update authenticated user.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * Update an existing user.
   *
   * @param key The primary key of the user.
   * @param item The user data to update.
   * @param query Optional return data query.
   *
   * @returns Returns the user object for the updated user.
   *
   * @throws Will throw if key is empty.
   */
  async function updateUser <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    id: DirectusUser<TSchema>['id'],
    userInfo: Partial<DirectusUser<TSchema>>,
    params: DirectusUsersOptions<TQuery>
  ) {
    try {
      return await client.request(sdkUpdateUser(id, userInfo, params.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update user.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * Update multiple existing users.
   *
   * @param keys The primary key of the users.
   * @param item The user data to update.
   * @param query Optional return data query.
   *
   * @returns Returns the user objects for the updated users.
   *
   * @throws Will throw if keys is empty.
   */
  async function updateUsers <
    TQuery extends Query<TSchema, DirectusUser<TSchema>>
  > (
    id: DirectusUser<TSchema>['id'][],
    userInfo: Partial<DirectusUser<TSchema>>,
    params: DirectusUsersOptions<TQuery>
  ) {
    try {
      return await client.request(sdkUpdateUsers(id, userInfo, params.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update users.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * Delete an existing user.
   *
   * @param key The primary key of the user.
   *
   * @returns Nothing.
   *
   * @throws Will throw if key is empty.
   */
  async function deleteUser (
    id: DirectusUser<TSchema>['id']
  ) {
    try {
      return await client.request(sdkDeleteUser(id))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't delete user.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * Delete multiple existing users.
   *
   * @param keys The primary key of the users.
   *
   * @returns Nothing.
   *
   * @throws Will throw if keys is empty.
   */
  async function deleteUsers (
    id: DirectusUser<TSchema>['id'][]
  ) {
    try {
      return await client.request(sdkDeleteUsers(id))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't delete users.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  const user = useState<Partial<DirectusUser<TSchema>> | undefined>(userStateName, () => undefined)

  return {
    client,
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
