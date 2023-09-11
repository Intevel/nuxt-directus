import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { fetchUser, refreshTokens } = useDirectusAuth()
  const { accessToken, refreshToken } = useDirectusCookie()
  const user = useDirectusUser()

  const errorCodes = ['TOKEN_EXPIRED', 'INVALID_TOKEN']

  async function checkUserAuth () {
    if (!user.value && accessToken().value) {
      await fetchUser().catch(async (e) => {
        // TODO: don't rely on the first error alone
        if (e.some((error: any) => errorCodes.includes(error.extensions.code))) {
          nuxtApp.runWithContext(async () => await refreshTokens()).catch((e) => {
            // TODO: don't rely on the first error alone
            if (e.some((error: any) => errorCodes.includes(error.extensions.code))) {
              nuxtApp.runWithContext(()=>{
                accessToken().value = null
                refreshToken().value = null
                console.log('Authentication has been invalidated. Please login again.')
              })
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
