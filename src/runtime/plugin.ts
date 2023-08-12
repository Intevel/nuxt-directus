import { createDirectus } from '@directus/sdk'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { directus: options } = useRuntimeConfig().public

  const directus = createDirectus(options.url)

  return {
    provide: {
      directus
    }
  }
})
