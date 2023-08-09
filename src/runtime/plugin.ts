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

  // do the checks server-side, instead of using hook 'app:created', 
  // as this hook is not called on SSR=true (static generation)
  await checkAutoRefresh();
  await checkIfUserExists();

  nuxtApp.hook('page:start', async () => {
    if (process.client) {
      await checkAutoRefresh();
      await checkIfUserExists();
    }
  })
})