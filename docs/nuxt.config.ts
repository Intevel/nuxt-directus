export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  modules: ['@nuxtjs/plausible'],
  plausible: {
    apiHost: 'https://plausible.conner.host',
    domain: 'next.nuxt-directus.site',
    trackLocalhost: false,
    autoOutboundTracking: true,
    autoPageviews: true,
    hashMode: true
  }
})
