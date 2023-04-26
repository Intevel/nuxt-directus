import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { useDirectusAuth } from './composables/useDirectusAuth'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  if (config.public.directus.autoFetch) {
    const { fetchUser } = useDirectusAuth()

    await fetchUser()
  }
})
