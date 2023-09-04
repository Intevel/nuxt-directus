import { createDirectus } from '@directus/sdk'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { fetchUser, refreshTokens } = useDirectusAuth()
  const { refreshToken, accessToken } = useDirectusCookie()
  const user = useDirectusUser()

  async function checkIfAccessTokenExpired () {
    if (!accessToken().value && refreshToken().value) {
      await refreshTokens()
    }
  }

  async function checkIfUserExists () {
    if (!user.value && accessToken().value) {
      await fetchUser()
    }
  }

  // do the checks server-side, instead of using hook 'app:created',
  // as this hook is not called on SSR=true (static generation)
  await checkIfAccessTokenExpired()
  await checkIfUserExists()

  nuxtApp.hook('page:start', async () => {
    if (process.client) {
      await checkIfUserExists()
    }
  })
})
