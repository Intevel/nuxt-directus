import { hash } from 'ohash'
import type { AsyncDataOptions } from '#app'
import type { KeysOf } from 'nuxt/dist/app/composables/asyncData'
import { readItems as sdkReadItems } from '@directus/sdk'
import { type MaybeRef, toValue, useAsyncData } from '#imports'
import type { RegularCollections, Query, CollectionType, ReadItemOutput } from '@directus/sdk'
import { recursiveUnref } from '../../src/runtime/composables/internal-utils/recursive-unref'

type RecursiveMaybeRef<T> = {
  [P in keyof T]: MaybeRef<T[P]>
}

export function myComposable <T extends object = any> () {
  const client = useDirectusRest<T>()

  async function readItems <
      Collection extends RegularCollections<T>,
      TQuery extends Query<T, CollectionType<T, Collection>>,
      Output extends ReadItemOutput<T, Collection, TQuery>
    > (
    collection: MaybeRef<Collection>,
    params?: Omit<AsyncDataOptions<Output[], Output[], KeysOf<Output[]>, Output[]>, 'pick'> & { key?: string, query?: RecursiveMaybeRef<TQuery>}
  ) {
    const { key, query, ..._params } = params ?? {}
    const _key = computed(() => {
      return key ?? 'D_' + hash(['readItems', collection, recursiveUnref(query)])
    })

    // @ts-expect-error
    return await useAsyncData(_key.value, () => client.request(sdkReadItems(toValue(collection), reactive(query ?? {}))), _params)
  }

  return {
    client,
    readItems
  }
}
