import NuxtDirectus from 'nuxt-directus';

export default defineNuxtConfig({
  modules: [NuxtDirectus, '@nuxt/devtools'],
  directus: {
    url: 'http://localhost:8055/',
    devtools: true,
    cookieMaxAge: 10000,
  }
})
