import type { 
  AuthenticationData,
  AuthenticationStorage
} from '../types'
import {
  type Ref,
  useState
} from '#imports'

/**
 * This expands the default Directus storage implementation for authenticated data. It adds a `store` named export for direct access within the Nuxt app using `useState` under the hood.
 *
 * @returns Directus SDK native AuthenticationStorage functions
 * @returns `store` for direct access to the stored data
 */
export const useDirectusTokens = (): AuthenticationStorage & { tokens: Ref<AuthenticationData | null> } => {
  const tokens: Ref<AuthenticationData | null> = useState('directus.auth')

  return {
    get: () => tokens.value,
    set: (value: AuthenticationData | null) => {
      tokens.value = value
    },
    tokens
  }
}