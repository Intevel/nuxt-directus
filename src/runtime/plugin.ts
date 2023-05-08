import { defineNuxtPlugin, useRuntimeConfig } from '#app'

import { useDirectusToken } from './composables/useDirectusToken';
import { useDirectusUser } from './composables/useDirectusUser';
import { useDirectusAuth } from './composables/useDirectusAuth';

export default defineNuxtPlugin(async (nuxtApp) => {

  const config = useRuntimeConfig();
  const { fetchUser } = useDirectusAuth();
  const { token, checkAutoRefresh } = useDirectusToken();
  const user = useDirectusUser();

  async function checkIfUserExists() {
    if (config.public.directus.autoFetch) {
      if (!user.value && token.value) {
        await fetchUser();
      }
    }
  }

  nuxtApp.hook('app:created', async () => {
    if (process.server) {
      await checkAutoRefresh();  
      await checkIfUserExists();
    }
  })

  nuxtApp.hook('page:start', async () => {
    if (process.client) {
      await checkAutoRefresh();
      await checkIfUserExists();
    }
  })
})