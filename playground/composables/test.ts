import { hash } from 'ohash'
import type { WatchSource } from 'vue'
import { readItems as sdkReadItems } from '@directus/sdk'
import { type MaybeRef, toValue, useAsyncData } from '#imports'
import type { RegularCollections, Query, CollectionType } from '../../src/runtime/types'
import { recursiveUnref } from '../../src/runtime/composables/internal-utils/recursive-unref'

type RecursiveMaybeRef<T> = {
  [P in keyof T]: MaybeRef<T[P]>
}

type MultiWatchSources = (WatchSource<unknown> | object)[]

interface FakeAsyncDataOptions<DefaultT = null> {
  server?: boolean
  lazy?: boolean
  default?: () => DefaultT | Ref<DefaultT>
  getCachedData?: any
  transform?: any
  // pick?: PickKeys TODO: understand why this breaks everything
  watch?: MultiWatchSources
  immediate?: boolean
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
}

export function myComposable <T extends object = any> () {
  const client = useDirectusRest<T>()

  async function readItems <
      Collection extends RegularCollections<T>,
      TQuery extends Query<T, CollectionType<T, Collection>>
    > (
    collection: MaybeRef<Collection>,
    _params?: FakeAsyncDataOptions & { key?: string, query?: RecursiveMaybeRef<TQuery>}
  ) {
    const { key, query, ...params } = _params ?? {}
    const _key = computed(() => {
      return key ?? 'D_' + hash(['readItems', collection, recursiveUnref(query)])
    })

    return await useAsyncData(_key.value, () => client.request(sdkReadItems(toValue(collection), reactive(query ?? {}))), params)
  }

  return {
    client,
    readItems
  }
}
