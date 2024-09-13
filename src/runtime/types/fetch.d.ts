import type { FetchOptions, ResponseType } from 'ofetch'

export * from '#directus/utils/fetch-options'

export type DirectusEndpoints = 'activity' | 'collections' | 'items' | 'notifications' | 'revisions' | 'translations'

export type DirectusMethods = 'get' | 'post' | 'patch' | 'delete' | 'search'

export interface DirectusQueryParams {
  fields?: Array<string>
  sort?: string | Array<string>
  filter?: Record<string, unknown>
  limit?: number
  offset?: number
  page?: number
  alias?: string | Array<string>
  deep?: Record<string, unknown>
  search?: string
}

export type DirectusFetchOptions<R extends ResponseType = ResponseType> = FetchOptions<R>

export type DirectusFetchParams<
  R extends ResponseType = ResponseType,
> = DirectusQueryParams
& Omit<FetchOptions<R>, 'method' | 'params' | 'query' | 'body'>

export interface HttpResponseError {
  errors: {
    message: string
    extensions: {
      code: 'FORBIDDEN' | string
      path?: string
    }
  }[]
}

// TODO: check if HttpResponseOk is needed
