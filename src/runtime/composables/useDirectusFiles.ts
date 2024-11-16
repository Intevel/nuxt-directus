import { useRuntimeConfig } from '#app'
import {
  DirectusThumbnailOptions,
  DirectusFileRequest
} from '../types'
import { useDirectusUrl } from './useDirectusUrl'
import { useDirectus } from './useDirectus'
import { useDirectusToken } from './useDirectusToken'

export const useDirectusFiles = () => {
  const config = useRuntimeConfig()
  const directusUrl = useDirectusUrl()
  const directus = useDirectus()
  const { token } = useDirectusToken()

  const getFiles = async <T>(data: DirectusFileRequest): Promise<T[]> => {
    if (data.params?.filter) {
      (data.params.filter as unknown) = JSON.stringify(data.params.filter)
    }
    if (data.params?.deep) {
      (data.params.deep as unknown) = JSON.stringify(data.params.deep)
    }

    const files = await directus<{ data: T[] }>('/files/', {
      method: 'GET',
      params: data.params
    })
    return files.data
  }

  const getThumbnail = (
    fileId: string,
    options?: DirectusThumbnailOptions
  ): string => {
    const url = new URL(`${directusUrl}/assets/${fileId}`)
    if (options) {
      if (options.width) { url.searchParams.append('width', options.width.toFixed(0)) }
      if (options.height) { url.searchParams.append('height', options.height.toFixed(0)) }
      if (options.quality) { url.searchParams.append('quality', options.quality.toFixed(0)) }
      if (options.withoutEnlargement) { url.searchParams.append('withoutEnlargement', 'true') }
      if (options.fit) { url.searchParams.append('fit', options.fit) }
      if (options.format) { url.searchParams.append('format', options.format) }
      if (options.key) { url.searchParams.append('key', options.key) }
    }
    if (token && token.value) {
      url.searchParams.append('access_token', token.value)
    } else if (config.public.directus.token) {
      url.searchParams.append('access_token', config.public.directus.token)
    }
    return url.href
  }

  const uploadFiles = async (fileData, options = {}) => {
    try {
      const formData = new FormData();
      
      if (Array.isArray(fileData)) {
        fileData.forEach((file) => {
          formData.append('file[]', file);
        });
      } else {
        formData.append('file', fileData);
      }

      const uploadResponse = await directus("/files", {
        method: "POST",
        body: formData
      });

      const fileId = uploadResponse.data.id;

      if (options.title || options.tags) {
        const updateData = {};
        if (options.title) updateData.title = options.title;
        if (options.tags) updateData.tags = options.tags;

        await directus(`/files/${fileId}`, {
          method: "PATCH",
          body: updateData
        });

        const updatedFile = await directus(`/files/${fileId}`, {
          method: "GET"
        });

        return updatedFile.data;
      }

      return uploadResponse.data;

    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  };

  const deleteFiles = async (fileId) => {
    try {
      if (Array.isArray(fileId)) {
        await directus("/files", {
          method: "DELETE",
          body: fileId
        });
      } else {
        await directus(`/files/${fileId}`, {
          method: "DELETE"
        });
      }
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  };

  return { getFiles, getThumbnail, uploadFiles, deleteFiles }
}
