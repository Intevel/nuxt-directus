import type {
  CollectionType,
  DirectusRegularItemRequestOptions,
  DirectusSingletonItemRequestOptions,
  RegularCollections,
  SingletonCollections,
  Query
} from '../types'
import { useAsyncData } from '#imports'
import {
  readItem as sdkReadItem,
  readItems as sdkReadItems,
  readSingleton as sdkReadSingleton
} from '@directus/sdk'

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
  async function readItem <
    Collection extends RegularCollections<TSchema>,
    TQuery extends Query<TSchema, CollectionType<TSchema, Collection>>
  > (
    collection: Ref<Collection> | Collection,
    id: Ref<string | number> | string | number,
    options?: DirectusRegularItemRequestOptions<TSchema, TQuery>
  ) {
    const collectionName = toRef(collection) as Ref<Collection>
    const itemId = toRef(id)
    return await useAsyncData(
      // TODO: add logic to randomize key if query is present
      options?.key ?? `${String(collectionName.value)}_${itemId.value}`,
      async () => await client.request(sdkReadItem(collectionName.value, itemId.value, options?.query)), options?.params
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
  async function readItems <
    Collection extends RegularCollections<TSchema>,
    TQuery extends Query<TSchema, CollectionType<TSchema, Collection>>
  > (
    collection: Ref<Collection> | Collection,
    options?: DirectusRegularItemRequestOptions<TSchema, TQuery>
  ) {
    const collectionName = toRef(collection) as Ref<Collection>
    return await useAsyncData(
      // TODO: add logic to randomize key if query is present
      options?.key ?? String(collectionName.value),
      async () => await client.request(sdkReadItems(collectionName.value, options?.query)), options?.params
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
  async function readSingleton <
    Collection extends SingletonCollections<TSchema>,
    TQuery extends Query<TSchema, TSchema[Collection]>
  > (
    collection: Ref<Collection> | Collection,
    options?: DirectusSingletonItemRequestOptions<TSchema, TQuery>
  ) {
    const collectionName = toRef(collection) as Ref<Collection>
    return await useAsyncData(
      // TODO: add logic to randomize key if query is present
      options?.key ?? String(collectionName.value),
      async () => await client.request(sdkReadSingleton(collectionName.value, options?.query)), options?.params
    )
  }

  return {
    readItem,
    readItems,
    readSingleton
  }
}
