import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { user, tokens, refreshTokens } = useDirectusAuth()
  const { refreshToken } = useDirectusTokens()
  const { useNuxtCookies } = useRuntimeConfig().public.directus.cookieConfigs
  
  // TODO: check for cookies, to avoid unnecessary requests
  async function checkUserAuth () {
    if (process.client) {
      if ((!tokens.value?.access_token || !user.value) && (useNuxtCookies ? refreshToken().value : true)) {
        await refreshTokens().catch((error) => error)
      }
    }
  }

  await checkUserAuth()
})
