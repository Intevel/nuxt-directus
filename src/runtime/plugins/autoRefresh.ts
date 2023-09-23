import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { user, refreshTokens } = useDirectusAuth()
  
  // TODO: check for cookies, to avoid unnecessary requests
  async function checkUserAuth () {
    if (process.client) {
      if (!user.value) {
        await refreshTokens().catch((error) => error)
      }
    }
  }

  await checkUserAuth()
})
