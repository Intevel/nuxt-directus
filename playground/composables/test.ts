import { hash } from 'ohash'
import type { Ref } from 'vue'
import { readItems as readItemsSDK } from '@directus/sdk'
import type { AsyncDataOptions } from '#app'
import { useAsyncData, useDirectusItems } from '#imports'
import type { RegularCollections, Query, CollectionType } from '../../src/runtime/types'
import type { Schema } from '../types'

export function myComposable () {
  const { client } = useDirectusItems<Schema>()

  async function readItemsTest (collectionName: MaybeRef<RegularCollections<Schema>>, fieldParam: Ref<string>, searchParam: Ref<string>, params?: AsyncDataOptions<any>) {
    const collection = toRef(collectionName)
    return await useAsyncData(
      () => client.request(readItemsSDK(collection.value, {
        fields: [fieldParam.value],
        search: searchParam.value
      })), params
    )
  }

  async function testReadItems <
  Collection extends RegularCollections<Schema>,
  TQuery extends MaybeRef<Query<Schema, CollectionType<Schema, Collection>>>
  > (
    collection: MaybeRef<Collection>,
    params?: {
      query?: TQuery
      params?: AsyncDataOptions<any>
      key?: string
    }
  ) {
    const collectionRef = toRef(collection)
    const queryRef = toRef(params?.query)
    const key = computed(() => {
      return hash([
        'readItems',
        collectionRef.value,
        'only-a-test'
      ])
    })
    const promise = Promise.resolve([{
      collection: collectionRef.value as Collection,
      query: queryRef,
      params: params?.params
    }])
    return await useAsyncData(
      params?.key ?? key.value,
      () => promise,
      params?.params
    )
  }

  return {
    readItemsTest,
    testReadItems
  }
}
