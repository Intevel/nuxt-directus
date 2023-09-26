import NuxtDirectus from '..'

export default defineNuxtConfig({
  modules: [NuxtDirectus, '@nuxt/devtools'],
  directus: {
    url: 'http://localhost:8055/',
    moduleConfigs: {
      devtools: true,
    },
    cookieConfigs: {
      useNuxtCookies: true
    }
  }
})
