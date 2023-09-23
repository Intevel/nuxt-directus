import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { user, refreshTokens } = useDirectusAuth()
  const { refreshToken } = useDirectusTokens()
  const { useNuxtCookies } = useRuntimeConfig().public.directus.cookieConfigs
  
  // TODO: check for cookies, to avoid unnecessary requests
  async function checkUserAuth () {
    if (process.client) {
      if (!user.value && (useNuxtCookies ? refreshToken().value : true)) {
        await refreshTokens().catch((error) => error)
      }
    }
  }

  await checkUserAuth()
})
