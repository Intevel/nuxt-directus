import type {
  DirectusRegularItemRequestOptions,
  DirectusSingletonItemRequestOptions,
  RegularCollections,
  SingletonCollections
} from '../types'
import { useAsyncData, readItem, readItems } from '#imports'

export function useDirectusItems<TSchema extends object> () {
  const client = useDirectusRest<TSchema>()

  /**
   * Get a single item from a collection.
   * @param collection The collection name to get the item from.
   * @param id The id of the item to get.
   * @param options The options to use when fetching the item.
   *
   * @returns data: returns an item object if a valid primary key was provided.
   * @returns pending: a boolean indicating whether the data is still being fetched.
   * @returns refresh/execute: a function that can be used to refresh the data returned by the handler function.
   * @returns error: an error object if the data fetching failed.
   * @returns status: a string indicating the status of the data request ("idle", "pending", "success", "error").
   */
  async function getItemById (
    collection: Ref<RegularCollections<TSchema>> | RegularCollections<TSchema>,
    id: Ref<string | number> | string | number,
    options?: DirectusRegularItemRequestOptions<TSchema>
  ) {
    const collectionName = toRef(collection) as Ref<RegularCollections<TSchema>>
    const itemId = toRef(id)
    return await useAsyncData(
      // TODO: add logic to randomize key if query is present
      options?.key ?? `${String(collectionName.value)}_${itemId.value}`,
      async () => await client.request(readItem(collectionName.value, itemId.value, options?.query)), options?.params
    )
  }

  /**
   * Get all the items from a collection.
   * @param collection The collection name to get the items from.
   * @param options The options to use when fetching the items.
   *
   * @returns data: an array of up to limit item objects. If no items are available, data will be an empty array.
   * @returns pending: a boolean indicating whether the data is still being fetched.
   * @returns refresh/execute: a function that can be used to refresh the data returned by the handler function.
   * @returns error: an error object if the data fetching failed.
   * @returns status: a string indicating the status of the data request ("idle", "pending", "success", "error").
   */
  async function getItems (
    collection: Ref<RegularCollections<TSchema>> | RegularCollections<TSchema>,
    options?: DirectusRegularItemRequestOptions<TSchema>
  ) {
    const collectionName = toRef(collection) as Ref<RegularCollections<TSchema>>
    return await useAsyncData(
      // TODO: add logic to randomize key if query is present
      options?.key ?? String(collectionName.value),
      async () => await client.request(readItems(collectionName.value, options?.query)), options?.params
    )
  }

  /**
   * Get the item from a collection marked as Singleton.
   * @param collection The collection name to get the items from.
   * @param options The options to use when fetching the items.
   *
   * @returns data: an item objects. If no items are available, data will be an empty object.
   * @returns pending: a boolean indicating whether the data is still being fetched.
   * @returns refresh/execute: a function that can be used to refresh the data returned by the handler function.
   * @returns error: an error object if the data fetching failed.
   * @returns status: a string indicating the status of the data request ("idle", "pending", "success", "error").
   */
  const getSingletonItem = async (
    collection: Ref<SingletonCollections<TSchema>> | SingletonCollections<TSchema>,
    options?: DirectusSingletonItemRequestOptions<TSchema>
  ) => {
    const collectionName = toRef(collection) as Ref<SingletonCollections<TSchema>>
    return await useAsyncData(
      // TODO: add logic to randomize key if query is present
      options?.key ?? String(collectionName.value),
      async () => await client.request(readSingleton(collectionName.value, options?.query)), options?.params
    )
  }

  return {
    getItemById,
    getItems,
    getSingletonItem
  }
}
