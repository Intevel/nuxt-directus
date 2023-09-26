import type {
  DirectusRegisterCredentials,
  DirectusUser
} from '../types'
import { type Ref, useState } from '#imports'
import {
  createUser as sdkCreateUser
} from '@directus/sdk'

export function useDirectusUser <TSchema extends Object> () {

  async function createUser (params: DirectusRegisterCredentials<TSchema>) {
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

  const user: Ref<DirectusUser<TSchema> | null> = useState<DirectusUser<TSchema> | null>('directus.user', () => null)

  return {
    createUser,
    user
  }
}

