import type { AsyncDataOptions } from '#app'
import { MaybeRefOrGetter } from '#imports'
import type { M } from '@directus/sdk/dist/types-ZBNrmR-A'
import type { KeysOf } from 'nuxt/dist/app/composables/asyncData'

type ShallowMaybeRefOrGetter<T> = {
  [P in keyof T]: MaybeRefOrGetter<T[P]>
}

export type ReadAsyncOptions<O> = Omit<AsyncDataOptions<O, O, KeysOf<O>, O>, 'pick'> & { key?: string }
export type ReadAsyncOptionsWithQuery<O, Q> = ReadAsyncOptions<O> & { query?: ShallowMaybeRefOrGetter<Q> | MaybeRefOrGetter<Q> }

export type SDKReturn<O> = Promise<Record<string, any> | RestCommand<O, TSchema>>
