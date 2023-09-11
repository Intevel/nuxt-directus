import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { fetchUser, refreshTokens } = useDirectusAuth()
  const { accessToken, refreshToken } = useDirectusCookie()
  const user = useDirectusUser()

  async function checkUserAuth () {
    if (!user.value && accessToken().value) {
      await fetchUser().catch(async (e) => {
        if (e.errors[0].extensions.code === 'TOKEN_EXPIRED') {
          nuxtApp.runWithContext(async () => await refreshTokens()).catch((e) => {
            if (e.errors[0].extensions.code === 'TOKEN_EXPIRED') {
              accessToken().value = null
              refreshToken().value = null
            }
          })
        }
      })
    }
  }

  // do the checks server-side, instead of using hook 'app:created',
  // as this hook is not called on SSR=true (static generation)
  await checkUserAuth()

  nuxtApp.hook('page:start', async () => {
    if (process.client) {
      await checkUserAuth()
    }
  })
})
