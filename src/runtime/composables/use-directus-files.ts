import { hash } from 'ohash'
import {
  uploadFiles as sdkUploadFiles,
  importFile as sdkImportFile,
  readFile as sdkReadFile,
  readFiles as sdkReadFiles,
  updateFile as sdkUpdateFile,
  updateFiles as sdkUpdateFiles,
  deleteFile as sdkDeleteFile,
  deleteFiles as sdkDeleteFiles
} from '@directus/sdk'
import type {
  DirectusFile,
  Query
} from '@directus/sdk'
import type {
  DirectusRestConfig,
  DirectusFilesOptions
} from '../types'
import { recursiveUnref } from './internal-utils/recursive-unref'
import { computed, ref, useDirectusRest, useNuxtApp, useNuxtData } from '#imports'

export function useDirectusFiles<TSchema extends object = any> (config?: Partial<DirectusRestConfig>) {
  const client = useDirectusRest<TSchema>(config)
  const { runWithContext } = useNuxtApp()

  /**
   * Upload/create a new file.
   *
   * @param data Formdata object.
   * @param query The query parameters.
   *
   * @returns Returns the file object for the uploaded file, or an array of file objects if multiple files were uploaded at once.
   */
  async function uploadFiles <
    TQuery extends Query<TSchema, DirectusFile<TSchema>>
  > (
    data: FormData,
    query?: TQuery
  ) {
    return await client.request(sdkUploadFiles(data, query))
  }

  /**
   * Import a file from the web.
   *
   * @param url The url to import the file from.
   * @param data Formdata object.
   * @param query The query parameters.
   *
   * @returns Returns the file object for the imported file.
   */
  async function importFile <
    TQuery extends Query<TSchema, DirectusFile<TSchema>>
  > (
    url: string,
    data: Partial<DirectusFile<TSchema>>,
    query?: TQuery
  ) {
    return await client.request(sdkImportFile(url, data, query))
  }

  /**
   * Retrieve a single file by primary key.
   *
   * @param key The primary key of the file.
   * @param query The query parameters.
   *
   * @returns Returns a file object if a valid primary key was provided.
   *
   * @throws Will throw if key is empty.
   */
  async function readFile <
    TQuery extends Query<TSchema, DirectusFile<TSchema>>
  > (
    id: DirectusFile<TSchema>['id'],
    _query?: DirectusFilesOptions<TQuery>
  ) {
    const { nuxtData, ...query } = _query ?? {}
    const key = computed(() => {
      if (typeof nuxtData === 'string') {
        return nuxtData
      } else {
        return 'D_' + hash(['readFile', id, recursiveUnref(query)])
      }
    })
    const promise = runWithContext(() => client.request(sdkReadFile(id, query)))

    const { data } = nuxtData !== false
      ? useNuxtData<Awaited<typeof promise>>(key.value)
      : { data: ref<Awaited<typeof promise>>() }

    if (data.value) {
      return data.value
    } else {
      // @ts-ignore TODO: check why Awaited is creating problems
      data.value = await promise.catch((e: any) => {
        if (e && e.message) {
          console.error("Couldn't read file:", e.message)
          return null
        } else {
          console.error(e)
          return null
        }
      })
      return data.value
    }
  }

  /**
 * List all files that exist in Directus.
 *
 * @param query The query parameters.
 *
 * @returns An array of up to limit file objects. If no items are available, data will be an empty array.
 */
  async function readFiles <
    TQuery extends Query<TSchema, DirectusFile<TSchema>>
  > (
    _query?: DirectusFilesOptions<TQuery>
  ) {
    const { nuxtData, ...query } = _query ?? {}
    const key = computed(() => {
      if (typeof nuxtData === 'string') {
        return nuxtData
      } else {
        return 'D_' + hash(['readFiles', recursiveUnref(query)])
      }
    })
    const promise = runWithContext(() => client.request(sdkReadFiles(query)))

    const { data } = nuxtData !== false
      ? useNuxtData<Awaited<typeof promise>>(key.value)
      : { data: ref<Awaited<typeof promise>>() }

    if (data.value) {
      return data.value
    } else {
      data.value = await promise.catch((e: any) => {
        if (e && e.message) {
          console.error("Couldn't read files:", e.message)
          return null
        } else {
          console.error(e)
          return null
        }
      })
      return data.value
    }
  }

  /**
   * Update an existing file, and/or replace it's file contents.
   *
   * @param key The primary key of the file.
   * @param item
   * @param query The query parameters.
   *
   * @returns Returns the file object for the updated file.
   *
   * @throws Will throw if key is empty.
   */
  async function updateFile <
    TQuery extends Query<TSchema, DirectusFile<TSchema>>
  > (
    id: DirectusFile<TSchema>['id'],
    item: Partial<DirectusFile<TSchema>>,
    query?: TQuery
  ) {
    return await client.request(sdkUpdateFile(id, item, query))
  }

  /**
   * Update multiple files at the same time.
   *
   * @param keys The primary key of the file.
   * @param item
   * @param query The query parameters.
   *
   * @returns Returns the file objects for the updated files.
   *
   * @throws Will throw if keys is empty
   */
  async function updateFiles <
    TQuery extends Query<TSchema, DirectusFile<TSchema>>
  > (
    id: DirectusFile<TSchema>['id'][],
    item: Partial<DirectusFile<TSchema>>,
    query?: TQuery
  ) {
    return await client.request(sdkUpdateFiles(id, item, query))
  }

  /**
   * Delete an existing file.
   *
   * @param key The primary key of the file.
   *
   * @returns Nothing.
   *
   * @throws Will throw if key is empty.
   */
  async function deleteFile (
    id: DirectusFile<TSchema>['id']
  ) {
    return await client.request(sdkDeleteFile(id))
  }

  /**
 * Delete multiple files at once.
 *
 * @param keys The primary keys of the files
 *
 * @returns Nothing.
 *
 * @throws Will throw if keys is empty.
 */
  async function deleteFiles (
    id: DirectusFile<TSchema>['id'][]
  ) {
    return await client.request(sdkDeleteFiles(id))
  }

  return {
    client,
    uploadFiles,
    importFile,
    readFile,
    readFiles,
    updateFile,
    updateFiles,
    deleteFile,
    deleteFiles
  }
}
