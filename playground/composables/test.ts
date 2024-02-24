import { hash } from 'ohash'
import { readItems as sdkReadItems } from '@directus/sdk'
import { toValue, useAsyncData } from '#imports'
import type { RegularCollections, Query, CollectionType } from '@directus/sdk'
import type { ReadAsyncOptionsWithQuery } from '../../src/runtime/types'

export function myComposable <T extends object = any> () {
  const client = useDirectusRest<T>()

  async function readItems <
    Collection extends RegularCollections<T>,
    TQuery extends Query<T, CollectionType<T, Collection>>,
  > (
    collection: Collection,
    query?: TQuery
  ) {
    return await client.request(sdkReadItems(collection, query))
  }

  async function readAsyncItems <
    Collection extends RegularCollections<T>,
    TQuery extends Query<T, CollectionType<T, Collection>>,
    Output extends Awaited<ReturnType<typeof readItems<Collection, TQuery>>>,
  > (
    collection: MaybeRefOrGetter<Collection>,
    params?: ReadAsyncOptionsWithQuery<Output, TQuery>
  ) {
    const { key, query, ..._params } = params ?? {}
    const _key = computed(() => {
      return key ?? 'D_' + hash(['readItems', toValue(collection), toValue(query)])
    })

    // @ts-expect-error
    return await useAsyncData(_key.value, () => readItems(toValue(collection), reactive(query ?? {})), _params)
  }

  return {
    client,
    readItems,
    readAsyncItems
  }
}
