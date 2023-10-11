import { hash } from 'ohash'
import {
  createCollection as sdkCreateCollection,
  readCollection as sdkReadCollection,
  readCollections as sdkReadCollections,
  updateCollection as sdkUpdateCollection,
  deleteCollection as sdkDeleteCollection
} from '@directus/sdk'
import type {
  DirectusClientConfig,
  DirectusCollection,
  DirectusCollectionsOptions,
  DirectusCollectionsOptionsAsyncData,
  NestedPartial,
  Query
} from '../types'
import { useAsyncData, computed, toRef, unref } from '#imports'

export function useDirectusCollections<TSchema extends object> (useStaticToken?: boolean | string) {
  const client = (useStaticToken?: boolean | string) => {
    return useDirectusRest<TSchema>({
      useStaticToken
    })
  }

  async function createCollection <
    TQuery extends Query<TSchema, DirectusCollection<TSchema>>
  > (
    item: NestedPartial<DirectusCollection<TSchema>>,
    params?: DirectusCollectionsOptions<TQuery>
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkCreateCollection(item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't create collection", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  async function readCollection (
    collection: Ref<string> | string,
    params?: DirectusCollectionsOptionsAsyncData
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
      async () => await client(params?.useStaticToken || useStaticToken).request(sdkReadCollection(collectionRef.value)), params?.params
    )
  }

  async function readCollections (
    params?: DirectusCollectionsOptionsAsyncData
  ) {
    const key = computed(() => {
      return hash([
        'readCollections',
        params?.toString()
      ])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      async () => await client(params?.useStaticToken || useStaticToken).request(sdkReadCollections()), params?.params
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
      return await client(params?.useStaticToken || useStaticToken).request(sdkUpdateCollection(collection, item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't update collection", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  async function deleteCollection (
    collection: string,
    params?: DirectusClientConfig
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkDeleteCollection(collection))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't delete collection", error.errors)
      } else {
        // eslint-disable-next-line no-console
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
