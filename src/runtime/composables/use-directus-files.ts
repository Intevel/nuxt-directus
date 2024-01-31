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
  DirectusRestConfig,
  DirectusFile,
  DirectusFilesOptions,
  DirectusFilesOptionsAsyncData,
  Query
} from '../types'
import { useDirectusRest } from './use-directus'
import { type Ref, useAsyncData, computed, toRef, unref } from '#imports'

export function useDirectusFiles<TSchema extends object> (config?: Partial<DirectusRestConfig>) {
  const client = useDirectusRest<TSchema>(config)

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
    params?: DirectusFilesOptions<TQuery>
  ) {
    try {
      return await client.request(sdkUploadFiles(data, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't upload files.", error.message)
      } else {
        console.error(error)
      }
    }
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
    params?: DirectusFilesOptions<TQuery>
  ) {
    try {
      return await client.request(sdkImportFile(url, data, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't import file.", error.message)
      } else {
        console.error(error)
      }
    }
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
    id: Ref<DirectusFile<TSchema>['id']>| DirectusFile<TSchema>['id'],
    params?: DirectusFilesOptionsAsyncData<TQuery>
  ) {
    const idRef = toRef(id) as Ref<DirectusFile<TSchema>['id']>
    const key = computed(() => {
      return hash([
        'readFile',
        unref(idRef),
        params?.toString()
      ])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      () => client.request(sdkReadFile(idRef.value, params?.query)),
      params?.params
    )
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
    params?: DirectusFilesOptionsAsyncData<TQuery>
  ) {
    const key = computed(() => {
      return hash([
        'readFiles',
        params?.toString()
      ])
    })
    return await useAsyncData(
      params?.key ?? key.value,
      () => client.request(sdkReadFiles(params?.query)),
      params?.params
    )
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
    params?: DirectusFilesOptions<TQuery>
  ) {
    try {
      return await client.request(sdkUpdateFile(id, item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update file.", error.message)
      } else {
        console.error(error)
      }
    }
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
    params?: DirectusFilesOptions<TQuery>
  ) {
    try {
      return await client.request(sdkUpdateFiles(id, item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't update files.", error.message)
      } else {
        console.error(error)
      }
    }
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
    try {
      return await client.request(sdkDeleteFile(id))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't delete file.", error.message)
      } else {
        console.error(error)
      }
    }
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
    try {
      return await client.request(sdkDeleteFiles(id))
    } catch (error: any) {
      if (error && error.message) {
        console.error("Couldn't delete files.", error.message)
      } else {
        console.error(error)
      }
    }
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
