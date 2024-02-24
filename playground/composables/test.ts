import { hash } from 'ohash'
import { readItems as sdkReadItems } from '@directus/sdk'
import { toValue, useAsyncData, reactive } from '#imports'
import type { RegularCollections, Query, CollectionType } from '@directus/sdk'
import type { AsyncDataOptions, KeysOf } from 'nuxt/dist/app/composables/asyncData'

type ShallowMaybeRefOrGetter<T> = {
  [P in keyof T]: MaybeRefOrGetter<T[P]>
}

export type ReadAsyncOptions<O> = Omit<AsyncDataOptions<O, O, KeysOf<O>, O>, 'pick'> & { key?: string }
export type ReadAsyncOptionsWithQuery<O, Q> = ReadAsyncOptions<O> & { query?: ShallowMaybeRefOrGetter<Q> }

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
  > (
    collection: MaybeRefOrGetter<Collection>,
    params?: ReadAsyncOptionsWithQuery<Awaited<ReturnType<typeof readItems<Collection, TQuery>>>, TQuery>
  ) {
    const { key, query, ..._params } = params ?? {}
    const _key = computed(() => {
      return key ?? 'D_' + hash(['readItems', toValue(collection), toValue(query)])
    })

    return await useAsyncData(_key.value, async () => await readItems(toValue(collection), reactive(query ?? {}) as TQuery), _params)
  }

  return {
    client,
    readItems,
    readAsyncItems
  }
}
