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

export function useDirectusActivity() {
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
  >(
    id: RevisionObject['id'],
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const fetchOptions = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('revisions', undefined, id), {
      ...fetchOptions,
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
    ResT extends RevisionObject[] | [],
    DataT = ResT,
  >(
    options?: DirectusUseFetchParams<ResT, DataT>,
  ): AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, FetchError<HttpResponseError> | null> {
    const fetchOptions = destructureFetchParams(options)

    return useDirectusFetch<ResT, DataT>(directusPath('revisions'), {
      ...fetchOptions,
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
