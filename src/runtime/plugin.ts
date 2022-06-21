import { defineNuxtPlugin } from "#app";
import { useDirectusAuth } from "./composables/useDirectusAuth";

export default defineNuxtPlugin(async (nuxtApp) => {
  const { fetchUser } = useDirectusAuth();

  await fetchUser();
});
