import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { user, refreshTokens } = useDirectusAuth()
  const { refreshToken } = useDirectusTokens()
  
  // TODO: check for cookies, to avoid unnecessary requests
  async function checkUserAuth () {
    if (process.client) {
      if (!user.value && refreshToken().value) {
        await refreshTokens().catch((error) => error)
      }
    }
  }

  await checkUserAuth()
})
