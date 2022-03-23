import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(async (nuxtApp) => {
  const { fetchUser } = useDirectusAuth();

  await fetchUser();
});
