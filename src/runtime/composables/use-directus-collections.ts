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
import type {
  DirectusRestConfig
} from '../types'
import { computed, ref, useDirectusRest, useNuxtApp, useNuxtData } from '#imports'

export function useDirectusCollections<TSchema extends object = any> (config?: Partial<DirectusRestConfig>) {
  const client = useDirectusRest<TSchema>(config)
  const { runWithContext } = useNuxtApp()

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
    try {
      return await client.request(sdkCreateCollection(item, query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't create collection:", error.message)
      } else {
        console.error(error)
      }
    }
  }

  /**
   * Retrieve a single collection by table name.
   *
   * @param collection The collection name.
   * @param nuxtData chace the response into Nuxt's payload.
   *
   * @returns A collection object.
   *
   * @throws Will throw if collection is empty.
   */
  async function readCollection (
    collection: string,
    nuxtData?: string | boolean
  ) {
    const key = computed(() => {
      if (typeof nuxtData === 'string') {
        return nuxtData
      } else {
        return 'D_' + hash(['readCollection', collection])
      }
    })
    const promise = runWithContext(() => client.request(sdkReadCollection(collection)))

    const { data } = nuxtData !== false
      ? useNuxtData<Awaited<typeof promise>>(key.value)
      : { data: ref<Awaited<typeof promise>>() }

    if (data.value) {
      return data.value
    } else {
      // @ts-ignore TODO: check why Awaited is creating problems
      data.value = await promise.catch((e: any) => {
        if (e && e.message) {
          console.error("Couldn't read collection:", e.message)
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
   * List the available collections.
   *
   * @param nuxtData chace the response into Nuxt's payload.
   *
   * @returns An array of collection objects.
   */
  async function readCollections (
    nuxtData?: string | boolean
  ) {
    const key = computed(() => {
      if (typeof nuxtData === 'string') {
        return nuxtData
      } else {
        return 'D_' + hash(['readCollections'])
      }
    })
    const promise = runWithContext(() => client.request(sdkReadCollections()))

    const { data } = nuxtData !== false
      ? useNuxtData<Awaited<typeof promise>>(key.value)
      : { data: ref<Awaited<typeof promise>>() }

    if (data.value) {
      return data.value
    } else {
      data.value = await promise.catch((e: any) => {
        if (e && e.message) {
          console.error("Couldn't read collections:", e.message)
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
    try {
      return await client.request(sdkUpdateCollection(collection, item, query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update collection:", error.message)
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
        console.error("Couldn't delete collection:", error.message)
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
