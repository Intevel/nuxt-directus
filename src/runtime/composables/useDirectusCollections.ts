import type {
  DirectusCollections,
  DirectusCollectionCreation,
  DirectusCollectionUpdate,
  DirectusCollectionInfo
} from '../types'

import { useDirectus } from './useDirectus'
import { useDirectusUrl } from './useDirectusUrl'

export const useDirectusCollections = <Collections extends DirectusCollections>() => {
  const directusUrl = useDirectusUrl()
  const directus = useDirectus()

  async function getCollections (): Promise<DirectusCollectionInfo<Collections>[keyof Collections][]> {
    const collectionsInfo = await directus<{
      data: DirectusCollectionInfo<Collections>[keyof Collections][];
    }>('/collections/', {
      method: 'GET'
    })

    return collectionsInfo.data
  }

  async function getCollection<C extends keyof Collections> (
    collection: C
  ): Promise<DirectusCollectionInfo<Collections>[C]> {
    const collectionInfo = await directus<{
      data: DirectusCollectionInfo<Collections>[C];
    }>(`/collections/${collection as string}`, {
      method: 'GET'
    })

    return collectionInfo.data
  }

  async function createCollection <D extends DirectusCollectionCreation> (
    data: D
  ): Promise<D> {
    const collectionInfo = await directus<{
      data: D;
    }>('/collections', {
      method: 'POST',
      body: data
    })

    return collectionInfo.data
  }

  async function updateCollection <
    C extends keyof Collections,
    D extends DirectusCollectionUpdate<Collections, C>
  > (
    collection: C,
    data: D
  ): Promise<D> {
    const collectionInfo = await directus<{
      data: D;
    }>(`/collections/${collection as string}`, {
      method: 'PATCH',
      body: {
        meta: data.meta
      }
    })

    return collectionInfo.data
  }

  async function deleteCollection <C extends keyof Collections> (
    collection: C
  ): Promise<void> {
    await directus<{
      data: C;
    }>(`/collections/${collection as string}`, {
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
