import { DirectusQueryParams, DirectusRevision } from '../types'
import { useDirectus } from './useDirectus'

export const useDirectusRevisions = () => {
  const directus = useDirectus()

  const getRevisions = async <T>(data: {
    params: DirectusQueryParams;
  }): Promise<T[]> => {
    if (data.params?.filter) {
      (data.params.filter as unknown) = JSON.stringify(data.params.filter)
    }
    if (data.params?.deep) {
      (data.params.deep as unknown) = JSON.stringify(data.params.deep)
    }
    const revisions = await directus<{ data: T[] }>('/revisions', {
      method: 'GET',
      params: data.params
    })
    return revisions.data
  }

  const getRevisionById = async <T>(data: {
    id: number;
    params: DirectusQueryParams;
  }): Promise<T[]> => {
    const revisions = await directus<{ data: T[] }>(
      `/revisions/${data.id}`,
      {
        method: 'GET',
        params: data.params
      }
    )
    return revisions.data
  }

  return {
    getRevisionById,
    getRevisions
  }
}
