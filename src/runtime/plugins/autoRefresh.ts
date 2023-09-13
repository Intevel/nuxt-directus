import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { fetchUser, refreshTokens } = useDirectusAuth()
  const { accessToken, refreshToken } = useDirectusCookie()
  const user = useDirectusUser()

  const errorCodes = ['TOKEN_EXPIRED', 'INVALID_TOKEN', 'INVALID_CREDENTIALS']

  async function checkUserAuth () {
    if (!accessToken().value && refreshToken().value) {
      await refreshTokens().catch((e) => {
        if (e && e.some((error: any) => errorCodes.includes(error.extensions.code))) {
          nuxtApp.runWithContext(()=>{
            accessToken().value = null
            refreshToken().value = null
            console.log('Authentication has been invalidated. Please login again.')
          })
        }
      })
    } else if (!user.value && accessToken().value) {
      nuxtApp.runWithContext(async () => await fetchUser().catch(async (e) => {
        if (e && e.some((error: any) => errorCodes.includes(error.extensions.code))) {
          nuxtApp.runWithContext(async () => await refreshTokens()).catch((e) => {
            if (e && e.some((error: any) => errorCodes.includes(error.extensions.code))) {
              nuxtApp.runWithContext(()=>{
                accessToken().value = null
                refreshToken().value = null
                console.log('Authentication has been invalidated. Please login again.')
              })
            }
          })
        }
      }))
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
