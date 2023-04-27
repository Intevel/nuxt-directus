import { defineNuxtPlugin, useRuntimeConfig } from '#app'

import { useDirectusToken } from './composables/useDirectusToken';
import { useDirectusUser } from './composables/useDirectusUser';
import { useDirectusAuth } from './composables/useDirectusAuth';

export default defineNuxtPlugin(async (nuxtApp) => {

  const config = useRuntimeConfig();
  const { fetchUser } = useDirectusAuth();
  const { token, token_expired, refreshTokens } = useDirectusToken();
  const user = useDirectusUser();

  async function checkRefreshToken() {
    if (config.public.directus.autoRefresh) {
      if (token_expired.value) await refreshTokens();
    }
  }

  async function checkIfUserExists() {
    if (config.public.directus.autoFetch) {
      if (!user.value && token.value) {
        await fetchUser();
      }
    }
  }

  nuxtApp.hook('app:created', async () => {
    if (process.server) {
      await checkRefreshToken();
      await checkIfUserExists();
    }
  })

  nuxtApp.hook('page:start', async () => {
    if (process.client) {
      await checkRefreshToken();
      await checkIfUserExists();
    }
  })
})