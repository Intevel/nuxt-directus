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
    createCollection,
    readCollection,
    readCollections,
    updateCollection,
    deleteCollection
  }
}
