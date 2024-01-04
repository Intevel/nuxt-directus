import { hash } from 'ohash'
import {
  readRevision as sdkReadRevision,
  readRevisions as sdkReadRevisions
} from '@directus/sdk'
import type {
  DirectusRevision,
  DirectusRevisionsOptionsAsyncData,
  Query
} from '../types'
import { useAsyncData, computed, toRef, unref } from '#imports'

export function useDirectusRevisions<TSchema extends object> (
  useStaticToken?: boolean | string
) {
  const client = (useStaticToken?: boolean | string) => {
    return useDirectusRest<TSchema>({
      useStaticToken
    })
  }

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
      async () =>
        await client(params?.useStaticToken || useStaticToken).request(
          sdkReadRevision(idRef.value, params?.query)
        ),
      params?.params
    )
  }

  async function readRevisions<
    TQuery extends Query<TSchema, DirectusRevision<TSchema>>
  > (params?: DirectusRevisionsOptionsAsyncData<TQuery>) {
    const key = computed(() => {
      return hash(['readRevisions', params?.toString()])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      async () =>
        await client(params?.useStaticToken || useStaticToken).request(
          sdkReadRevisions(params?.query)
        ),
      params?.params
    )
  }

  return {
    readRevision,
    readRevisions
  }
}
