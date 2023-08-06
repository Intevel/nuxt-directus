import NuxtDirectus from '..'

export default defineNuxtConfig({
  modules: [NuxtDirectus, '@nuxt/devtools'],
  directus: {
    url: 'http://localhost:8055/',
    devtools: true
  }
})
