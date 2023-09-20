import { fileURLToPath } from 'url'
import { defu } from 'defu'
import {
  defineNuxtModule,
  addPlugin,
  addImportsDir,
  createResolver
} from '@nuxt/kit'
import { joinURL } from 'ufo'
import * as DirectusSDK from '@directus/sdk'
import { ModuleOptions } from './runtime/types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-directus',
    configKey: 'directus',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    url: '',
    privateStaticToken: '',
    publicStaticToken: '',
    devtools: false,
    tokenCookieName: 'directus_access_token',
    refreshTokenCookieName: 'directus_refresh_token',
    autoRefresh: true,
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.directus = defu(
      nuxt.options.runtimeConfig.directus,
      {
        staticToken: options.privateStaticToken,
        devtools: options.devtools
      }
    )
    nuxt.options.runtimeConfig.public.directus = defu(
      nuxt.options.runtimeConfig.public.directus,
      {
        url: options.url,
        staticToken: options.publicStaticToken,
        tokenCookieName: options.tokenCookieName,
        refreshTokenCookieName: options.refreshTokenCookieName,
        autoRefresh: options.autoRefresh
      }
    )

    nuxt.options.imports = defu(nuxt.options.imports, {
      presets: [
        {
          from: '@directus/sdk',
          imports: Object.keys(DirectusSDK)
        }
      ]
    })

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    if (nuxt.options.runtimeConfig.public.directus.autoRefresh) {
      addPlugin(resolve(runtimeDir, './plugins/autoRefresh'), { append: true })
    }

    addImportsDir(resolve(runtimeDir, 'composables'))

    if (options.devtools) {
      const adminUrl = joinURL(
        nuxt.options.runtimeConfig.public.directus.url,
        '/admin/'
      )
      nuxt.hook('devtools:customTabs', (iframeTabs) => {
        iframeTabs.push({
          name: 'directus',
          title: 'Directus',
          icon: 'simple-icons:directus',
          view: {
            type: 'iframe',
            src: adminUrl
          }
        })
      })
    }
  }
})
