import type { KeysOf } from 'nuxt/dist/app/composables/asyncData'
import type { AsyncDataOptions } from '#app'
import type { MaybeRefOrGetter } from '#imports'

type ShallowMaybeRefOrGetter<T> = {
  [P in keyof T]: MaybeRefOrGetter<T[P]>
}

export type ReadAsyncOptions<ResT, DataT = ResT> = AsyncDataOptions<ResT, DataT> & { key?: string }
export type ReadAsyncOptionsWithQuery<O, Q> = ReadAsyncOptions<O> & { query?: ShallowMaybeRefOrGetter<Q> | MaybeRefOrGetter<Q> }
export type ReadAsyncDataReturn<O> = Promise<AsyncData<O, NuxtError<O> | null>>

export type SDKReturn<O> = Promise<Record<string, any> | RestCommand<O, TSchema>>
