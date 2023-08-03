import {
  DirectusCollectionCreation,
  DirectusCollectionRequest,
  DirectusCollectionUpdate
} from '../types'

import { useDirectus } from './useDirectus'

export const useDirectusCollections = () => {
  const directus = useDirectus()

  const getCollections = async <T>(): Promise<T[]> => {
    const collections = await directus<{ data: T[] }>('/collections/', {
      method: 'GET'
    })
    return collections.data
  }

  const getCollection = async <T>(
    data: DirectusCollectionRequest
  ): Promise<T> => {
    const collection = await directus<{ data: T }>(
      `/collections/${data.collection}`,
      {
        method: 'GET'
      }
    )
    return collection.data
  }

  const createCollection = async <T>(
    data: DirectusCollectionCreation
  ): Promise<T> => {
    const collection = await directus<{ data: T }>('/collections', {
      method: 'POST',
      body: data
    })
    return collection.data
  }

  const updateCollection = async <T>(
    data: DirectusCollectionUpdate
  ): Promise<T> => {
    const collection = await directus<{ data: T }>(
      `/collections/${data.collection}`,
      {
        method: 'PATCH',
        body: {
          meta: data.meta
        }
      }
    )
    return collection.data
  }

  const deleteCollection = async <T>(
    data: DirectusCollectionRequest
  ): Promise<void> => {
    await directus<{ data: T }>(`/collections/${data.collection}`, {
      method: 'DELETE'
    })
  }

  return {
    getCollections,
    getCollection,
    createCollection,
    updateCollection,
    deleteCollection
  }
}
