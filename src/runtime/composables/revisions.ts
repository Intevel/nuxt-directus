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

export type RevisionObject = {
  id: number
  timestamp: string
  status: string
  recipient: string
  sender: string
  subject: string
  message: string
  collection: string
  item: string
}

export function useDirectusRevisions() {
  const { $directusFetch } = useNuxtApp()

  function $readRevision<
    R extends ResponseType = ResponseType,
  >(
    id: RevisionObject['id'],
    options?: DirectusFetchParams<R>,
  ): Promise<MappedResponseType<R, RevisionObject>> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<RevisionObject, R>(directusPath('revisions', undefined, id), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function readRevision<
    ResT extends RevisionObject,
    DataT = ResT,
    DefaultT = undefined,
  >(
    id: MaybeRef<RevisionObject['id']>,
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(() => directusPath('revisions', undefined, toValue(id)), {
      ...options,
      method: 'GET',
    })
  }

  function $readRevisions<
    R extends ResponseType = ResponseType,
  >(
    options?: DirectusFetchParams<R>,
  ): Promise<MappedResponseType<R, RevisionObject[] | []>> {
    const fetchOptions = destructureFetchParams(options)

    return $directusFetch<RevisionObject[], R>(directusPath('revisions'), {
      ...fetchOptions,
      method: 'GET',
    })
  }

  function readRevisions<
    ResT extends RevisionObject[],
    DataT = ResT,
    DefaultT = undefined,
  >(
    options?: UseDirectusFetchParams<ResT, DataT, DefaultT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | DefaultT, FetchError<HttpResponseError> | undefined> {
    return useDirectusFetch<ResT, DataT, DefaultT>(directusPath('revisions'), {
      ...options,
      method: 'GET',
    })
  }

  return {
    $readRevision,
    readRevision,
    $readRevisions,
    readRevisions,
  }
}
