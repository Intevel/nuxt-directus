import NuxtDirectus from '..'

export default defineNuxtConfig({
  modules: [NuxtDirectus],
  directus: {
    url: 'http://localhost:8055/'
  }
})
