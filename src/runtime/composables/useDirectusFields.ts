import {
  DirectusFieldRequest,
  DirectusFieldCreation,
  DirectusFieldUpdate,
  DirectusFieldsRequest
} from '../types'
import { useDirectus } from './useDirectus'

export const useDirectusFields = () => {
  const directus = useDirectus()

  const getFields = async <T>(
    data: DirectusFieldsRequest
  ): Promise<T> => {
    const fields = await directus<{ data: T }>(
      `/fields/${data.collection}`,
      {
        method: 'GET'
      }
    )
    return fields.data
  }

  const getField = async <T>(data: DirectusFieldRequest): Promise<T> => {
    if (!data.field) {
      throw new Error('Field name is required')
    }
    const field = await directus<{ data: T }>(
      `/fields/${data.collection}/${data.field}`,
      {
        method: 'GET'
      }
    )
    return field.data
  }

  const createField = async <T>(data: DirectusFieldCreation): Promise<T> => {
    const field = await directus<{ data: T }>(`/fields/${data.collection}`, {
      method: 'POST',
      body: {
        field: data.field,
        type: data.type,
        meta: data.meta,
        schema: data.schema
      }
    })
    return field.data
  }

  const updateField = async <T>(data: DirectusFieldUpdate): Promise<T> => {
    const field = await directus<{ data: T }>(
      `/fields/${data.collection}/${data.field}`,
      {
        method: 'PATCH',
        body: {
          meta: data.meta,
          schema: data.schema
        }
      }
    )
    return field.data
  }

  const deleteField = async <T>(data: DirectusFieldRequest): Promise<T> => {
    if (!data.field) {
      throw new Error('Field name is required')
    }
    const field = await directus<{ data: T }>(
      `/fields/${data.collection}/${data.field}`,
      {
        method: 'DELETE'
      }
    )
    return field.data
  }

  return {
    getFields,
    getField,
    createField,
    updateField,
    deleteField
  }
}
