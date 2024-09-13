/**
 * The following is a custom implementation of Nuxt's useFetch composable.
 *
 * Source:
 * https://github.com/nuxt/nuxt/blob/52b405b4e8a55ae58384fe3ebfafaed310d6f744/packages/nuxt/src/app/composables/fetch.ts
 */

/* eslint-disable @typescript-eslint/ban-types */
import type { FetchError, FetchOptions, FetchRequest as _FetchRequest } from 'ofetch'
import type { AvailableRouterMethod as _AvailableRouterMethod } from 'nitropack'
import type { MaybeRef, Ref, WatchSource } from 'vue'
import { computed, reactive, toValue } from 'vue'
import { hash } from 'ohash'

import type {
  HttpResponseError,
  DirectusMethods,
  DirectusQueryParams,
} from '#directus/types'

import type { AsyncData, AsyncDataOptions } from '#app'
import { useAsyncData, useNuxtApp } from '#imports'

type MultiWatchSources = (WatchSource<unknown> | object)[]

export type PickFrom<T, K extends Array<string>> = T extends Array<any>
  ? T
  : T extends Record<string, any>
    ? keyof T extends K[number]
      ? T // Exact same keys as the target, skip Pick
      : K[number] extends never
        ? T
        : Pick<T, K[number]>
    : T

export type KeysOf<T> = Array<
  T extends T // Include all keys of union types, not just common keys
    ? keyof T extends string
      ? keyof T
      : never
    : never
>

// Sobstitute for NitroFetchRequest
type FetchRequest = Exclude<_FetchRequest, string> | (string & {})

// support uppercase methods, detail: https://github.com/nuxt/nuxt/issues/22313
type AvailableMethods = DirectusMethods | Uppercase<DirectusMethods>

// Makes useDirectusFetch accept reactive properties
type ComputedOptions<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Function ? T[K] : ComputedOptions<T[K]> | Ref<T[K]> | T[K]
}

interface CustomFetchOptions<M extends AvailableMethods = AvailableMethods> extends FetchOptions, DirectusQueryParams {
  method?: M
}

export interface UseDirectusFetchOptions<
  ResT,
  DataT = ResT,
  DefaultT = undefined,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  M extends AvailableMethods = AvailableMethods,
> extends Omit<AsyncDataOptions<ResT, DataT, PickKeys, DefaultT>, 'watch' | 'deep'>, ComputedOptions<CustomFetchOptions<M>> {
  key?: string
  /**
   * Return data in a deep ref object (it is true by default). It can be set to false to return data in a shallow ref object, which can improve performance if your data does not need to be deeply reactive.
   */
  deepRef?: boolean
  watch?: MultiWatchSources | false
}

export type UseDirectusFetchParams<
  ResT,
  DataT = ResT,
  DefaultT = undefined,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  M extends AvailableMethods = AvailableMethods,
> = Omit<UseDirectusFetchOptions<ResT, DataT, DefaultT, PickKeys, M>, 'method' | 'params' | 'query' | 'body'>

/**
 * Fetch data from an API endpoint with an SSR-friendly composable.
 * @param request The URL to fetch
 * @param opts extends $customFetch options and useAsyncData options
 */
export function useDirectusFetch<
  ResT = void,
  DataT = ResT,
  DefaultT = undefined,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  ErrorT = FetchError<HttpResponseError>,
  ReqT extends FetchRequest = FetchRequest,
  Method extends AvailableMethods = AvailableMethods,
>(
  request: Ref<ReqT> | ReqT | (() => ReqT),
  opts?: UseDirectusFetchOptions<ResT, DataT, DefaultT, PickKeys, Method>
): AsyncData<PickFrom<DataT, PickKeys> | DefaultT, ErrorT | undefined>
export function useDirectusFetch<
  ResT = void,
  DataT = ResT,
  DefaultT = DataT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  ErrorT = FetchError<HttpResponseError>,
  ReqT extends FetchRequest = FetchRequest,
  Method extends AvailableMethods = AvailableMethods,
