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
  DirectusUser,
  Query
} from '@directus/sdk'
import type {
  DirectusRestConfig,
  DirectusUsersOptions
} from '../types'
import { recursiveUnref } from './internal-utils/recursive-unref'
import {
  computed,
  ref,
  useDirectusRest,
  useDirectusTokens,
  useNuxtApp,
  useNuxtData,
  useRuntimeConfig,
  useState
} from '#imports'

export function useDirectusUsers <TSchema extends object> (config?: Partial<DirectusRestConfig>) {
  const {
    authConfig: {
      userStateName
    },
    moduleConfig: {
      readMeQuery
    }
  } = useRuntimeConfig().public.directus
  const { runWithContext } = useNuxtApp()

  const defaultConfig: Partial<DirectusRestConfig> = {
    staticToken: false
  }
  const client = useDirectusRest<TSchema>(defu(config, defaultConfig))
  const { tokens } = useDirectusTokens(config?.staticToken ?? defaultConfig.staticToken)

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
    query?: TQuery
  ) {
    try {
      return await client.request(sdkCreateUser(userInfo, query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't create user:", error.message)
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
    query?: TQuery
  ) {
    try {
      return await client.request(sdkCreateUsers(userInfo, query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't create users:", error.message)
      } else {
        console.error(error)
      }
    }
  }

  function setUser (value: Partial<DirectusUser<TSchema>> | undefined): Promise<void> {
    return new Promise((resolve) => {
      user.value = value
      resolve()
    })
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
    _query?: TQuery & { updateState?: boolean }
  ) {
    if (tokens.value?.access_token) {
      const { updateState, ...query } = defu(_query, readMeQuery)
      try {
        const userData = await client.request(sdkReadMe(query))

        if (userData && updateState !== false) {
          await setUser(userData as Partial<DirectusUser<TSchema>>)
        }

        return userData
      } catch (error: any) {
        if (error && error.message) {
          console.error("Couldn't fetch authenticated user:", error.message)
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
    id: DirectusUser<TSchema>['id'],
    _query?: DirectusUsersOptions<TQuery>
  ) {
    const { nuxtData, ...query } = _query ?? {}
    const key = computed(() => {
      if (typeof nuxtData === 'string') {
        return nuxtData
      } else {
        return 'D_' + hash(['readUser', id, recursiveUnref(query)])
      }
    })
    const promise = runWithContext(() => client.request(sdkReadUser(id, query)))

    const { data } = nuxtData !== false
      ? useNuxtData<Awaited<typeof promise>>(key.value)
      : { data: ref<Awaited<typeof promise>>() }

    if (data.value) {
      return data.value
    } else {
      // @ts-ignore TODO: check why Awaited is creating problems
      data.value = await promise.catch((error: any) => {
        if (error && error.message) {
          console.error("Couldn't read user:", error.message)
        } else {
          console.error(error)
        }
      })
      return data.value
    }
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
    _query?: DirectusUsersOptions<TQuery>
  ) {
    const { nuxtData, ...query } = _query ?? {}
    const key = computed(() => {
      if (typeof nuxtData === 'string') {
        return nuxtData
      } else {
        return 'D_' + hash(['readUsers', recursiveUnref(query)])
      }
    })
    const promise = runWithContext(() => client.request(sdkReadUsers(query)))

    const { data } = nuxtData !== false
      ? useNuxtData<void | Awaited<typeof promise>>(key.value)
      : { data: ref<void | Awaited<typeof promise>>() }

    if (data.value) {
      return data.value
    } else {
      data.value = await promise.catch((error: any) => {
        if (error && error.message) {
          console.error("Couldn't read users:", error.message)
        } else {
          console.error(error)
        }
      })
      return data.value
    }
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
    _query: TQuery & { updateState?: boolean }
  ) {
    try {
      const { updateState, ...query } = _query
      const userData = await client.request(sdkUpdateMe(userInfo, query))

      if (userData && updateState !== false) {
        setUser(userData as Partial<DirectusUser<TSchema>>)
      }

      return userData
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update authenticated user:", error.message)
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
    query: TQuery
  ) {
    try {
      return await client.request(sdkUpdateUser(id, userInfo, query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update user:", error.message)
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
    query: TQuery
  ) {
    try {
      return await client.request(sdkUpdateUsers(id, userInfo, query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update users:", error.message)
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
        console.error("Couldn't delete user:", error.message)
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
        console.error("Couldn't delete users:", error.message)
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
    tokens,
    updateMe,
    updateUser,
    updateUsers,
    user
  }
}
