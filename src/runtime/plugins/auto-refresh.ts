import { refresh, withToken, readMe } from '@directus/sdk'
import type { AuthenticationData, DirectusUser } from '@directus/sdk'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  addRouteMiddleware(async (_to, _from) => {
    const { authConfig: { useNuxtCookies } } = useRuntimeConfig().public.directus
    const { tokens, refreshToken, set } = useDirectusTokens()
    const { setUser } = useDirectusUsers()

    if (!tokens.value?.access_token && (refreshToken().value || !useNuxtCookies)) {
      const client = useDirectusRest()
      const { data: refreshData, error: refreshError } = await useAsyncData<{ tokens: AuthenticationData, user: DirectusUser<any>}>(
        async () => {
          const tokens = await client.request(useNuxtCookies ? refresh('json', refreshToken().value) : refresh('cookie'))
          const user = await client.request(withToken(tokens.access_token!, readMe())) as DirectusUser<any>
          return {
            tokens: {
              ...tokens,
              expires_at: new Date().getTime() + tokens.expires!
            },
            user
          }
        }
      )

      nuxtApp.runWithContext(() => {
        if (refreshData.value && !refreshError.value) {
          set(refreshData.value.tokens)
          setUser(refreshData.value.user)
        }
      })
    }
  })
})
