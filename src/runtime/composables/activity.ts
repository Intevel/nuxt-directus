import type { FetchError, MappedResponseType, ResponseType } from 'ofetch'

import type {
  KeysOf,
  PickFrom,
  HttpResponseError,
  DirectusFetchParams,
  UseDirectusFetchParams,
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
    DefaultT = undefined,
  >(
    comment: MaybeRef<ResT>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('activity', 'comment'), {
      ...options,
      query: undefined,
      params: undefined,
      body: comment,
      method: 'POST',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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
    DefaultT = undefined,
  >(
    id: MaybeRef<ActivityObject['id']>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('activity', undefined, toValue(id)), {
      ...options,
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
    ResT extends ActivityObject[],
    DataT = ResT,
    DefaultT = undefined,
  >(
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('activity'), {
      ...options,
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
    DefaultT = undefined,
  >(
    id: MaybeRef<ActivityObject['id']>,
    comment: MaybeRef<ResT>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('activity', 'comment', toValue(id)), {
      ...options,
      query: undefined,
      params: undefined,
      body: comment,
      method: 'PATCH',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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
    DefaultT = undefined,
  >(
    id: MaybeRef<ActivityObject['id']>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('activity', 'comment', toValue(id)), {
      ...options,
      query: undefined,
      params: undefined,
      method: 'DELETE',
      immediate: options?.immediate === undefined ? false : options.immediate,
      watch: options?.watch === undefined ? false : options.watch,
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
