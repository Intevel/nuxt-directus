import type {
  DirectusItemRequestOptions,
  RegularCollections,
  SingletonCollections
} from '../types'
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

  /**
   * Get a single item from a collection.
   * @param collection The collection name to get the item from.
   * @param id The id of the item to get.
   * @param options The options to use when fetching the item.
   */
  const getItemById = async (
    collection: RegularCollections<TSchema>,
    id: string | number,
    options?: DirectusItemRequestOptions
  ) => {
    if (!id) { throw new Error('You must provide an id to get an item.') }
    const { data, pending, error, refresh } = await useAsyncData(
      options?.key ?? `${String(collection)}_${id}`,
      async () => await directus.request(readItem(collection, id, options?.query))
    )
    return { data, pending, error, refresh }
  }

  /**
   * Get all the items from a collection.
   * @param collection The collection name to get the items from.
   * @param options The options to use when fetching the items.
   */
  const getItems = async (
    collection: RegularCollections<TSchema>,
    options?: DirectusItemRequestOptions
  ) => {
    const { data, pending, error, refresh } = await useAsyncData(
      options?.key ?? String(collection),
      async () => await directus.request(readItems(collection, options?.query))
    )
    return { data, pending, error, refresh }
  }

  /**
   * Get the item from a collection marked as Singleton.
   * @param collection The collection name to get the items from.
   * @param options The options to use when fetching the items.
   */
  const getSingletonItem = async (
    collection: SingletonCollections<TSchema>,
    options?: DirectusItemRequestOptions
  ) => {
    const { data, pending, error, refresh } = await useAsyncData(
      options?.key ?? String(collection),
      async () => await directus.request(readSingleton(collection, options?.query))
    )
    return { data, pending, error, refresh }
  }

  return {
    getItemById,
    getItems,
    getSingletonItem
  }
}
