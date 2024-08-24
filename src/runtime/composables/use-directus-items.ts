import { joinURL } from 'ufo'

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

  function $readItem(collection: string, id: string) {
    return $directusFetch(collectionURL(collection, id))
  }

  function readItem(collection: string, id: string) {
    return useDirectusFetch(collectionURL(collection, id))
  }

  function $readItems(collection: string) {
    return $directusFetch(collectionURL(collection))
  }

  function readItems(collection: string) {
    return useDirectusFetch(collectionURL(collection))
  }

  function $readSingleton(collection: string) {
    return $directusFetch(collectionURL(collection))
  }

  function readSingleton(collection: string) {
    return useDirectusFetch(collectionURL(collection))
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
