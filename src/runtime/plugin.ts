import { createDirectus } from '@directus/sdk'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { rest } from '@directus/sdk/rest'
import { authentication } from '@directus/sdk/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const { directus: options } = useRuntimeConfig().public

  const directus = createDirectus(options.url).with(rest()).with(authentication())

  return {
    provide: {
      directus
    }
  }
})
