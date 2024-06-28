import { type MaybeRefOrGetter, computed, reactive, toValue } from 'vue'
import { hash } from 'ohash'
import {
  createItem as sdkCreateItem,
  createItems as sdkCreateItems,
  readItem as sdkReadItem,
  readItems as sdkReadItems,
  readSingleton as sdkReadSingleton,
  updateItem as sdkUpdateItem,
  updateItems as sdkUpdateItems,
  updateSingleton as sdkUpdateSingleton,
  deleteItem as sdkDeleteItem,
  deleteItems as sdkDeleteItems,
} from '@directus/sdk'
import type {
  CollectionType,
  Query,
  RegularCollections,
  SingletonCollections,
  UnpackList,
  CreateItemOutput,
  ReadItemOutput,
  ReadSingletonOutput,
  UpdateItemOutput,
  UpdateSingletonOutput,
} from '@directus/sdk'
import type {
  DirectusRestConfig,
  DirectusClients,
  ReadAsyncOptionsWithQuery,
  ReadAsyncDataReturn,
  SDKReturn,
} from '../types'
import { useAsyncData } from '#app'
import { useDirectusRest } from '#imports'

export function useDirectusItems<TSchema extends object = any>(config?: Partial<DirectusRestConfig>) {
  const client: DirectusClients.Rest<TSchema> = useDirectusRest<TSchema>(config)

  async function createItem<
    Collection extends keyof TSchema,
    Item extends Partial<UnpackList<TSchema[Collection]>>,
    TQuery extends Query<TSchema, TSchema[Collection]>,
  >(
    collection: Collection,
    item: Item,
    query?: TQuery,
  ): SDKReturn<CreateItemOutput<TSchema, Collection, TQuery>> {
    return await client.request(sdkCreateItem(collection, item, query))
  }

  /**
   * Create new items in the given collection.
   *
   * @param collection The collection of the item.
   * @param items The items to create.
   * @param query Optional return data query.
   *
   * @returns Returns the item objects of the item that were created.
   */
  async function createItems<
    Collection extends keyof TSchema,
    Item extends Partial<UnpackList<TSchema[Collection]>>[],
    TQuery extends Query<TSchema, TSchema[Collection]>,
  >(
    collection: Collection,
    items: Item,
    query?: TQuery,
  ): SDKReturn<CreateItemOutput<TSchema, Collection, TQuery>[]> {
    return await client.request(sdkCreateItems(collection, items, query))
  }

  /**
   * Get an item that exist in a particular Directus collection.
   *
   * @param collection The collection of the item.
   * @param id The primary id of the item.
   * @param query The query parameters.
   *
   * @returns Returns an item object if a valid primary id was provided.
   *
   * @throws Will throw if collection is a core collection.
   * @throws Will throw if collection is empty.
   * @throws Will throw if id is empty.
   */
  async function readItem<
    Collection extends RegularCollections<TSchema>,
    TQuery extends Query<TSchema, CollectionType<TSchema, Collection>>,
  >(
    collection: Collection,
    id: string | number,
    query?: TQuery,
  ): SDKReturn<ReadItemOutput<TSchema, Collection, TQuery>> {
    return await client.request(sdkReadItem(collection, id, query))
  }

  /**
   * Get an item that exist in a particular Directus collection.
   *
   * @param collection The collection of the item.
   * @param id The primary key of the item.
   * @param params query parameters, useAsyncData options and payload key.
   *
   * @returns Returns an item object if a valid primary id was provided.
   *
   * @throws Will throw if collection is a core collection.
   * @throws Will throw if collection is empty.
   * @throws Will throw if id is empty.
   */
  async function readAsyncItem<
    Collection extends RegularCollections<TSchema>,
    TQuery extends Query<TSchema, CollectionType<TSchema, Collection>>,
  >(
    collection: MaybeRefOrGetter<Collection>,
    id: MaybeRefOrGetter<string | number>,
    params?: ReadAsyncOptionsWithQuery<ReadAsyncDataReturn<SDKReturn<ReadItemOutput<TSchema, Collection, TQuery>>>, TQuery>,
  ): ReadAsyncDataReturn<SDKReturn<ReadItemOutput<TSchema, Collection, TQuery>>> {
    const { key, query, ..._params } = params ?? {}
    const _key = computed(() => {
      return key ?? 'D_' + hash(['readAsyncItem', toValue(collection), toValue(id), toValue(query)])
    })

    return await useAsyncData(_key.value, () => readItem(toValue(collection), toValue(id), reactive(query ?? {})), _params)
  }

  /**
   * List all items that exist in a particular Directus collection.
   *
   * @param collection The collection of the items.
   * @param query The query parameters.
   *
   * @returns An array of up to limit item objects. If no items are available, data will be an empty array.
   *
   * @throws Will throw if collection is a core collection.
   * @throws Will throw if collection is empty.
   */
  async function readItems<
    Collection extends RegularCollections<TSchema>,
    TQuery extends Query<TSchema, CollectionType<TSchema, Collection>>,
  >(
    collection: Collection,
    query?: TQuery,
  ): SDKReturn<ReadItemOutput<TSchema, Collection, TQuery>[]> {
    return await client.request(sdkReadItems(collection, query))
  }

  /**
   * List all items that exist in a particular Directus collection.
   *
   * @param collection The collection of the items.
   * @param params query parameters, useAsyncData options and payload key.
   *
   * @returns An array of up to limit item objects. If no items are available, data will be an empty array.
   *
   * @throws Will throw if collection is a core collection.
   * @throws Will throw if collection is empty.
   */
  async function readAsyncItems<
    Collection extends RegularCollections<TSchema>,
    TQuery extends Query<TSchema, CollectionType<TSchema, Collection>>,
  >(
    collection: MaybeRefOrGetter<Collection>,
    params?: ReadAsyncOptionsWithQuery<ReadAsyncDataReturn<SDKReturn<ReadItemOutput<TSchema, Collection, TQuery>[]>>, TQuery>,
  ): ReadAsyncDataReturn<SDKReturn<ReadItemOutput<TSchema, Collection, TQuery>[]>> {
    const { key, query, ..._params } = params ?? {}
    const _key = computed(() => {
      return key ?? 'D_' + hash(['readAsyncItems', toValue(collection), toValue(query)])
    })

    return await useAsyncData(_key.value, () => readItems(toValue(collection), reactive(query ?? {})), _params)
  }

  /**
   * List the singleton item in Directus.
   *
   * @param collection The collection of the items.
   * @param query The query parameters.
   *
   * @returns An array of up to limit item objects. If no items are available, data will be an empty array.
   *
   * @throws Will throw if collection is a core collection.
   * @throws Will throw if collection is empty.
   */
  async function readSingleton<
    Collection extends SingletonCollections<TSchema>,
    TQuery extends Query<TSchema, TSchema[Collection]>,
  >(
    collection: Collection,
    query?: TQuery,
  ): SDKReturn<ReadSingletonOutput<TSchema, Collection, TQuery>> {
    return await client.request(sdkReadSingleton(collection, query))
  }

  /**
   * List the singleton item in Directus.
   *
   * @param collection The collection of the items.
   * @param params query parameters, useAsyncData options and payload key.
   *
   * @returns An array of up to limit item objects. If no items are available, data will be an empty array.
   *
   * @throws Will throw if collection is a core collection.
   * @throws Will throw if collection is empty.
   */
  async function readAsyncSingleton<
    Collection extends SingletonCollections<TSchema>,
    TQuery extends Query<TSchema, TSchema[Collection]>,
  >(
    collection: MaybeRefOrGetter<Collection>,
    params?: ReadAsyncOptionsWithQuery<ReadAsyncDataReturn<SDKReturn<ReadSingletonOutput<TSchema, Collection, TQuery>>>, TQuery>,
  ): ReadAsyncDataReturn<SDKReturn<ReadSingletonOutput<TSchema, Collection, TQuery>>> {
    const { key, query, ..._params } = params ?? {}
    const _key = computed(() => {
      return key ?? 'D_' + hash(['readAsyncSingleton', toValue(collection), toValue(query)])
    })

    return await useAsyncData(_key.value, () => readSingleton(toValue(collection), reactive(query ?? {})), _params)
  }

  /**
   * Update an existing item.
   *
   * @param collection The collection of the item.
   * @param id The primary id of the item.
   * @param item The item data to update.
   * @param query Optional return data query.
   *
   * @returns Returns the item object of the item that was updated.
   *
   * @throws Will throw if id is empty.
   * @throws Will throw if collection is empty.
   * @throws Will throw if collection is a core collection.
   */
  async function updateItem<
    Collection extends keyof TSchema,
    Item extends Partial<UnpackList<TSchema[Collection]>>,
    TQuery extends Query<TSchema, TSchema[Collection]>,
  >(
    collection: Collection,
    id: string | number,
    item: Item,
    query?: TQuery,
  ): SDKReturn<UpdateItemOutput<TSchema, Collection, TQuery>> {
    return await client.request(sdkUpdateItem(collection, id, item, query))
  }

  /**
   * Update multiple items at the same time.
   *
   * @param collection The collection of the items.
   * @param idsOrQuery The primary ids or a query.
   * @param item The item data to update.
   * @param query Optional return data query.
   *
   * @returns Returns the item objects for the updated items.
   *
   * @throws Will throw if idsOrQuery is empty.
   * @throws Will throw if collection is empty.
   * @throws Will throw if collection is a core collection.
   */
  async function updateItems<
    Collection extends keyof TSchema,
    ID extends string[] | number[] | Query<TSchema, TSchema[Collection]>,
    Item extends Partial<UnpackList<TSchema[Collection]>>,
    TQuery extends Query<TSchema, TSchema[Collection]>,
  >(
    collection: Collection,
    idsOrQuery: ID,
    item: Item,
    query?: TQuery,
  ): SDKReturn<UpdateItemOutput<TSchema, Collection, TQuery>[]> {
    return await client.request(sdkUpdateItems(collection, idsOrQuery, item, query))
  }

  /**
   * Update a singleton item.
   *
   * @param collection The collection of the items.
   * @param item The item data to update.
   * @param query The query parameters.
   *
   * @returns An array of up to limit item objects. If no items are available, data will be an empty array.
   *
   * @throws Will throw if collection is a core collection.
   * @throws Will throw if collection is empty.
   */
  async function updateSingleton<
    Collection extends SingletonCollections<TSchema>,
    Item extends Partial<UnpackList<TSchema[Collection]>>,
    TQuery extends Query<TSchema, TSchema[Collection]>,
  >(
    collection: Collection,
    item: Item,
    query?: TQuery,
  ): SDKReturn<UpdateSingletonOutput<TSchema, Collection, TQuery>> {
    return await client.request(sdkUpdateSingleton(collection, item, query))
  }

  /**
   * Delete an existing item.
   *
   * @param collection The collection of the item.
   * @param id The primary id of the item.
   *
   * @returns Nothing.
   *
   * @throws Will throw if collection is empty.
   * @throws Will throw if collection is a core collection.
   * @throws Will throw if id is empty.
   */
  async function deleteItem<
    Collection extends keyof TSchema,
    ID extends string | number,
  >(
    collection: Collection,
    id: ID,
  ): Promise<void> {
    return await client.request(sdkDeleteItem(collection, id))
  }

  /**
   * Delete multiple existing items.
   *
   * @param collection The collection of the items.
   * @param idsOrQuery The primary ids or a query.
   *
   * @returns Nothing.
   *
   * @throws Will throw if collection is empty.
   * @throws Will throw if collection is a core collection.
   * @throws Will throw if idsOrQuery is empty.
   */
  async function deleteItems<
    Collection extends keyof TSchema,
    TQuery extends Query<TSchema, TSchema[Collection]>,
    ID extends string[] | number[],
  >(
    collection: Collection,
    idsOrQuery: ID | TQuery,
  ): Promise<void> {
    return await client.request(sdkDeleteItems(collection, idsOrQuery))
  }

  return {
    client,
    createItem,
    createItems,
    readItem,
    readAsyncItem,
    readItems,
    readAsyncItems,
    readSingleton,
    readAsyncSingleton,
    updateItem,
    updateItems,
    updateSingleton,
    deleteItem,
    deleteItems,
  }
}
