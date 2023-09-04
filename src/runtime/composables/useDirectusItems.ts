import type { IfAny, RegularCollections, SingletonCollections } from '../types'
import { useAsyncData, readItem, readItems } from '#imports'

export function useDirectusItems<TSchema extends Record<string, any>> () {
  const { accessToken } = useDirectusCookie()
  const directus = useDirectusRest<TSchema>({
    onRequest: (request) => {
      if (accessToken() && accessToken().value) {
        request.headers = {
          ...request.headers,
          authorization: `Bearer ${accessToken().value}`
        }
      }

      return request
    }
  })

  const getItems = async (collection: RegularCollections<TSchema>) => {
    const items = await directus.request(readItems(collection))

    return items
  }

  const getSingletonItem = async (collection: SingletonCollections<TSchema>) => {
    const item = await directus.request(readSingleton(collection))

    return item
  }

  return { getItems, getSingletonItem }
}
