import {
  DirectusFieldRequest,
  DirectusFieldCreation,
  DirectusFieldUpdate,
  DirectusFieldsRequest,
  DirectusField
} from '../types'
import { useDirectus } from './useDirectus'

export const useDirectusFields = () => {
  const directus = useDirectus()

  const getFields = async (
    data: DirectusFieldsRequest
  ): Promise<DirectusField[]> => {
    const fields = await directus<{ data: DirectusField[] }>(
      `/fields/${data.collection}`,
      {
        method: 'GET'
      }
    )
    return fields.data
  }

  const getField = async (data: DirectusFieldRequest): Promise<DirectusField> => {
    if (!data.field) {
      throw new Error('Field name is required')
    }
    const field = await directus<{ data: DirectusField }>(
      `/fields/${data.collection}/${data.field}`,
      {
        method: 'GET'
      }
    )
    return field.data
  }

  const createField = async (data: DirectusFieldCreation): Promise<DirectusField> => {
    const field = await directus<{ data: DirectusField }>(`/fields/${data.collection}`, {
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

  const updateField = async (data: DirectusFieldUpdate): Promise<DirectusField> => {
    const field = await directus<{ data: DirectusField }>(
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

  const deleteField = async (data: DirectusFieldRequest): Promise<void> => {
    if (!data.field) {
      throw new Error('Field name is required')
    }
    await directus(
      `/fields/${data.collection}/${data.field}`,
      {
        method: 'DELETE'
      }
    )
  }

  return {
    getFields,
    getField,
    createField,
    updateField,
    deleteField
  }
}
