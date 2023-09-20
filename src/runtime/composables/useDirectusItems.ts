import type {
  DirectusItemRequestOptions,
  RegularCollections,
  SingletonCollections
} from '../types'
import { useAsyncData, readItem, readItems } from '#imports'

export function useDirectusItems<TSchema extends object> () {
  const directus = useDirectusRest<TSchema>()

  /**
   * Get a single item from a collection.
   * @param collection The collection name to get the item from.
   * @param id The id of the item to get.
   * @param options The options to use when fetching the item.
   */
  const getItemById = async (
    collection: Ref<RegularCollections<TSchema>> | RegularCollections<TSchema>,
    id: Ref<string | number> | string | number,
    options?: DirectusItemRequestOptions
  ) => {
    const collectionName = toRef(collection) as Ref<RegularCollections<TSchema>>
    const itemId = toRef(id)
    const { data, pending, refresh, execute, error, status } = await useAsyncData(
      // TODO: add logic to randomize key if query is present
      options?.key ?? `${String(collectionName.value)}_${itemId.value}`,
      async () => {
        return await directus.request(readItem(collectionName.value, itemId.value, options?.query))
      }, options?.params
    )
    return { data, pending, refresh, execute, error, status }
  }

  /**
   * Get all the items from a collection.
   * @param collection The collection name to get the items from.
   * @param options The options to use when fetching the items.
   */
  const getItems = async (
    collection: Ref<RegularCollections<TSchema>> | RegularCollections<TSchema>,
    options?: DirectusItemRequestOptions
  ) => {
    const collectionName = toRef(collection) as Ref<RegularCollections<TSchema>>
    const { data, pending, refresh, execute, error, status } = await useAsyncData(
      // TODO: add logic to randomize key if query is present
      options?.key ?? String(collectionName.value),
      async () => await directus.request(readItems(collectionName.value, options?.query)), options?.params
    )
    return { data, pending, refresh, execute, error, status }
  }
  /**
   * Get the item from a collection marked as Singleton.
   * @param collection The collection name to get the items from.
   * @param options The options to use when fetching the items.
   */
  const getSingletonItem = async (
    collection: Ref<SingletonCollections<TSchema>> | SingletonCollections<TSchema>,
    options?: DirectusItemRequestOptions
  ) => {
    const collectionName = toRef(collection) as Ref<SingletonCollections<TSchema>>
    const { data, pending, refresh, execute, error, status } = await useAsyncData(
      // TODO: add logic to randomize key if query is present
      options?.key ?? String(collectionName.value),
      async () => await directus.request(readSingleton(collectionName.value, options?.query)), options?.params
    )
    return { data, pending, refresh, execute, error, status }
  }

  return {
    getItemById,
    getItems,
    getSingletonItem
  }
}
