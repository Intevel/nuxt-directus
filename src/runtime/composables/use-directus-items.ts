import { joinURL } from 'ufo'

import type { DirectusQueryParams } from '../types'
import { useDirectusFetch, useNuxtApp } from '#imports'

export function useDirectusItems() {
  const { $directusFetch } = useNuxtApp()
  function collectionURL(collection: string, id?: string) {
    const input = [collection]
    if (id !== undefined) {
      input.push(id)
    }
    return joinURL('items', ...input)
  }

  function $readItem(collection: string, id: string, params?: DirectusQueryParams) {
    return $directusFetch(collectionURL(collection, id), {
      params,
    })
  }

  function readItem(collection: string, id: string, params?: DirectusQueryParams) {
    return useDirectusFetch(collectionURL(collection, id), {
      params,
    })
  }

  function $readItems(collection: string, params?: DirectusQueryParams) {
    return $directusFetch(collectionURL(collection), {
      params,
    })
  }

  function readItems(collection: string, params?: DirectusQueryParams) {
    return useDirectusFetch(collectionURL(collection), {
      params,
    })
  }

  function $readSingleton(collection: string, params?: DirectusQueryParams) {
    return $directusFetch(collectionURL(collection), {
      params,
    })
  }

  function readSingleton(collection: string, params?: DirectusQueryParams) {
    return useDirectusFetch(collectionURL(collection), {
      params,
    })
  }

  return {
    // createItem,
    // createItems,
    $readItem,
    readItem,
    $readItems,
    readItems,
    $readSingleton,
    readSingleton,
    // updateItem,
    // updateItems,
    // updateSingleton,
    // deleteItem,
    // deleteItems,
  }
}
