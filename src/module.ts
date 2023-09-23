import { fileURLToPath } from 'url'
import { defu } from 'defu'
import {
  createResolver,
  defineNuxtModule,
  addImportsDir,
  addPlugin
} from '@nuxt/kit'
import { joinURL } from 'ufo'
import * as DirectusSDK from '@directus/sdk'
import type { ModuleOptions } from './runtime/types'

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
    cookieConfigs: {
      useNuxtCookies: false,
      refreshTokenCookieName: 'directus_refresh_token',
      cookieHttpOnly: false,
      cookieSameSite: 'lax',
      cookieSecure: false
    },
    autoRefresh: true
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Private runtimeConfig
    nuxt.options.runtimeConfig.directus = defu(
      nuxt.options.runtimeConfig.directus,
      {
        staticToken: options.privateStaticToken,
        devtools: options.devtools
      }
    )

    // Public runtimeConfig
    nuxt.options.runtimeConfig.public.directus = defu(
      nuxt.options.runtimeConfig.public.directus,
      {
        url: options.url,
        staticToken: options.publicStaticToken,
        cookieConfigs: {
          useNuxtCookies: options.cookieConfigs.useNuxtCookies,
          refreshTokenCookieName: options.cookieConfigs.refreshTokenCookieName,
          customCookie: options.cookieConfigs.useNuxtCookies,
          cookieHttpOnly: options.cookieConfigs.cookieHttpOnly,
          cookieSameSite: options.cookieConfigs.cookieSameSite as string, // TODO: understand if it is possible to fix the type mismatch
          cookieSecure: options.cookieConfigs.cookieSecure
        },
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
