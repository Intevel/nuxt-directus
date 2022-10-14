/* eslint-disable no-redeclare */

import type {
  DirectusCollections,
  DirectusItemRequest,
  DirectusItemCreation,
  DirectusItemDeletion,
  DirectusItemUpdate,
  DirectusQueryParams,
  DirectusQueryParamsMeta
} from '../types'

import { useDirectus } from './useDirectus'

export const useDirectusItems = <Collections extends DirectusCollections>() => {
  const directus = useDirectus()

  async function getItems <
    C extends keyof Collections,
    D extends DirectusItemRequest<Collections>[C] & {
      params: {
        meta: DirectusQueryParams['meta'];
      };
    }
  > (
    collection: C,
    data: D
  ): Promise<{
    meta: DirectusQueryParamsMeta;
    data: Collections[C][];
  }>;

  async function getItems <
    C extends keyof Collections,
    D extends DirectusItemRequest<Collections>
  > (
    collection: C,
    data: D
  ): Promise<Collections[C][]>;

  async function getItems <
    C extends keyof Collections,
    D extends DirectusItemRequest<Collections>[C]
  > (
    collection: C,
    data: D
  ) {
    if (data.params?.filter) {
      (data.params.filter as unknown) = JSON.stringify(data.params.filter)
    }

    if (data.params?.deep) {
      (data.params.deep as unknown) = JSON.stringify(data.params.deep)
    }

    // TODO: 'params.fields' is an array or strings that we can use to improve the return type
    const items = await directus<{
      meta?: DirectusQueryParamsMeta;
      data: Collections[C][];
    }>(`/items/${collection as string}`, {
      method: 'GET',
      params: data.params
    })

    if ('meta' in items) {
      return { meta: items.meta, data: items.data }
    } else {
      return items.data
    }
  }

  async function getSingletonItem <
    C extends keyof Collections,
    D extends DirectusItemRequest<Collections>[C]
  > (
    collection: C,
    data: D
  ): Promise<Collections[C]> {
    if (data.params?.filter) {
      (data.params.filter as unknown) = JSON.stringify(data.params.filter)
    }

    if (data.params?.deep) {
      (data.params.deep as unknown) = JSON.stringify(data.params.deep)
    }

    // TODO: 'params.fields' is an array or strings that we can use to improve the return type
    const item = await directus<{
      data: Collections[C];
    }>(`/items/${collection as string}`, {
      method: 'GET',
      params: data.params
    })

    return item.data
  }

  async function getItemById <
    C extends keyof Collections,
    D extends DirectusItemRequest<Collections>[C]
  > (
    collection: C,
    data: D
  ): Promise<Collections[C]> {
    if (data.params?.filter) {
      (data.params.filter as unknown) = JSON.stringify(data.params.filter)
    }

    if (data.params?.deep) {
      (data.params.deep as unknown) = JSON.stringify(data.params.deep)
    }

    // TODO: 'params.fields' is an array or strings that we can use to improve the return type
    const item = await directus<{
      data: Collections[C];
    }>(`/items/${collection as string}/${data.id}`, {
      method: 'GET',
      params: data.params
    })

    return item.data
  }

  async function createItems <
    C extends keyof Collections,
    D extends DirectusItemCreation<Collections>[C]
  > (
    collection: C,
    data: D
  ): Promise<Collections[C][]> {
    const items = await directus<{
      data: Collections[C][];
    }>(`/items/${collection as string}`, {
      method: 'POST',
      body: data.items
    })

    return items.data
  }

  async function deleteItems <
    C extends keyof Collections,
    D extends DirectusItemDeletion<Collections>[C]
  > (
    collection: C,
    data: D
  ): Promise<void> {
    await directus<void>(`/items/${collection as string}`, {
      method: 'DELETE',
      body: data.items
    })
  }

  async function updateItem <
    C extends keyof Collections,
    D extends DirectusItemUpdate<Collections>[C]
  > (
    collection: C,
    data: D
  ): Promise<Collections[C]> {
    const item = await directus<{
      data: Collections[C];
    }>(`/items/${collection as string}/${data.id}`, {
      method: 'PATCH',
      body: data.item
    })

    return item.data
  }

  return {
    getItems,
    getSingletonItem,
    getItemById,
    createItems,
    deleteItems,
    updateItem
  }
}
