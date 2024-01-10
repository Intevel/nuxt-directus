import { hash } from 'ohash'
import {
  createCollection as sdkCreateCollection,
  readCollection as sdkReadCollection,
  readCollections as sdkReadCollections,
  updateCollection as sdkUpdateCollection,
  deleteCollection as sdkDeleteCollection
} from '@directus/sdk'
import type {
  DirectusRestConfig,
  DirectusCollection,
  DirectusCollectionsOptions,
  DirectusCollectionsOptionsAsyncData,
  NestedPartial,
  Query
} from '../types'
import { useAsyncData, computed, toRef, unref } from '#imports'

export function useDirectusCollections<TSchema extends object> (config?: Partial<DirectusRestConfig>) {
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
    params?: DirectusCollectionsOptions<TQuery>
  ) {
    try {
      return await client.request(sdkCreateCollection(item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't create collection.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * Retrieve a single collection by table name.
   *
   * @param collection The collection name.
   * @param params useAsyncData params.
   *
   * @returns A collection object.
   *
   * @throws Will throw if collection is empty.
   */
  async function readCollection <
    TQuery extends Query<TSchema, DirectusCollection<TSchema>>
  > (
    collection: Ref<string> | string,
    params?: DirectusCollectionsOptionsAsyncData<TQuery>
  ) {
    const collectionRef = toRef(collection)
    const key = computed(() => {
      return hash([
        'readCollection',
        unref(collectionRef),
        params?.toString()
      ])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      () => client.request(sdkReadCollection(collectionRef.value)),
      params?.params
    )
  }

  /**
   * List the available collections.
   *
   * @param params useAsyncData params.
   *
   * @returns An array of collection objects.
   */
  async function readCollections <
    TQuery extends Query<TSchema, DirectusCollection<TSchema>>
  > (
    params?: DirectusCollectionsOptionsAsyncData<TQuery>
  ) {
    const key = computed(() => {
      return hash([
        'readCollections',
        params?.toString()
      ])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      () => client.request(sdkReadCollections()),
      params?.params
    )
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
    params?: DirectusCollectionsOptions<TQuery>
  ) {
    try {
      return await client.request(sdkUpdateCollection(collection, item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update collection.", error.message)
      } else {
        console.error(error)
      }
    }
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
    try {
      return await client.request(sdkDeleteCollection(collection))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't delete collection.", error.message)
      } else {
        console.error(error)
      }
    }
  }

  return {
    client,
    createCollection,
    readCollection,
    readCollections,
    updateCollection,
    deleteCollection
  }
}
