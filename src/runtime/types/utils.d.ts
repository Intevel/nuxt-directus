import type { KeysOf } from 'nuxt/dist/app/composables/asyncData'
import type { AsyncDataOptions } from '#app'
import type { MaybeRefOrGetter } from '#imports'

type ShallowMaybeRefOrGetter<T> = {
  [P in keyof T]: MaybeRefOrGetter<T[P]>
}

export type ReadAsyncOptions<O> = Omit<AsyncDataOptions<O, O, KeysOf<O>, O>, 'pick'> & { key?: string }
export type ReadAsyncOptionsWithQuery<O, Q> = ReadAsyncOptions<O> & { query?: ShallowMaybeRefOrGetter<Q> | MaybeRefOrGetter<Q> }
export type ReadAsyncDataReturn<O> = Promise<AsyncData<O, NuxtError<O> | null>>

export type SDKReturn<O> = Promise<Record<string, any> | RestCommand<O, TSchema>>
