export * from '#directus/utils/fetch-options'

export type DirectusEndpoints = 'activity' | 'collections' | 'items' | 'notifications' | 'revisions'

export interface HttpResponseError {
  errors: {
    message: string
    extensions: {
      code: 'FORBIDDEN' | string
      path?: string
    }
  }[]
}

// TODO: add HttpResponseOk
