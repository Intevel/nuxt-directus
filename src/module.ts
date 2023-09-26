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
    cookieConfig: {
      useNuxtCookies: false,
      refreshTokenCookieName: 'directus_refresh_token',
      cookieHttpOnly: false,
      cookieSameSite: 'lax',
      cookieSecure: false
    },
    moduleConfig: {
      devtools: false,
      autoRefresh: true,
      autoImport: true
    }
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Private runtimeConfig
    nuxt.options.runtimeConfig.directus = defu(
      nuxt.options.runtimeConfig.directus,
      {
        staticToken: options.privateStaticToken,
        moduleConfig: {
          devtools: options.moduleConfig.devtools,
          autoImport: options.moduleConfig.autoImport
        }
      }
    )

    // Public runtimeConfig
    nuxt.options.runtimeConfig.public.directus = defu(
      nuxt.options.runtimeConfig.public.directus,
      {
        url: options.url,
        staticToken: options.publicStaticToken,
        cookieConfig: {
          useNuxtCookies: options.cookieConfig.useNuxtCookies,
          refreshTokenCookieName: options.cookieConfig.refreshTokenCookieName,
          customCookie: options.cookieConfig.useNuxtCookies,
          cookieHttpOnly: options.cookieConfig.cookieHttpOnly,
          cookieSameSite: options.cookieConfig.cookieSameSite as string, // TODO: understand if it is possible to fix the type mismatch
          cookieSecure: options.cookieConfig.cookieSecure
        },
        moduleConfig: {
          autoRefresh: options.moduleConfig.autoRefresh
        }
      }
    )

    // Auto import native components
    if (options.moduleConfig.autoImport) {
      nuxt.options.imports = defu(nuxt.options.imports, {
        presets: [
          {
            from: '@directus/sdk',
            imports: Object.keys(DirectusSDK)
          }
        ]
      })
    }

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    if (nuxt.options.runtimeConfig.public.directus.moduleConfig.autoRefresh) {
      addPlugin(resolve(runtimeDir, './plugins/autoRefresh'), { append: true })
    }

    addImportsDir(resolve(runtimeDir, 'composables'))

    // Enable Directus inside Nuxt Devtools
    if (options.moduleConfig.devtools) {
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
