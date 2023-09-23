import type {
  AuthenticationData,
  AuthenticationStorage,
  DirectusUser,
  LoginOptions
} from '../types'
import { defu } from 'defu'
import { readMe } from '#imports'

/**
 * This expands the default Directus storage implementation for authenticated data. It adds a `store` named export for direct access within the Nuxt app using `useState` under the hood.
 *
 * @returns Directus SDK native AuthenticationStorage functions
 * @returns `store` for direct access to the stored data
 */
export const useDirectusAuthStorage = (): AuthenticationStorage & { store: Ref<AuthenticationData | null> } => {
  const store: Ref<AuthenticationData | null> = useState('directus.auth')

  return {
    get: () => store.value,
    set: (value: AuthenticationData | null) => {
      store.value = value
    },
    store
  }
}

export function useDirectusAuth<T extends Object> () {
  const { autoRefresh } = useRuntimeConfig().public.directus
  const client = useDirectus<T>().with(authentication(
    'cookie', {
      autoRefresh,
      credentials: 'include',
      storage: useDirectusAuthStorage()
    })).with(rest({credentials: 'include'}))

  const user = useDirectusUser()
  const { store } = useDirectusAuthStorage()

  const setUser = <T extends Object>(value: DirectusUser<T>) => {
    user.value = value
  }

  const fetchUser = async () => {
    if (store.value?.access_token) {
      try {
        const res = await client.request(readMe())
        // TODO: fix types for custom fields in `directus_users`
        setUser(res as DirectusUser<T>)
      } catch (error: any) {
        if (error && error.message) {
          // eslint-disable-next-line no-console
          console.error("Couldn't fetch user", error.errors)
          throw error.errors
        } else {
          // eslint-disable-next-line no-console
          console.error(error)
          throw error
        }
      }
    }
    return user
  }

  async function login (identifier: string, password: string, options?: LoginOptions): Promise<AuthenticationData> {
    try {
      const defaultOptions = {
        mode: 'cookie'
      }
      const params = defu(options, defaultOptions) as LoginOptions

      const authResponse = await client.login(identifier, password, params)
      fetchUser()

      return {
        access_token: authResponse.access_token,
        refresh_token: authResponse.refresh_token,
        expires_at: authResponse.expires_at,
        expires: authResponse.expires
      }
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't login user", error.errors)
        throw error.errors
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
        throw error
      }
    }
  }

  async function refreshTokens (): Promise<AuthenticationData> {
    try {
      const authResponse = await client.refresh()
      fetchUser()

      return {
        access_token: authResponse.access_token,
        refresh_token: authResponse.refresh_token,
        expires_at: authResponse.expires_at,
        expires: authResponse.expires
      }
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't refresh tokens", error.errors)
        throw error.errors
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
        throw error
      }
    }
  }

  const logout = async () => {
    try {
      await client.logout()
      user.value = null
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't logut user", error.errors)
        throw error.errors
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
        throw error
      }
    }
  }

  return {
    client,
    user,
    store,
    setUser,
    fetchUser,
    login,
    refreshTokens,
    logout
  }
}
