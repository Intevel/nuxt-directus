export * from '@directus/sdk'

export interface DirectusItemRequestOptions {
  id?: string | number
  query?: DirectusQueryParams
  key?: string
}