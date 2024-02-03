import type { Ref } from 'vue'
import { readItems as readItemsSDK } from '@directus/sdk'
import { useAsyncData, useDirectusItems } from '#imports'
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

  return {
    readItemsTest
  }
}
