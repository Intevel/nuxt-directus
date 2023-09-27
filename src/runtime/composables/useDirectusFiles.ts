import type {
  DirectusClientConfig,
  DirectusFile,
  DirectusFilesOptions,
  Query
} from '../types'
import {
  uploadFiles as sdkUploadFiles,
  importFile as sdkImportFile,
  readFile as sdkReadFile,
  readFiles as sdkReadFiles,
  updateFile as sdkUpdateFile,
  updateFiles as sdkUpdateFiles,
  deleteFile as sdkDeleteFile,
  deleteFiles as sdkDeleteFiles,
} from '@directus/sdk'

export function useDirectusFiles<TSchema extends object> (useStaticToken?: boolean | string) {
  const client = (useStaticToken?: boolean | string) => {
    return useDirectusRest<TSchema>({
      useStaticToken
    })
  }

  async function uploadFiles <
    TQuery extends Query<TSchema, DirectusFile<TSchema>>
  > (
    data: FormData,
    params?: DirectusFilesOptions<TQuery>
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkUploadFiles(data, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't upload files", error.errors)
      } else {
        // eslint-disable-next-line no-console
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
      return await client(params?.useStaticToken || useStaticToken).request(sdkImportFile(url, data, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't import file", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  async function readFile <
    TQuery extends Query<TSchema, DirectusFile<TSchema>>
  > (
    id: DirectusFile<TSchema>['id'],
    params?: DirectusFilesOptions<TQuery>
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkReadFile(id, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't read file", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  async function readFiles <
    TQuery extends Query<TSchema, DirectusFile<TSchema>>
  > (
    params?: DirectusFilesOptions<TQuery>
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkReadFiles(params?.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't read files", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  async function updateFile <
    TQuery extends Query<TSchema, DirectusFile<TSchema>>
  > (
    id: DirectusFile<TSchema>['id'],
    item: Partial<DirectusFile<TSchema>>,
    params?: DirectusFilesOptions<TQuery>
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkUpdateFile(id, item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't update file", error.errors)
      } else {
        // eslint-disable-next-line no-console
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
      return await client(params?.useStaticToken || useStaticToken).request(sdkUpdateFiles(id, item, params?.query))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't update files", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  async function deleteFile (
    id: DirectusFile<TSchema>['id'],
    params?: DirectusClientConfig
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkDeleteFile(id))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't delete file", error.errors)
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  async function deleteFiles (
    id: DirectusFile<TSchema>['id'][],
    params?: DirectusClientConfig
  ) {
    try {
      return await client(params?.useStaticToken || useStaticToken).request(sdkDeleteFiles(id))
    } catch (error: any) {
      if (error && error.message) {
        // eslint-disable-next-line no-console
        console.error("Couldn't delete files", error.errors)
      } else {
        // eslint-disable-next-line no-console
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
