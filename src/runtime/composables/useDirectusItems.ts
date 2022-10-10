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

  async function getItems <Data extends DirectusItemRequest<Collections> & {
    params: {
      meta: DirectusQueryParams['meta'];
    };
  }> (
    data: Data
  ): Promise<{
    meta: DirectusQueryParamsMeta;
    data: Collections[Data['collection']][];
  }>;

  async function getItems <Data extends DirectusItemRequest<Collections>> (
    data: Data
  ): Promise<Collections[Data['collection']][]>;

  async function getItems <Data extends DirectusItemRequest<Collections>> (
    data: Data
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
      data: Collections[Data['collection']][];
    }>(`/items/${data.collection as string}`, {
      method: 'GET',
      params: data.params
    })

    if ('meta' in items) {
      return { meta: items.meta, data: items.data }
    } else {
      return items.data
    }
  }

  async function getSingletonItem <Data extends DirectusItemRequest<Collections>> (
    data: Data
  ): Promise<Collections[Data['collection']]> {
    if (data.params?.filter) {
      (data.params.filter as unknown) = JSON.stringify(data.params.filter)
    }

    if (data.params?.deep) {
      (data.params.deep as unknown) = JSON.stringify(data.params.deep)
    }

    // TODO: 'params.fields' is an array or strings that we can use to improve the return type
    const item = await directus<{
      data: Collections[Data['collection']];
    }>(`/items/${data.collection as string}`, {
      method: 'GET',
      params: data.params
    })

    return item.data
  }

  async function getItemById <Data extends DirectusItemRequest<Collections>> (
    data: Data
  ): Promise<Collections[Data['collection']]> {
    if (data.params?.filter) {
      (data.params.filter as unknown) = JSON.stringify(data.params.filter)
    }

    if (data.params?.deep) {
      (data.params.deep as unknown) = JSON.stringify(data.params.deep)
    }

    // TODO: 'params.fields' is an array or strings that we can use to improve the return type
    const item = await directus<{
      data: Collections[Data['collection']];
    }>(`/items/${data.collection as string}/${data.id}`, {
      method: 'GET',
      params: data.params
    })

    return item.data
  }

  async function createItems <Data extends DirectusItemCreation<Collections>> (
    data: Data
  ): Promise<Collections[Data['collection']][]> {
    const items = await directus<{
      data: Collections[Data['collection']][];
    }>(`/items/${data.collection as string}`, {
      method: 'POST',
      body: data.items
    })

    return items.data
  }

  async function deleteItems <Data extends DirectusItemDeletion<Collections>> (
    data: Data
  ): Promise<void> {
    await directus<void>(`/items/${data.collection as string}`, {
      method: 'DELETE',
      body: data.items
    })
  }

  async function updateItem <Data extends DirectusItemUpdate<Collections>> (
    data: Data
  ): Promise<Collections[Data['collection']]> {
    const item = await directus<{
      data: Collections[Data['collection']];
    }>(`/items/${data.collection as string}/${data.id}`, {
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
