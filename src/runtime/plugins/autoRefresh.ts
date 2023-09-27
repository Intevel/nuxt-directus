import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { user, tokens, refreshTokens } = useDirectusAuth()
  const { refreshToken } = useDirectusTokens()
  const { useNuxtCookies } = useRuntimeConfig().public.directus.authConfig

  // TODO: check for cookies, to avoid unnecessary requests
  async function checkUserAuth () {
    nuxtApp.hook('app:mounted', async () => {
      if ((!user.value || !tokens.value?.access_token) && (refreshToken().value || !useNuxtCookies)) {
        await refreshTokens()
      }
    })
  }

  await checkUserAuth()
})
