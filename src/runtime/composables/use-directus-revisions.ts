import { hash } from 'ohash'
import {
  readRevision as sdkReadRevision,
  readRevisions as sdkReadRevisions
} from '@directus/sdk'
import type {
  DirectusRevision,
  Query
} from '@directus/sdk'
import type {
  DirectusRestConfig,
  DirectusRevisionsOptions
} from '../types'
import { recursiveUnref } from './internal-utils/recursive-unref'
import { computed, ref, useDirectusRest, useNuxtApp, useNuxtData } from '#imports'

export function useDirectusRevisions<TSchema extends object = any> (config?: Partial<DirectusRestConfig>) {
  const client = useDirectusRest<TSchema>(config)
  const { runWithContext } = useNuxtApp()

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
    id: DirectusRevision<TSchema>['id'],
    _query?: DirectusRevisionsOptions<TQuery>
  ) {
    const { nuxtData, ...query } = _query ?? {}
    const key = computed(() => {
      if (typeof nuxtData === 'string') {
        return nuxtData
      } else {
        return 'D_' + hash(['readRevision', id, recursiveUnref(query)])
      }
    })
    const promise = runWithContext(() => client.request(sdkReadRevision(id, query)))

    const { data } = nuxtData !== false
      ? useNuxtData<Awaited<typeof promise>>(key.value)
      : { data: ref<Awaited<typeof promise>>() }

    if (data.value) {
      return data.value
    } else {
      // @ts-ignore TODO: check why Awaited is creating problems
      data.value = await promise.catch((error: any) => {
        if (error && error.message) {
          console.error("Couldn't read revision:", error.message)
        } else {
          console.error(error)
        }
      })
      return data.value
    }
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
  > (
    _query?: DirectusRevisionsOptions<TQuery>
  ) {
    const { nuxtData, ...query } = _query ?? {}
    const key = computed(() => {
      if (typeof nuxtData === 'string') {
        return nuxtData
      } else {
        return 'D_' + hash(['readRevisions', recursiveUnref(query)])
      }
    })
    const promise = runWithContext(() => client.request(sdkReadRevisions(query)))

    const { data } = nuxtData !== false
      ? useNuxtData<void | Awaited<typeof promise>>(key.value)
      : { data: ref<void | Awaited<typeof promise>>() }

    if (data.value) {
      return data.value
    } else {
      data.value = await promise.catch((error: any) => {
        if (error && error.message) {
          console.error("Couldn't read revisions:", error.message)
        } else {
          console.error(error)
        }
      })
      return data.value
    }
  }

  return {
    client,
    readRevision,
    readRevisions
  }
}
