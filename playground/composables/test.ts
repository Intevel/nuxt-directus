import { hash } from 'ohash'
import type { Ref } from 'vue'
import { readItems as readItemsSDK } from '@directus/sdk'
import type { AsyncDataOptions } from '#app'
import { useAsyncData, useDirectusItems } from '#imports'
import type { RegularCollections, Query, CollectionType, DirectusItemsOptionsAsyncData } from '../../src/runtime/types'
import type { Schema } from '../types'

export function myComposable () {
  const { client } = useDirectusItems<Schema>()

  async function readItemsTest (collectionName: Ref<RegularCollections<Schema>>, fieldParam: Ref<string>, searchParam: Ref<string>, params?: AsyncDataOptions<any>) {
    return await useAsyncData(
      () => client.request(readItemsSDK(collectionName.value, {
        fields: [fieldParam.value],
        search: searchParam.value
      })), params
    )
  }

  async function testReadItems <
  Collection extends RegularCollections<Schema>,
  TQuery extends Query<Schema, CollectionType<Schema, Collection>>
  > (
    collection: MaybeRef<Collection>,
    params?: DirectusItemsOptionsAsyncData<TQuery>
  ) {
    const collectionRef = toRef(collection) as Ref<Collection>
    const queryRef = params?.query ? reactive<TQuery>(params.query) : undefined
    const key = computed(() => {
      return hash([
        'readItems',
        unref(collectionRef),
        'only-a-test'
      ])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      () => Promise.resolve([{
        collection: collectionRef.value,
        query: queryRef,
        params: params?.params
      }]),
      params?.params
    )
  }

  return {
    readItemsTest,
    testReadItems
  }
}
