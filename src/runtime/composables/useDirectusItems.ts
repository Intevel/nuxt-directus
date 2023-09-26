import type {
  AsyncDataDirectusReqItem,
  CollectionType,
  DirectusReqOptions,
  DirectusReqItemOptions,
  RegularCollections,
  SingletonCollections,
  Query,
  UnpackList
} from '../types'
import { useAsyncData } from '#imports'
import {
  createItem as sdkCreateItem,
  createItems as sdkCreateItems,
  readItem as sdkReadItem,
  readItems as sdkReadItems,
  readSingleton as sdkReadSingleton,
  updateItem as sdkUpdateItem,
  updateItems as sdkUpdateItems,
  deleteItem as sdkDeleteItem,
  deleteItems as sdkDeleteItems
} from '@directus/sdk'

export function useDirectusItems<TSchema extends object> (useStaticToken?: boolean | string) {
  const client = (useStaticToken?: boolean | string) => {
    return useDirectusRest<TSchema>({
      useStaticToken,
      credentials: 'include'
    })
  }

  async function createItem <
    Collection extends keyof TSchema,
    Item extends Partial<UnpackList<TSchema[Collection]>>,
    TQuery extends Query<TSchema, TSchema[Collection]> | undefined
  > (
    collection: Ref<Collection> | Collection,
    item: Item,
    options?: DirectusReqItemOptions<TQuery>
  ) {
    const collectionName = toRef(collection) as Ref<Collection>
    const itemRef = toRef(item)
    return await client(options?.useStaticToken || useStaticToken)
      .request(sdkCreateItem(collectionName.value, itemRef.value, options?.query))
  }

  async function createItems <
    Collection extends keyof TSchema,
    Item extends Partial<UnpackList<TSchema[Collection]>>,
    TQuery extends Query<TSchema, TSchema[Collection]> | undefined
  > (
    collection: Ref<Collection> | Collection,
    items: Item,
    options?: DirectusReqItemOptions<TQuery>
  ) {
    const collectionName = toRef(collection) as Ref<Collection>
    const itemsRef = toRef(items)
    return await client(options?.useStaticToken || useStaticToken)
      .request(sdkCreateItems(collectionName.value, itemsRef.value, options?.query))
  }

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
    options?: AsyncDataDirectusReqItem<TSchema, TQuery>
  ) {
    const collectionName = toRef(collection) as Ref<Collection>
    const itemId = toRef(id)
    return await useAsyncData(
      // TODO: add logic to randomize key if query is present
      options?.key ?? `${String(collectionName.value)}_${itemId.value}`,
      async () => await client(options?.useStaticToken || useStaticToken)
        .request(sdkReadItem(collectionName.value, itemId.value, options?.query)), options?.params
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
    options?: AsyncDataDirectusReqItem<TSchema, TQuery>
  ) {
    const collectionName = toRef(collection) as Ref<Collection>
    return await useAsyncData(
      // TODO: add logic to randomize key if query is present
      options?.key ?? String(collectionName.value),
      async () => await client(options?.useStaticToken || useStaticToken)
        .request(sdkReadItems(collectionName.value, options?.query)), options?.params
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
    options?: AsyncDataDirectusReqItem<TSchema, TQuery>
  ) {
    const collectionName = toRef(collection) as Ref<Collection>
    return await useAsyncData(
      // TODO: add logic to randomize key if query is present
      options?.key ?? String(collectionName.value),
      async () => await client(options?.useStaticToken || useStaticToken)
        .request(sdkReadSingleton(collectionName.value, options?.query)), options?.params
    )
  }

  async function updateItem <
    Collection extends keyof TSchema,
    Item extends Partial<UnpackList<TSchema[Collection]>>,
    TQuery extends Query<TSchema, TSchema[Collection]>
  > (
    collection: Ref<Collection> | Collection,
    id: string | number,
    item: Item,
    options?: DirectusReqItemOptions<TQuery>
  ) {
    const collectionName = toRef(collection) as Ref<Collection>
    const itemId = toRef(id)
    const itemRef = toRef(item)
    return await client(options?.useStaticToken || useStaticToken)
      .request(sdkUpdateItem(collectionName.value, itemId.value, itemRef.value, options?.query))
  }

  async function updateItems <
    Collection extends keyof TSchema,
    Item extends Partial<UnpackList<TSchema[Collection]>>,
    TQuery extends Query<TSchema, TSchema[Collection]> | undefined
  > (
    collection: Ref<Collection> | Collection,
    id: string[] | number[],
    items: Item,
    options?: DirectusReqItemOptions<TQuery>
  ) {
    const collectionName = toRef(collection) as Ref<Collection>
    const itemId = toRef(id)
    const itemsRef = toRef(items)
    return await client(options?.useStaticToken || useStaticToken)
      .request(sdkUpdateItems(collectionName.value, itemId.value, itemsRef.value, options?.query))
  }

  async function deleteItem <
    Collection extends keyof TSchema,
    ID extends string | number
  > (
    collection: Ref<Collection> | Collection,
    id: ID,
    options?: DirectusReqOptions
  ) {
    const collectionName = toRef(collection) as Ref<Collection>
    const itemId = toRef(id) as Ref<ID>
    return await client(options?.useStaticToken || useStaticToken)
      .request(sdkDeleteItem(collectionName.value, itemId.value))
  }

  async function deleteItems <
    Collection extends keyof TSchema,
    TQuery extends Query<TSchema, TSchema[Collection]>,
    ID extends string[] | number[] | TQuery
  > (
    collection: Ref<Collection> | Collection,
    idOrQuery: Ref<ID> | ID,
    options?: DirectusReqItemOptions<TQuery>
  ) {
    const collectionName = toRef(collection) as Ref<Collection>
    const itemId = toRef(idOrQuery) as Ref<ID>
    return await client(options?.useStaticToken || useStaticToken)
      .request(sdkDeleteItems(collectionName.value, itemId.value))
  }

  return {
    createItem,
    createItems,
    readItem,
    readItems,
    readSingleton,
    updateItem,
    updateItems,
    deleteItem,
    deleteItems
  }
}
