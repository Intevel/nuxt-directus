import type { FetchError, MappedResponseType, ResponseType } from 'ofetch'

import type {
  KeysOf,
  PickFrom,
  HttpResponseError,
  DirectusFetchParams,
  DirectusUseFetchParams,
} from '#directus/types'
import {
  directusPath,
  destructureFetchParams,
} from '#directus/utils/fetch-options'

import type { AsyncData } from '#app'
import {
  type MaybeRef,
  toValue,
  useDirectusFetch,
  useNuxtApp,
} from '#imports'

export type ActivityObject = {
  action: string
  collection: string
  comment: string | null
  id: number
  ip: string
  item: string
  timestamp: string
  user: string
  user_agent: string
  revisions: number[]
}

export type CommentObject = {
  collecion: string
  item: string | number
  comment: string
}

export function useDirectusActivity() {
  const { $directusFetch } = useNuxtApp()

  function $createComment<
    T extends CommentObject,
    R extends ResponseType = ResponseType,
  >(
    comment: MaybeRef<T>,
    options?: DirectusFetchParams<R>,
  ): Promise<MappedResponseType<R, T>> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('activity', 'comment'), {
      ...fetchOptions,
      query: undefined,
      params: undefined,
      body: toValue(comment),
      method: 'POST',
    })
  }

  function createComment<
    ResT extends CommentObject,
    DataT = ResT,
  >(
    comment: MaybeRef<ResT>,
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('activity', 'comment'), {
      ...fetchOptions,
      query: undefined,
      params: undefined,
      body: toValue(comment),
      method: 'POST',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $readActivity<
    R extends ResponseType = ResponseType,
  >(
    id: ActivityObject['id'],
    options?: DirectusFetchParams<R>,
  ): Promise<MappedResponseType<R, ActivityObject>> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<ActivityObject, R>(directusPath('activity', undefined, id), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function readActivity<
    ResT extends ActivityObject,
    DataT = ResT,
  >(
    id: ActivityObject['id'],
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const fetchOptions = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('activity', undefined, id), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function $readActivities<
    R extends ResponseType = ResponseType,
  >(
    options?: DirectusFetchParams<R>,
  ): Promise<MappedResponseType<R, ActivityObject[] | []>> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<ActivityObject[], R>(directusPath('activity'), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function readActivities<
    ResT extends ActivityObject[] | [],
    DataT = ResT,
  >(
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const fetchOptions = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('activity'), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function $updateComment<
    T extends Pick<CommentObject, 'comment'>,
    R extends ResponseType = ResponseType,
  >(
    id: ActivityObject['id'],
    comment: MaybeRef<T>,
    options?: DirectusFetchParams<R>,
  ): Promise<MappedResponseType<R, T>> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<T, R>(directusPath('activity', 'comment', id), {
      ...fetchOptions,
      query: undefined,
      params: undefined,
      body: toValue(comment),
      method: 'PATCH',
    })
  }

  function updateComment<
    ResT extends Pick<CommentObject, 'comment'>,
    DataT = ResT,
  >(
    id: ActivityObject['id'],
    comment: MaybeRef<ResT>,
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('activity', 'comment', id), {
      ...fetchOptions,
      query: undefined,
      params: undefined,
      body: toValue(comment),
      method: 'PATCH',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  function $deleteComment<
    R extends ResponseType = ResponseType,
  >(
    id: ActivityObject['id'],
    options?: DirectusFetchParams<R>,
  ): Promise<MappedResponseType<R, null>> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<null, R>(directusPath('activity', 'comment', id), {
      ...fetchOptions,
      query: undefined,
      params: undefined,
      method: 'DELETE',
    })
  }

  function deleteComment<
    ResT extends null,
    DataT = ResT,
  >(
    id: ActivityObject['id'],
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const { immediate, watch, ...fetchOptions } = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('activity', 'comment', id), {
      ...fetchOptions,
      query: undefined,
      params: undefined,
      method: 'DELETE',
      immediate: immediate === undefined ? false : immediate,
      watch: watch === undefined ? false : watch,
    })
  }

  return {
    $createComment,
    createComment,
    $readActivity,
    readActivity,
    $readActivities,
    readActivities,
    $updateComment,
    updateComment,
    $deleteComment,
    deleteComment,
  }
}
