import { defineNuxtPlugin } from "#app";
import { useDirectusAuth } from "./composables/useDirectusAuth";
import { useRuntimeConfig } from "#app";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  if (config.directus.autoFetch) {
    const { fetchUser } = useDirectusAuth();

    await fetchUser();
  }
});
