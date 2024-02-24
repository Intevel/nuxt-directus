import { hash } from 'ohash'
import { readItems as sdkReadItems } from '@directus/sdk'
import { toValue, useAsyncData, reactive } from '#imports'
import type { RegularCollections, Query, CollectionType } from '@directus/sdk'
import type { AsyncDataOptions, KeysOf } from 'nuxt/dist/app/composables/asyncData'

type ShallowMaybeRefOrGetter<T> = {
  [P in keyof T]: MaybeRefOrGetter<T[P]>
}

type QueryParam<T extends object> = Query<T, CollectionType<T, RegularCollections<T>>>

// export type ReadAsyncOptions<O, Q> = AsyncDataOptions<O, O, KeysOf<O>, O> & { key?: string } & { query?: ShallowMaybeRefOrGetter<Q> | MaybeRefOrGetter<Q> }
export type ReadAsyncOptions<O, Q> = AsyncDataOptions<O> & { key?: string } & { query?: ShallowMaybeRefOrGetter<Q> }

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

  async function readAsyncItems (
    collection: MaybeRefOrGetter<RegularCollections<T>>,
    params?: ReadAsyncOptions<Awaited<ReturnType<typeof readItems<RegularCollections<T>, QueryParam<T>>>>, QueryParam<T>>
  ) {
    const { key, query, ..._params } = params ?? {}
    const _key = computed(() => {
      return key ?? 'D_' + hash(['readItems', toValue(collection), toValue(query)])
    })

    return await useAsyncData(_key.value, async () => await readItems(toValue(collection), reactive(query ?? {}) as QueryParam<T>), _params)
  }

  return {
    client,
    readItems,
    readAsyncItems
  }
}
