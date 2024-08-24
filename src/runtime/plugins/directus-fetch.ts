import { ofetch } from 'ofetch'

import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxt) => {
  const {
    url,
    staticToken,
  } = nuxt.$config.public.directus

  const directusFetch = ofetch.create({
    baseURL: url,
    onRequest({ options }) {
      options.headers ||= {}

      // @ts-expect-error Authorization header wrong type
      if (staticToken && options.headers.Authorization) {
        // @ts-expect-error Authorization header wrong type
        options.headers.Authorization = staticToken
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
