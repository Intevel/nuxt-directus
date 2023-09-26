import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async (_nuxtApp) => {
  const { user, tokens, refreshTokens } = useDirectusAuth()
  const { refreshToken } = useDirectusTokens()
  const { useNuxtCookies } = useRuntimeConfig().public.directus.cookieConfigs

  // TODO: check for cookies, to avoid unnecessary requests
  async function checkUserAuth () {
    if (process.client) {
      if ((!user.value || !tokens.value?.access_token) && (refreshToken().value || !useNuxtCookies)) {
        await refreshTokens().catch(error => error)
      }
    }
  }

  await checkUserAuth()
})
