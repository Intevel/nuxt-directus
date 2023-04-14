import { useDirectusAuth } from './composables/useDirectusAuth'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  if (config.public.directus.autoFetch) {
    const { fetchUser } = useDirectusAuth()

    await fetchUser()
  }
})
