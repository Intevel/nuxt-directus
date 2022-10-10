import type {
  DirectusCollections,
  DirectusCollectionCreation,
  DirectusCollectionRequest,
  DirectusCollectionUpdate,
  DirectusCollectionInfo
} from '../types'

import { useDirectus } from './useDirectus'
import { useDirectusUrl } from './useDirectusUrl'

export const useDirectusCollections = <Collections extends DirectusCollections>() => {
  const directusUrl = useDirectusUrl()
  const directus = useDirectus()

  async function getCollections (): Promise<DirectusCollectionInfo<Collections>[]> {
    const collections = await directus<{
      data: DirectusCollectionInfo<Collections>[];
    }>('/collections/', {
      method: 'GET'
    })

    return collections.data
  }

  async function getCollection<Data extends DirectusCollectionRequest<Collections>> (
    data: Data
  ): Promise<Extract<DirectusCollectionInfo<Collections>, { collection: Data['collection'] } >> {
    const collection = await directus<{
      data: Extract<DirectusCollectionInfo<Collections>, { collection: Data['collection'] }>;
    }>(`/collections/${data.collection as string}`, {
      method: 'GET'
    })

    return collection.data
  }

  async function createCollection <Data extends DirectusCollectionCreation> (
    data: Data
  ): Promise<Data> {
    const collection = await directus<{
      data: Data;
    }>('/collections', {
      method: 'POST',
      body: data
    })

    return collection.data
  }

  async function updateCollection <Data extends DirectusCollectionUpdate<Collections>> (
    data: Data
  ): Promise<Data> {
    const collection = await directus<{
      data: Data;
    }>(`/collections/${data.collection as string}`, {
      method: 'PATCH',
      body: {
        meta: data.meta
      }
    })

    return collection.data
  }

  async function deleteCollection <Data extends DirectusCollectionRequest<Collections>> (
    data: Data
  ): Promise<void> {
    await directus<{
      data: Data;
    }>(`/collections/${data.collection as string}`, {
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