>(
  request: Ref<ReqT> | ReqT | (() => ReqT),
  opts?: UseDirectusFetchOptions<ResT, DataT, DefaultT, PickKeys, Method>
): AsyncData<PickFrom<DataT, PickKeys> | DefaultT, ErrorT | undefined>
export function useDirectusFetch<
  ResT = void,
  DataT = ResT,
  DefaultT = undefined,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  ErrorT = FetchError<HttpResponseError>,
  ReqT extends FetchRequest = FetchRequest,
  Method extends AvailableMethods = AvailableMethods,
>(
  request: Ref<ReqT> | ReqT | (() => ReqT),
  arg1?: string | UseDirectusFetchOptions<ResT, DataT, DefaultT, PickKeys, Method>,
  arg2?: string,
) {
  const { $directusFetch } = useNuxtApp()
  const [opts = {}, autoKey] = typeof arg1 === 'string' ? [{}, arg1] : [arg1, arg2]

  const _request = computed(() => toValue(request))

  const _key = opts.key || hash([autoKey, typeof _request.value === 'string' ? _request.value : '', ...generateOptionSegments(opts)])
  if (!_key || typeof _key !== 'string') {
    throw new TypeError('[nuxt] [useDirectusFetch] key must be a string: ' + _key)
  }
  if (!request) {
    throw new Error('[nuxt] [useDirectusFetch] request is missing.')
  }

  const key = _key === autoKey ? '$d' + _key : _key

  if (!opts.baseURL && typeof _request.value === 'string' && (_request.value[0] === '/' && _request.value[1] === '/')) {
    throw new Error('[nuxt] [useDirectusFetch] the request URL must not start with "//".')
  }

  const {
    // AsyncData
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    watch,
    immediate,
    getCachedData,
    deepRef,
    dedupe,
    // Directus
    fields,
    sort,
    filter,
    limit,
    offset,
    page,
    alias,
    deep,
    search,
    // $fetch
    ...fetchOptions
  } = opts

  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === 'boolean' ? undefined : opts.cache,
  })

  _fetchOptions.params = reactive({
    fields,
    sort,
    filter,
    limit,
    offset,
    page,
    alias,
    deep,
    search,
  })

  const _asyncDataOptions: AsyncDataOptions<ResT, DataT, PickKeys, DefaultT> = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    immediate,
    getCachedData,
    deep: deepRef,
    dedupe,
    watch: watch === false ? [] : [_fetchOptions, _request, ...(watch || [])],
  }

  if (import.meta.dev && import.meta.client) {
    // @ts-expect-error private property
    _asyncDataOptions._functionName = opts._functionName || 'useDirectusFetch'
  }

  let controller: AbortController

  const asyncData = useAsyncData<ResT, ErrorT, DataT, PickKeys, DefaultT>(key, () => {
    controller?.abort?.('Request aborted as another request to the same endpoint was initiated.')
    controller = typeof AbortController !== 'undefined' ? new AbortController() : {} as AbortController

    /**
     * Workaround for `timeout` not working due to custom abort controller
     * TODO: remove this when upstream issue is resolved
     * @see https://github.com/unjs/ofetch/issues/326
     * @see https://github.com/unjs/ofetch/blob/bb2d72baa5d3f332a2185c20fc04e35d2c3e258d/src/fetch.ts#L152
     */
    const timeoutLength = toValue(opts.timeout)
    let timeoutId: NodeJS.Timeout
    if (timeoutLength) {
      timeoutId = setTimeout(() => controller.abort('Request aborted due to timeout.'), timeoutLength)
      controller.signal.onabort = () => clearTimeout(timeoutId)
    }

    return $directusFetch(_request.value, { signal: controller.signal, ..._fetchOptions } as any)
      .finally(() => { clearTimeout(timeoutId) }) as Promise<ResT>
  }, _asyncDataOptions)

  return asyncData
}

function generateOptionSegments<_ResT, DataT, DefaultT>(opts: UseDirectusFetchOptions<_ResT, DataT, DefaultT, any, any>) {
  const segments: Array<string | undefined | Record<string, string>> = [
    toValue(opts.method as MaybeRef<string | undefined> | undefined)?.toUpperCase() || 'GET',
    toValue(opts.baseURL),
  ]
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj)
    if (!obj) continue

    const unwrapped: Record<string, string> = {}
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value)
    }
    segments.push(unwrapped)
  }
  return segments
}
