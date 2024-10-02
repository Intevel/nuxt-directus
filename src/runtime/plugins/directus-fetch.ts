import { ofetch } from 'ofetch'

import { createError, defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(({ $config }) => {
  const {
    url,
    staticToken,
  } = $config.public.directus
  if (!url) throw createError({
    statusCode: 500,
    message: 'Missing Directus URL',
  })

  const directusFetch = ofetch.create({
    baseURL: url,
    onRequest({ options }) {
      options.headers ||= {}

      // @ts-expect-error Authorization header wrong type
      if (staticToken && !options.headers.Authorization) {
        // @ts-expect-error Authorization header wrong type
        options.headers.Authorization = `Bearer ${staticToken}`
      }

      // TODO: add user's token
    },
    onResponse({ response }) {
      if (response.status === 200) {
        response._data = response._data.data
      }
    },
  })

  return {
    provide: {
      directusFetch,
    },
  }
})
