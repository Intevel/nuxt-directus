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
  deleteItems as sdkDeleteItems
} from '@directus/sdk'
import type {
  CollectionType,
  DirectusItemsOptions,
  DirectusItemsOptionsAsyncData,
  DirectusRestConfig,
  RegularCollections,
  SingletonCollections,
  Query,
  UnpackList
} from '../types'
import { useAsyncData, computed, toRef, unref } from '#imports'

export function useDirectusItems<TSchema extends object> (config?: Partial<DirectusRestConfig>) {
  const client = useDirectusRest<TSchema>(config)

  async function createItem <
    Collection extends keyof TSchema,
    Item extends Partial<UnpackList<TSchema[Collection]>>,
    TQuery extends Query<TSchema, TSchema[Collection]> | undefined
  > (
    collection: Collection,
    item: Item,
    options?: DirectusItemsOptions<TQuery>
  ) {
    try {
      return await client.request(sdkCreateItem(collection, item, options?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't create item.", error.message)
      } else {
        console.error(error)
      }
    }
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
  async function createItems <
    Collection extends keyof TSchema,
    Item extends Partial<UnpackList<TSchema[Collection]>>[],
    TQuery extends Query<TSchema, TSchema[Collection]> | undefined
  > (
    collection: Collection,
    items: Item,
    options?: DirectusItemsOptions<TQuery>
  ) {
    try {
      return await client.request(sdkCreateItems(collection, items, options?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't create items.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * Get an item that exist in a particular Directus collection.
   *
   * @param collection The collection of the item.
   * @param id The primary key of the item.
   * @param params The query parameters.
   *
   * @returns Returns an item object if a valid primary key was provided.
   *
   * @throws Will throw if collection is a core collection.
   * @throws Will throw if collection is empty.
   * @throws Will throw if key is empty.
   */
  async function readItem <
    Collection extends RegularCollections<TSchema>,
    TQuery extends Query<TSchema, CollectionType<TSchema, Collection>>
  > (
    collection: Ref<Collection> | Collection,
    id: Ref<string | number> | string | number,
    params?: DirectusItemsOptionsAsyncData<TQuery>
  ) {
    const collectionRef = toRef(collection) as Ref<Collection>
    const idRef = toRef(id) as Ref<string | number>
    const key = computed(() => {
      return hash([
        'readItem',
        unref(collectionRef),
        unref(idRef),
        params?.toString()
      ])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      () => client.request(sdkReadItem(collectionRef.value, idRef.value, params?.query)),
      params?.params
    )
  }

  /**
   * List all items that exist in a particular Directus collection.
   *
   * @param collection The collection of the items.
   * @param params The query parameters.
   *
   * @returns An array of up to limit item objects. If no items are available, data will be an empty array.
   *
   * @throws Will throw if collection is a core collection.
   * @throws Will throw if collection is empty.
   */
  async function readItems <
    Collection extends RegularCollections<TSchema>,
    TQuery extends Query<TSchema, CollectionType<TSchema, Collection>>
  > (
    collection: Ref<Collection> | Collection,
    params?: DirectusItemsOptionsAsyncData<TQuery>
  ) {
    const collectionRef = toRef(collection) as Ref<Collection>
    const key = computed(() => {
      return hash([
        'readItems',
        unref(collectionRef),
        params?.toString()
      ])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      () => client.request(sdkReadItems(collectionRef.value, params?.query)),
      params?.params
    )
  }

  /**
   * List the singleton item in Directus.
   *
   * @param collection The collection of the items.
   * @param params The query parameters.
   *
   * @returns An array of up to limit item objects. If no items are available, data will be an empty array.
   *
   * @throws Will throw if collection is a core collection.
   * @throws Will throw if collection is empty.
   */
  async function readSingleton <
    Collection extends SingletonCollections<TSchema>,
    TQuery extends Query<TSchema, TSchema[Collection]>
  > (
    collection: Ref<Collection> | Collection,
    params?: DirectusItemsOptionsAsyncData<TQuery>
  ) {
    const collectionRef = toRef(collection) as Ref<Collection>
    const key = computed(() => {
      return hash([
        'readSingleton',
        unref(collectionRef),
        params?.toString()
      ])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      () => client.request(sdkReadSingleton(collectionRef.value, params?.query)),
      params?.params
    )
  }

  /**
   * Update an existing item.
   *
   * @param collection The collection of the item.
   * @param key The primary key of the item.
   * @param item The item data to update.
   * @param query Optional return data query.
   *
   * @returns Returns the item object of the item that was updated.
   *
   * @throws Will throw if key is empty.
   * @throws Will throw if collection is empty.
   * @throws Will throw if collection is a core collection.
   */
  async function updateItem <
    Collection extends keyof TSchema,
    Item extends Partial<UnpackList<TSchema[Collection]>>,
    TQuery extends Query<TSchema, TSchema[Collection]>
  > (
    collection: Collection,
    id: string | number,
    item: Item,
    options?: DirectusItemsOptions<TQuery>
  ) {
    try {
      return await client.request(sdkUpdateItem(collection, id, item, options?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update item.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * Update multiple items at the same time.
   *
   * @param collection The collection of the items.
   * @param keysOrQuery The primary keys or a query.
   * @param item The item data to update.
   * @param query Optional return data query.
   *
   * @returns Returns the item objects for the updated items.
   *
   * @throws Will throw if keysOrQuery is empty.
   * @throws Will throw if collection is empty.
   * @throws Will throw if collection is a core collection.
   */
  async function updateItems <
    Collection extends keyof TSchema,
    Item extends Partial<UnpackList<TSchema[Collection]>>,
    TQuery extends Query<TSchema, TSchema[Collection]> | undefined
  > (
    collection: Collection,
    ids: string[] | number[],
    item: Item,
    options?: DirectusItemsOptions<TQuery>
  ) {
    try {
      return await client.request(sdkUpdateItems(collection, ids, item, options?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update items.", error.message)
      } else {
        console.error(error)
      }
    }
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
  async function updateSingleton <
    Collection extends SingletonCollections<TSchema>,
    Item extends Partial<UnpackList<TSchema[Collection]>>,
    TQuery extends Query<TSchema, TSchema[Collection]>
  > (
    collection: Collection,
    item: Item,
    options?: DirectusItemsOptions<TQuery>
  ) {
    try {
      return await client.request(sdkUpdateSingleton(collection, item, options?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update singleton.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * Delete an existing item.
   *
   * @param collection The collection of the item.
   * @param key The primary key of the item.
   *
   * @returns Nothing.
   *
   * @throws Will throw if collection is empty.
   * @throws Will throw if collection is a core collection.
   * @throws Will throw if key is empty.
   */
  async function deleteItem <
    Collection extends keyof TSchema,
    ID extends string | number
  > (
    collection: Collection,
    id: ID
  ) {
    try {
      return await client.request(sdkDeleteItem(collection, id))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't delete item.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * Delete multiple existing items.
   *
   * @param collection The collection of the items.
   * @param keysOrQuery The primary keys or a query.
   *
   * @returns Nothing.
   *
   * @throws Will throw if collection is empty.
   * @throws Will throw if collection is a core collection.
   * @throws Will throw if keysOrQuery is empty.
   */
  async function deleteItems <
    Collection extends keyof TSchema,
    TQuery extends Query<TSchema, TSchema[Collection]>,
    ID extends string[] | number[]
  > (
    collection: Collection,
    idOrQuery: ID | TQuery
  ) {
    try {
      return await client.request(sdkDeleteItems(collection, idOrQuery))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't delete items.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  return {
    client,
    createItem,
    createItems,
    readItem,
    readItems,
    readSingleton,
    updateItem,
    updateItems,
    updateSingleton,
    deleteItem,
    deleteItems
  }
}
