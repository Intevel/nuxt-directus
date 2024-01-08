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
import { useAsyncData, computed, toRef, unref } from '#imports'

export function useDirectusFiles<TSchema extends object> (config?: Partial<DirectusRestConfig>) {
  const client = useDirectusRest<TSchema>(config)

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
