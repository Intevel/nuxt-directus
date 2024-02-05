import { hash } from 'ohash'
import type { Ref } from 'vue'
import { readItems as readItemsSDK } from '@directus/sdk'
import { useAsyncData, useDirectusItems } from '#imports'
import type { RegularCollections, Query, CollectionType, DirectusItemsOptionsAsyncData } from '../../src/runtime/types'
import type { Schema } from '../types'

export function myComposable () {
  const { client } = useDirectusItems<Schema>()

  async function readItemsTest (fieldParam: Ref<string>, searchParam: Ref<string>) {
    return await useAsyncData(
      () => client.request(readItemsSDK('posts', {
        fields: [fieldParam.value],
        search: searchParam.value
      })), {
        immediate: false,
        watch: [fieldParam, searchParam]
      }
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
        query: queryRef
      }]),
      params?.params
    )
  }

  return {
    readItemsTest,
    testReadItems
  }
}
