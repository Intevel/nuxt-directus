import { hash } from 'ohash'
import {
  readRevision as sdkReadRevision,
  readRevisions as sdkReadRevisions
} from '@directus/sdk'
import type {
  DirectusRestConfig,
  DirectusRevision,
  DirectusRevisionsOptionsAsyncData,
  Query
} from '../types'
import { useDirectusRest } from './use-directus'
import { type Ref, useAsyncData, computed, toRef, unref } from '#imports'

export function useDirectusRevisions<TSchema extends object> (config?: Partial<DirectusRestConfig>) {
  const client = useDirectusRest<TSchema>(config)

  /**
   * List an existing Revision by primary key.
   *
   * @param key The primary key of the dashboard.
   * @param query The query parameters.
   *
   * @returns Returns a Revision object if a valid primary key was provided.
   *
   * @throws Will throw if key is empty.
   */
  async function readRevision<
    TQuery extends Query<TSchema, DirectusRevision<TSchema>>
  > (
    id: DirectusRevision<TSchema>['id'] | Ref<DirectusRevision<TSchema>['id']>,
    params?: DirectusRevisionsOptionsAsyncData<TQuery>
  ) {
    const idRef = toRef(id) as Ref<DirectusRevision<TSchema>['id']>
    const key = computed(() => {
      return hash(['readRevision', unref(idRef), params?.toString()])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      () => client.request(sdkReadRevision(idRef.value, params?.query)),
      params?.params
    )
  }

  /**
   * List all Revisions that exist in Directus.
   *
   * @param query The query parameters.
   *
   * @returns An array of up to limit Revision objects. If no items are available, data will be an empty array.
   */
  async function readRevisions<
    TQuery extends Query<TSchema, DirectusRevision<TSchema>>
  > (params?: DirectusRevisionsOptionsAsyncData<TQuery>) {
    const key = computed(() => {
      return hash(['readRevisions', params?.toString()])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      () => client.request(sdkReadRevisions(params?.query)),
      params?.params
    )
  }

  return {
    client,
    readRevision,
    readRevisions
  }
}
