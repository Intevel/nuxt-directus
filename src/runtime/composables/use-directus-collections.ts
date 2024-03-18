import { hash } from 'ohash'
import {
  createCollection as sdkCreateCollection,
  readCollection as sdkReadCollection,
  readCollections as sdkReadCollections,
  updateCollection as sdkUpdateCollection,
  deleteCollection as sdkDeleteCollection
} from '@directus/sdk'
import type {
  DirectusCollection,
  NestedPartial,
  Query
} from '@directus/sdk'
import type { DirectusRestConfig, ReadAsyncOptions } from '../types'
import { type MaybeRefOrGetter, computed, useAsyncData, useDirectusRest, toValue } from '#imports'

export function useDirectusCollections<TSchema extends object = any> (config?: Partial<DirectusRestConfig>) {
  const client = useDirectusRest<TSchema>(config)

  /**
   * Create a new Collection. This will create a new table in the database as well.
   *
   * @param item This endpoint doesn't currently support any query parameters.
   * @param query Optional return data query.
   *
   * @returns The collection object for the collection created in this request.
   */
  async function createCollection <
    TQuery extends Query<TSchema, DirectusCollection<TSchema>>
  > (
    item: NestedPartial<DirectusCollection<TSchema>>,
    query?: TQuery
  ) {
    return await client.request(sdkCreateCollection(item, query))
  }

  /**
   * Retrieve a single collection by table name.
   *
   * @param collection The collection name.
   *
   * @returns A collection object.
   *
   * @throws Will throw if collection is empty.
   */
  async function readCollection (
    collection: string
  ) {
    return await client.request(sdkReadCollection(collection))
  }

  /**
   * Retrieve a single collection by table name.
   *
   * @param collection The collection name.
   * @param parasms useAsyncData options and payload key.
   *
   * @returns A collection object.
   *
   * @throws Will throw if collection is empty.
   */
  async function readAsyncCollection <
    Output extends Awaited<ReturnType<typeof readCollection>>
  > (
    collection: MaybeRefOrGetter<string>,
    params?: ReadAsyncOptions<Output>
  ) {
    const { key, ..._params } = params ?? {}
    const _key = computed(() => {
      return key ?? 'D_' + hash(['readAsyncCollection', toValue(collection)])
    })

    return await useAsyncData(_key.value, () => readCollection(toValue(collection)), _params)
  }

  /**
   * List the available collections.
   *
   * @returns An array of collection objects.
   */
  async function readCollections () {
    return await client.request(sdkReadCollections())
  }

  /**
   * Retrieve a single collection by table name.
   * @param parasms useAsyncData options and payload key.
   *
   * @returns A collection object.
   */
  async function readAsyncCollections <
    Output extends Awaited<ReturnType<typeof readCollections>>
  > (
    params?: ReadAsyncOptions<Output>
  ) {
    const { key, ..._params } = params ?? {}
    const _key = computed(() => {
      return key ?? 'D_' + hash(['readAsyncCollections'])
    })

    return await useAsyncData(_key.value, () => readCollections(), _params)
  }

  /**
   * Update the metadata for an existing collection.
   *
   * @param collection The collection name.
   * @param item
   * @param query
   *
   * @returns The collection object for the updated collection in this request.
   *
   * @throws Will throw if collection is empty.
   */
  async function updateCollection <
    TQuery extends Query<TSchema, DirectusCollection<TSchema>>
  > (
    collection: string,
    item: NestedPartial<DirectusCollection<TSchema>>,
    query?: TQuery
  ) {
    return await client.request(sdkUpdateCollection(collection, item, query))
  }

  /**
   * Delete a collection.
   *
   * @param collection The collection name.
   *
   * @returns Nothing.
   */
  async function deleteCollection (
    collection: string
  ) {
    return await client.request(sdkDeleteCollection(collection))
  }

  return {
    client,
    createCollection,
    readCollection,
    readAsyncCollection,
    readCollections,
    readAsyncCollections,
    updateCollection,
    deleteCollection
  }
}
