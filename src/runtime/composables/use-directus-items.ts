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
  RegularCollections,
  SingletonCollections,
  Query,
  UnpackList
} from '@directus/sdk'
import type {
  DirectusItemsOptions,
  DirectusRestConfig
} from '../types'
import { recursiveUnref } from './internal-utils/recursive-unref'
import { computed, ref, useDirectusRest, useNuxtApp, useNuxtData } from '#imports'

export function useDirectusItems<TSchema extends object> (config?: Partial<DirectusRestConfig>) {
  const client = useDirectusRest<TSchema>(config)
  const { runWithContext } = useNuxtApp()

  async function createItem <
    Collection extends keyof TSchema,
    Item extends Partial<UnpackList<TSchema[Collection]>>,
    TQuery extends Query<TSchema, TSchema[Collection]> | undefined
  > (
    collection: Collection,
    item: Item,
    query?: TQuery
  ) {
    try {
      return await client.request(sdkCreateItem(collection, item, query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't create item:", error.message)
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
    query?: TQuery
  ) {
    try {
      return await client.request(sdkCreateItems(collection, items, query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't create items:", error.message)
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
   * @param query The query parameters.
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
    collection: Collection,
    id: string | number,
    _query?: DirectusItemsOptions<TQuery>
  ) {
    const { nuxtData, ...query } = _query ?? {}
    const key = computed(() => {
      return 'D_' + hash(['readItem', collection, id, recursiveUnref(query)])
    })

    const promise = runWithContext(() => client.request(sdkReadItem(collection, id, query)))
    const { data } = nuxtData !== false
      ? useNuxtData<Awaited<typeof promise>>(nuxtData ?? key.value)
      : { data: ref<Awaited<typeof promise>>() }

    if (data.value) {
      return data.value
    } else {
      // @ts-ignore TODO: check why Awaited is creating problems
      data.value = await promise.catch((e: any) => {
        if (e && e.message) {
          console.error("Couldn't read item:", e.message)
          return null
        } else {
          console.error(e)
          return null
        }
      })
      return data.value
    }
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
  async function readItems <
    Collection extends RegularCollections<TSchema>,
    TQuery extends Query<TSchema, CollectionType<TSchema, Collection>>
  > (
    collection: Collection,
    _query?: DirectusItemsOptions<TQuery>
  ) {
    const { nuxtData, ...query } = _query ?? {}
    const key = computed(() => {
      return 'D_' + hash(['readItems', collection, recursiveUnref(query)])
    })

    const promise = runWithContext(() => client.request(sdkReadItems(collection, query)))

    const { data } = nuxtData !== false
      ? useNuxtData<Awaited<typeof promise>>(nuxtData ?? key.value)
      : { data: ref<Awaited<typeof promise>>() }

    if (data.value) {
      return data.value
    } else {
      data.value = await promise.catch((e: any) => {
        if (e && e.message) {
          console.error("Couldn't read item:", e.message)
          return null
        } else {
          console.error(e)
          return null
        }
      })
      return data.value
    }
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
  async function readSingleton <
    Collection extends SingletonCollections<TSchema>,
    TQuery extends Query<TSchema, TSchema[Collection]>
  > (
    collection: Collection,
    _query?: DirectusItemsOptions<TQuery>
  ) {
    const { nuxtData, ...query } = _query ?? {}
    const key = computed(() => {
      return 'D_' + hash(['readSingleton', collection, recursiveUnref(query)])
    })

    const promise = runWithContext(() => client.request(sdkReadSingleton(collection, query)))

    const { data } = nuxtData !== false
      ? useNuxtData<Awaited<typeof promise>>(nuxtData ?? key.value)
      : { data: ref<Awaited<typeof promise>>() }

    if (data.value) {
      return data.value
    } else {
      // @ts-ignore TODO: check why Awaited is creating problems
      data.value = await promise.catch((e: any) => {
        if (e && e.message) {
          console.error("Couldn't read item:", e.message)
          return null
        } else {
          console.error(e)
          return null
        }
      })
      return data.value
    }
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
    query?: TQuery
  ) {
    try {
      return await client.request(sdkUpdateItem(collection, id, item, query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update item:", error.message)
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
    query?: TQuery
  ) {
    try {
      return await client.request(sdkUpdateItems(collection, ids, item, query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update items:", error.message)
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
    query?: TQuery
  ) {
    try {
      return await client.request(sdkUpdateSingleton(collection, item, query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update singleton:", error.message)
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
        console.error("Couldn't delete item:", error.message)
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
        console.error("Couldn't delete items:", error.message)
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
