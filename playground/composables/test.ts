import { hash } from 'ohash'
import type { Ref } from 'vue'
import { readItems as readItemsSDK } from '@directus/sdk'
import type { AsyncDataOptions } from '#app'
import { reactive, useAsyncData, useDirectusItems } from '#imports'
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
    _params?: MaybeRef<{
      query?: TQuery
      params?: AsyncDataOptions<any>
      key?: string
    }>
  ) {
    const { key, params, query } = toRef(_params).value ?? {}
    const _key = computed(() => {
      return hash([
        'readItems',
        collection,
        'only-a-test'
      ])
    })

    const {
      watch,
      ...otherParams
    } = params ?? {}

    const _request = ref({
      collection,
      query,
    })

    const _asyncOptions = {
      watch: [_request, ...(watch || [])],
      ...otherParams
    }

    return await useAsyncData(
      key ?? _key.value,
      () => {
        return Promise.resolve([{
          collection: _request.value.collection,
          query: _request.value.query,
        }])
      },
      _asyncOptions
    )
  }

  return {
    readItemsTest,
    testReadItems
  }
}
