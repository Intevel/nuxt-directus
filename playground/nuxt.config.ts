import { defineNuxtConfig } from "nuxt3";
import NuxtDirectus from "..";

export default defineNuxtConfig({
  modules: [NuxtDirectus],
  directus: {
    url: "https://swyi1ut9.directus.app/",
  },
});
